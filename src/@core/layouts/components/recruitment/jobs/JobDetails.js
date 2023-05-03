import moment from 'moment'
import { useRouter } from 'next/router'

import { useContext, useRef, useState } from 'react'
import React, { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { CircularProgress, IconButton, Modal, Stack } from '@mui/material'
import ArrowLeft from 'mdi-material-ui/ArrowLeft'

import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import JobContext from 'src/context/JobContext'
import { Close, HomeCity, MapMarker } from 'mdi-material-ui'
import UploadResume from '../user/UploadResume'

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(1)} !important`
}))

// maplibregl.accessToken = 'NWa64EX6jx0RpgDqU2eF'

function JobDetails({ job, candidates, access_token, csrf_token }) {
  const [showModal, setShowModal] = useState(false)
  const PreviewRef = useRef(null)
  const theme = useTheme()
  const mapContainer = useRef(null)
  const router = useRouter()
  const { applyToJob, checkJobApplied, applied, clearErrors, loading, user, userLoaded } = useContext(JobContext)

  const applyToJobHandler = () => {
    setShowModal(true)
    // applyToJob(job.id, access_token, csrf_token)
  }
  const handleClose = () => {
    setShowModal(false)
  }

  const d1 = moment(job.lastDate)
  const d2 = moment(Date.now())
  const isLastDatePassed = d1.diff(d2, 'days') < 0 ? true : false

  const handleBack = () => {
    router.back()
  }

  useEffect(() => {
    if (job.point) {
      try {
        const coordinates = job.point.split('(')[1].replace(')', '').split(' ')
        // Create map and set the center point
        const map = new maplibregl.Map({
          container: mapContainer.current,
          style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.MAP_KEY}`,
          center: coordinates,
          zoom: 10
        })

        // Add load event listener to map
        map.on('load', () => {
          // Add marker on map
          new maplibregl.Marker({ color: '#e63946' }).setLngLat(coordinates).addTo(map)
        })

        console.log('Map created:', map)
      } catch (error) {
        console.error('Error creating map:', error)
      }
    } else {
      console.warn('Job point value is null or undefined:', job.point)
    }
    checkJobApplied(job.id, access_token, csrf_token)
  }, [job.point, job.id])

  // console.log(job, candidates)

  return (
    <>
      <Card sx={{ boxShadow: 2 }}>
        <Box ref={PreviewRef}>
          <CardContent>
            <Grid container>
              <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Card>
                    <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}></Box>
                    <CardContent>
                      <Box>
                        <Stack direction='row' alignItems='center' gap={1} sx={{ mb: 5 }}>
                          <IconButton onClick={handleBack}>
                            <ArrowLeft />
                          </IconButton>
                          <Typography
                            variant='h4'
                            sx={{ fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                          >
                            {job.title}
                          </Typography>
                        </Stack>
                        <Stack direction='row' gap={2}>
                          <Stack direction='row' alignContent='center' gap={2}>
                            <HomeCity />
                            <Typography variant='body' sx={{ mb: 1 }}>
                              {job.company}
                            </Typography>
                          </Stack>
                          <Stack direction='row' alignContent='center' gap={1}>
                            <MapMarker />
                            <Typography variant='body' sx={{ mb: 1 }}>
                              {job.address}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack direction='row' alignItems='center' sx={{ mt: 5 }} gap={1}>
                          <Typography sx={{ width: '60%%' }} variant='body' style={{ color: '#38b000' }}>
                            {candidates} candidates applied to this job
                          </Typography>
                          <Box sx={{ width: '45%', display: 'flex', justifyContent: 'flex-end' }}>
                            <span>
                              {userLoaded && (
                                <Button
                                  variant='contained'
                                  color='success'
                                  onClick={applyToJobHandler}
                                  disabled={loading || applied || isLastDatePassed}
                                >
                                  {loading ? (
                                    <Box>
                                      <CircularProgress size={16} color='inherit' />
                                      <span style={{ marginLeft: '8px' }}>Loading...</span>
                                    </Box>
                                  ) : applied ? (
                                    'Applied'
                                  ) : (
                                    'Apply Now'
                                  )}
                                </Button>
                              )}

                              {/* {loading ? (
                                <Button
                                  variant='contained'
                                  color='success'
                                  disabled
                                  style={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <CircularProgress size={16} color='inherit' />
                                  <span style={{ marginLeft: '8px' }}>Loading...</span>
                                </Button>
                              ) : applied ? (
                                <Button disabled variant='contained' color='success'>
                                  Applied
                                </Button>
                              ) : (
                                <Button
                                  variant='contained'
                                  color='success'
                                  onClick={applyToJobHandler}
                                  disabled={isLastDatePassed}
                                >
                                  Apply Now
                                </Button>
                              )} */}
                              {showModal && (
                                <Modal open={showModal} onClose={handleClose}>
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
                                    <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={handleClose}>
                                      <Close />
                                    </IconButton>
                                    <UploadResume access_token={access_token} job={job} handleClose={handleClose} />
                                  </Box>
                                </Modal>
                              )}
                            </span>
                          </Box>
                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                  <Table sx={{ maxWidth: '300px' }}>
                    <TableBody>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='h6'>Job </Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='h6'>{`#${job.id}`}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Email Address:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2' sx={{ fontWeight: 600 }}>
                            {job.email}
                          </Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Job Posted:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2' sx={{ fontWeight: 600 }}>
                            {moment.utc(job.createdAt).local().startOf('seconds').fromNow()}
                          </Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Last Date:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2' sx={{ fontWeight: 600 }}>
                            {job.lastDate.substring(0, 10)}
                          </Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
                {isLastDatePassed && (
                  <Box sx={{ mt: 5, display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                    <Alert icon={false} severity='warning' sx={{ mb: 6, maxWidth: '300px' }}>
                      <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                        Note:
                      </AlertTitle>
                      You can no longer apply to this job. This job is expired. Last date to apply for this job was:{' '}
                      <b>{job.lastDate.substring(0, 10)}</b>
                      <br /> Checkout other jobs.
                    </Alert>
                  </Box>
                )}
              </Grid>
            </Grid>
          </CardContent>

          <Divider />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant='h6'
                      sx={{ mb: 3, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                    >
                      Job Summary
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Job Type</TableCell>
                  <TableCell>{job.jobType} </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Job Industry</TableCell>
                  <TableCell>{job.industry}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Job Salary</TableCell>
                  <TableCell>${job.salary}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Education</TableCell>
                  <TableCell>{job.education}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Experience</TableCell>
                  <TableCell>{job.experience}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant='h6'
                    sx={{ mb: 3, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                  >
                    Description
                  </Typography>
                </Box>
                <Typography variant='body2'>{job.description}</Typography>
              </Grid>
            </Grid>
          </CardContent>

          <Divider />
        </Box>
        <CardContent>
          <Box sx={{ mt: 4 }}>
            <Typography variant='h6' sx={{ mb: 6, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}>
              Job Location
            </Typography>
            <div ref={mapContainer} id='job-map' style={{ width: '100%', height: '400px' }}></div>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default JobDetails
