import React, { useContext, useEffect, useState } from 'react'
import JobContext from 'src/context/JobContext'
import {
  Card,
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
  FormControl,
  Input,
  InputLabel
} from '@mui/material'

import { toast } from 'react-hot-toast'

import { jobTypeOptions, educationOptions, industriesOptions, experienceOptions } from './data'
import { Email, UnfoldMoreHorizontal } from 'mdi-material-ui'

const NewJob = ({ access_token }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [jobType, setJobType] = useState('Permanent')
  const [education, setEducation] = useState('Bachelors')
  const [industry, setIndustry] = useState('Business')
  const [experience, setExperience] = useState('No Experience')
  const [salary, setSalary] = useState('')
  const [positions, setPositions] = useState('')
  const [company, setCompany] = useState('')

  const { clearErrors, error, loading, created, newJob, setCreated } = useContext(JobContext)

  useEffect(() => {
    if (error) {
      console.log(error)
      clearErrors()
      toast.error('Error occurred. Please try again.') // display an error toast
    }

    if (created) {
      setCreated(false)
      console.log('Job Posted successfully.')
      toast.success('Job Posted successfully.') // display a success toast

      setTitle('')
      setDescription('')
      setEmail('')
      setAddress('')
      setJobType('Permanent')
      setEducation('Bachelors')
      setIndustry('Business')
      setExperience('No Experience')
      setSalary('')
      setPositions('')
      setCompany('')
    }
  }, [error, created])

  const submitHandler = e => {
    e.preventDefault()

    const data = {
      title,
      description,
      email,
      address,
      jobType,
      education,
      industry,
      experience,
      salary,
      positions,
      company
    }

    // console.log(data ,access_token)

    newJob(data, access_token)
  }

  return (
    <Card>
      <Box sx={{ p: 2, m: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant='h5' sx={{ display: 'flex', alignItems: 'center', mb: 8 }}>
              <UnfoldMoreHorizontal sx={{ mr: 1 }} />
              POST A JOB
            </Typography>
          </Box>
          <Box sx={{ width: 48, height: 48 }}>{/* Replace with your logo */}</Box>
        </Box>
        <form component='form' sx={{ mt: 2 }} onSubmit={submitHandler}>
          <Grid container spacing={2}></Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <FormControl>
                <TextField
                  id='job-title'
                  type='text'
                  placeholder='Enter Job Title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  multiline
                  minRows={4}
                  maxRows={6}
                  id='job-description'
                  placeholder='Enter Job Description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  id='email'
                  type='email'
                  placeholder='Enter Your Email'
                  pattern='\S+@\S+\.\S+'
                  title='Your email is invalid'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl>
                <TextField
                  type='text'
                  placeholder='Enter Address'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  InputProps={{
                    inputProps: {
                      min: 1
                    }
                  }}
                  type='number'
                  placeholder='Enter Salary Range'
                  value={salary}
                  onChange={e => setSalary(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  InputProps={{
                    inputProps: {
                      min: 1
                    }
                  }}
                  type='number'
                  placeholder='Enter No. of Positions'
                  value={positions}
                  onChange={e => setPositions(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <TextField
                  type='text'
                  placeholder='Enter Company Name'
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  required
                />
              </FormControl>

              {/* Selects */}
              <Grid container spacing={2} justifyContent='space-between' alignItems='center'>
                <Grid item xs={3}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel htmlFor='job-type-select' sx={{ color: 'gray', fontSize: '14px' }}>
                      Job Type
                    </InputLabel>
                    <Select
                      id='job-type-select'
                      label='Job Type'
                      value={jobType}
                      onChange={e => setJobType(e.target.value)}
                    >
                      {jobTypeOptions.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel htmlFor='education-type-select' sx={{ color: 'gray', fontSize: '14px' }}>
                      Education
                    </InputLabel>
                    <Select
                      label='Education'
                      id='education-type-select'
                      value={education}
                      onChange={e => setEducation(e.target.value)}
                    >
                      {educationOptions.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel htmlFor='industry-type-select' sx={{ color: 'gray', fontSize: '14px' }}>
                      Industry
                    </InputLabel>
                    <Select
                      label='Industry'
                      id='industry-type-select'
                      value={industry}
                      onChange={e => setIndustry(e.target.value)}
                    >
                      {industriesOptions.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={3}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel htmlFor='experience-type-select' sx={{ color: 'gray', fontSize: '14px' }}>
                      Experience
                    </InputLabel>
                    <Select
                      label='Experience'
                      id='experience-type-select'
                      value={experience}
                      onChange={e => setExperience(e.target.value)}
                    >
                      {experienceOptions.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ mt: 35, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Button type='submit' variant='contained' color='info'>
                  {loading ? 'Posting...' : 'Post Job'}
                </Button>
              </Box>
            </Box>
          </Grid>
        </form>
      </Box>
    </Card>
  )
}

export default NewJob
