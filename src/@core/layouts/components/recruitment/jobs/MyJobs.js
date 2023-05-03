import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import { DataGrid } from '@mui/x-data-grid'
import JobContext from 'src/context/JobContext'
import { useRouter } from 'next/router'
import { Eye, Pencil, Account, Delete } from 'mdi-material-ui'
import { Button, IconButton, Typography } from '@mui/material'
import toast from 'react-hot-toast'

const MyJobs = ({ jobs, access_token }) => {
  const { clearErrors, error, loading, deleted, deleteJob, setDeleted } = useContext(JobContext)

  const router = useRouter()

  useEffect(() => {
    if (error) {
      toast.error(error)
      clearErrors()
    }

    if (deleted) {
      setDeleted(false)
      toast.success('Deleted')
      router.push(router.asPath)
    }
  }, [error, deleted])

  const deleteJobHandler = id => {
    deleteJob(id, access_token)
  }

  const columns = [
    { field: 'id', headerName: 'Job ID', width: 250, sortable: true },
    { field: 'title', headerName: 'Job name', width: 250, sortable: true },
    { field: 'salary', headerName: 'Salary', width: 250, sortable: true },
    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      sortable: true,
      renderCell: params => (
        <>
          <Link href={`/apps/recruitment/jobs/${params.id}`}>
            <IconButton sx={{ mx: 1 }}>
              <Eye />
            </IconButton>
          </Link>
          <Link href={`/apps/recruitment/employeer/jobs/candidates/${params.id}`}>
            <IconButton sx={{ mx: 1 }}>
              <Account />
            </IconButton>
          </Link>
          <Link href={`/apps/recruitment/employeer/jobs/${params.id}`}>
            <IconButton sx={{ mx: 1 }}>
              <Pencil />
            </IconButton>
          </Link>
          <IconButton color='error' aria-label='delete' onClick={() => deleteJobHandler(params.id)} sx={{ mx: 1 }}>
            <Delete />
          </IconButton>
        </>
      )
    }
  ]

  const rows = []

  jobs &&
    jobs.map(job => {
      rows.push({
        id: job.id,
        title: job.title,
        salary: job.salary
      })
    })

  console.log(jobs)

  return (
    <div className='row'>
      <Typography variant='h5' sx={{ mb: 4 }}>
        My Jobs
      </Typography>
      <DataGrid rows={rows} columns={columns} pagination autoHeight />
    </div>
  )
}

export default MyJobs
