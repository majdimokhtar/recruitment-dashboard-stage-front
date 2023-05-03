import Link from 'next/link'
import moment from 'moment'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Factory from 'mdi-material-ui/Factory'
import BriefcaseAccountOutline from 'mdi-material-ui/BriefcaseAccountOutline'
import Cash from 'mdi-material-ui/Cash'
import ClockOutline from 'mdi-material-ui/ClockOutline'
import { useTheme } from '@mui/material/styles'

const JobList = ({ job }) => {
  const theme = useTheme()
  return (
    <>
      <Link href={`/apps/recruitment/jobs/${job.id}/`}>
        <a className='job-card'>
          <Box mb={2} pt={3}>
            <Card sx={{ boxShadow: 2 }}>
              <CardHeader
                title={
                  <Typography variant='h6' component='div' sx={{ color: theme.palette.text.secondary }}>
                    {job.company}
                  </Typography>
                }
              />
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Typography gutterBottom variant='h5' component='div'>
                        {job.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {job.description.substring(0, 200)}...
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}></Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button startIcon={<Factory />} size='small' color="primary" >
                  {job.industry}
                </Button>
                <Button startIcon={<BriefcaseAccountOutline />} size='small' color="primary">
                  {job.jobType}
                </Button>
                {/* <Button size='small'>{job.education}</Button> */}
                <Button startIcon={<Cash />} size='small' color="primary">
                  ${job.salary}
                </Button>
                <Button startIcon={<ClockOutline />} size='small' color="primary">
                  {moment.utc(job.createdAt).local().startOf('seconds').fromNow()}
                </Button>
              </CardActions>
            </Card>
          </Box>
        </a>
      </Link>
    </>
  )
}

export default JobList
