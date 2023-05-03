import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
// import Link from 'next/link'

import { toast } from 'react-hot-toast'
import { Box, Button, TextField, Typography, Grid, CircularProgress, Link } from '@mui/material'
import JobContext from 'src/context/JobContext'
import { Download, Upload } from 'mdi-material-ui'

const UploadResume = ({ access_token, job, handleClose }) => {
  const [resume, setResume] = useState(null)
  const {
    loading,
    user,
    uploaded,
    error,
    clearErrors,
    uploadResume,
    setUploaded,
    applyToJob,
    applied,
    loadingUpload,
    setLoading,
    setApplied
  } = useContext(JobContext)
  // const ResumeUrl = `https://res.cloudinary.com/ddtgdjcx3/image/upload/${user.resume}`
  // console.log('url', ResumeUrl)
  // const cookies = cookie.parse(document.cookie)
  // const access_token = cookies.access_token
  // const fullResumeUrl = cloudinaryBaseUrl + user.resume;
  // const fullResumeUrl = cloudinaryBaseUrl + user.resume;

  const router = useRouter()

  useEffect(() => {
    if (error) {
      toast.error(error)
      clearErrors()
    }

    if (uploaded) {
      setUploaded(false)
      toast.success('Your resume is uploaded successfully.')
    }
  }, [error, uploaded])

  const submitHandler = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('resume', resume)

    uploadResume(formData, access_token)
  }

  const onChange = e => {
    setResume(e.target.files[0])
  }

  // const applyToJobHandler = () => {
  //   applyToJob(job.id, access_token)
  //   // handleClose()
  // }
  const applyToJobHandler = async () => {
    try {
      setLoading(true)
      await applyToJob(job.id, access_token)
      setApplied(true)
    } catch (error) {
      setError(error.response && (error.response.data.detail || error.response.data.error))
    } finally {
      setLoading(false)
    }
    handleClose()
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '80%', maxWidth: 600 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h4' gutterBottom>
            Apply to {job.title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ py: 2 }}>
            <Typography variant='h6' gutterBottom>
              UPLOAD RESUME
            </Typography>
          </Box>
        </Box>

        <Box component='form' onSubmit={submitHandler}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 400 }}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  type='file'
                  name='resume'
                  id='customFile'
                  accept='application/pdf'
                  onChange={onChange}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1 }}>
                        <Upload />
                      </Box>
                    )
                  }}
                />
                <Typography variant='overline'>Only PDF (2 MB Max)</Typography>
              </Box>
            </Box>
          </Box>

          {user && user.resume && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ py: 1 }}>
                  <Typography variant='h5' sx={{ m: 5 }}>
                    OR
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                  <Box sx={{ mb: 2 }}>
                    {/* <Link href={ResumeUrl} target='_blank' rel='noreferrer'>
                      <Button variant='outlined' fullWidth startIcon={<Download />}>
                        Download Your Resume
                      </Button>
                    </Link> */}
                    {user && user.resume ? (
                      <Link
                        href={`https://res.cloudinary.com/ddtgdjcx3/image/upload/${user.resume}`}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <Button variant='outlined' fullWidth startIcon={<Download />}>
                          Download Your Resume
                        </Button>
                      </Link>
                    ) : (
                      <Button variant='outlined' fullWidth disabled>
                        Resume Not Available
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Box sx={{ width: '100%', maxWidth: 400 }}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={6}>
                  <Button type='submit' variant='contained' fullWidth disabled={loading}>
                    {loadingUpload ? 'Uploading...' : 'Upload'}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  {loading ? (
                    <Button
                      variant='contained'
                      color='success'
                      disabled
                      style={{ display: 'flex', alignItems: 'center' }}
                      fullWidth
                    >
                      <CircularProgress size={16} color='inherit' />
                      <span style={{ marginLeft: '8px' }}>Loading...</span>
                    </Button>
                  ) : applied ? (
                    <Button disabled variant='contained' color='success' fullWidth>
                      Reviewed
                    </Button>
                  ) : (
                    <Button variant='contained' color='success' onClick={applyToJobHandler} fullWidth>
                      Review
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default UploadResume
