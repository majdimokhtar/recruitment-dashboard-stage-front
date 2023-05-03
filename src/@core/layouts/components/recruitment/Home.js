import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import { Box, Button, IconButton, Modal } from '@mui/material'

import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import JobList from './jobs/JobList'
import Filters from './layout/Filters'

import JobStats from './stats/JobStats'
import JobContext from 'src/context/JobContext'
import { Close } from 'mdi-material-ui'

function Home({ data }) {
  const [openModal, setOpenModal] = useState(false)
  const { setStats } = useContext(JobContext)
  const { jobs, count, responsePerPage } = data
  const router = useRouter()
  const [page, setPage] = useState(Number(router.query.page) || 1)
  let { keyword } = router.query

  let queryParams
  if (typeof window !== 'undefined') {
    queryParams = new URLSearchParams(window.location.search)
  }

  const handlePageChange = (event, value) => {
    router.push({
      query: { ...router.query, page: value }
    })
    setPage(value)
  }
  //   console.log(data,"jobs")

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setStats(null)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Filters />
        </Grid>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ mb: 4, mt: 4 }}>
            <Typography color={jobs.length === 0 ? 'error' : ''} variant='h4' component='h4' gutterBottom>
              {keyword
                ? `${jobs.length} Results for ${keyword} In This Page`
                : jobs.length === 0
                ? 'No Result Found'
                : 'Latest Jobs'}
            </Typography>
            <Button variant='contained' color='secondary' onClick={handleOpenModal}>
              Get Stats
            </Button>
            <Modal open={openModal} onClose={handleCloseModal}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 500,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4
                }}
              >
                <IconButton sx={{ position: 'absolute', top: 4, right: 8 }} onClick={handleCloseModal}>
                  <Close />
                </IconButton>
                <JobStats />
              </Box>
            </Modal>
          </Box>
          {jobs &&
            jobs.map(job => {
              return <JobList key={job.id} job={job} />
            })}
          {responsePerPage < count && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                sx={{ mt: 4 }}
                count={Math.ceil(count / responsePerPage)}
                page={page}
                onChange={handlePageChange}
                color='primary'
                size='large'
                showFirstButton
                showLastButton
              />
            </div>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Home
