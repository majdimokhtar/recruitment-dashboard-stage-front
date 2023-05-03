import Link from 'next/link'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Button } from '@mui/material'

const JobsApplied = ({ jobs }) => {
  const columns = [
    {
      field: 'title',
      headerName: 'Job name',
      flex: 1
    },
    {
      field: 'salary',
      headerName: 'Salary',
      flex: 1
    },
    {
      field: 'education',
      headerName: 'Education',
      flex: 1
    },
    {
      field: 'experience',
      headerName: 'Experience',
      flex: 1
    },
    {
      field: 'applieOn',
      headerName: 'Applied On',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: params => (
        <Link href={`/apps/recruitment/jobs/${params.row.id}`} passHref>
          <Button variant='contained' color='primary' component='a' endIcon={<i aria-hidden className='fa fa-eye'></i>}>
            View
          </Button>
        </Link>
      )
    }
  ]
  console.log(jobs[0])
  const rows = jobs
    ? jobs.map(item => ({
        id: item.job.id,
        title: item.job.title,
        salary: item.job.salary,
        education: item.job.education,
        experience: item.job.experience,
        applieOn: item.apliedAt.substring(0, 10),
        action: <Link href={`/jobs/${item.job.id}`}></Link>
      }))
    : []

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar
        }}
        pagination
      />
    </div>
  )
}

export default JobsApplied
