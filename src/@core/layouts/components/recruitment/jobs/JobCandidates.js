import React from 'react'
// import Link from 'next/link'
import { DataGrid } from '@mui/x-data-grid'
import { Download } from 'mdi-material-ui'
import { Typography, Box, Link } from '@mui/material'

const JobCandidates = ({ candidatesApplied }) => {
  const ResumeUrl = `https://res.cloudinary.com/ddtgdjcx3/image/upload/${candidatesApplied[0]?.resume}`
  const columns = [
    {
      field: 'title',
      headerName: 'Job Name',
      sortable: true,
      width: 200
    },
    {
      field: 'id',
      headerName: 'User ID',
      sortable: true,
      width: 150
    },
    {
      field: 'resume',
      headerName: 'Candidate Resume',
      sortable: true,
      width: 300,
      renderCell: params =>
        candidatesApplied[0]?.resume ? (
          <Link href={ResumeUrl} rel='noreferrer' target='_blank'>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Download color='info' />
              <Typography variant='body1' style={{ marginLeft: '8px' }}>
                View Resume
              </Typography>
            </Box>
          </Link>
        ) : (
          <span>No resume available</span>
        )
    },
    {
      field: 'apliedAt',
      headerName: 'Applied At',
      sortable: true,
      width: 150,
      valueFormatter: params => params.value.substring(0, 10)
    }
  ]

  const rows = candidatesApplied
    ? candidatesApplied.map(item => ({
        id: item.user,
        title: item.job.title,
        salary: item.salary,
        ResumeUrl: item.ResumeUrl,
        apliedAt: item.apliedAt
      }))
    : []

  console.log(candidatesApplied)

  return candidatesApplied.length > 0 ? (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} pagination autoHeight />
    </div>
  ) : (
    <Typography
      variant='h4'
      color='error'
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
    >
      No candidates have applied to this job yet.
    </Typography>
  )
}

export default JobCandidates
