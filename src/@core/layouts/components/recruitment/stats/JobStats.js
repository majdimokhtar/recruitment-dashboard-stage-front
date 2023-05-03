import React, { useState, useContext, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-hot-toast'

import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material'
import JobContext from 'src/context/JobContext'

const JobStats = () => {
  const [topic, setTopic] = useState('')

  const { getTopicStats, stats, clearErrors, error, loading } = useContext(JobContext)

  useEffect(() => {
    if (error) {
      toast.error('Error occurred. Please try again.')
      console.log(error)
      clearErrors()
    }
  }, [error])

  const submitHandler = e => {
    e.preventDefault()
    getTopicStats(topic)
  }

  return (
    <div>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h5' align='center' gutterBottom>
          Get Stats
        </Typography>

        <form onSubmit={submitHandler} style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant='outlined'
            label='Enter Your Topic'
            value={topic}
            onChange={e => setTopic(e.target.value)}
            required
            style={{ marginRight: '8px' }}
          />

          <Button
            type='submit'
            variant='contained'
            disabled={loading}
            style={{ height: '56px', width: '120px', whiteSpace: 'nowrap' }}
          >
            {loading ? 'Fetching...' : 'Get Stats'}
          </Button>
        </form>
      </Box>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color='primary' />
        </div>
      ) : stats && stats.message ? (
        <Typography variant='body1' color='error' gutterBottom>
          {stats.message}
        </Typography>
      ) : (
        stats && (
          <div>
            <Typography variant='h6' gutterBottom>
              Stats of {topic.toUpperCase()}:
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Average Positions</TableCell>
                    <TableCell>{stats.avg_positions.toFixed(0)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Jobs</TableCell>
                    <TableCell>{stats.total_jobs}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Minimum Salary</TableCell>
                    <TableCell>${stats.min_salary}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Maximum Salary</TableCell>
                    <TableCell>${stats.max_salary}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Average Salary</TableCell>
                    <TableCell>${stats.avg_salary}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography sx={{ mt: 4 }} variant='body1' color='error' gutterBottom>
              <b>Note:</b> These stats are collected from the jobs that are posted only on Materio. Do not compare these
              stats with other sites.
            </Typography>
          </div>
        )
      )}
    </div>
  )
}

export default JobStats
