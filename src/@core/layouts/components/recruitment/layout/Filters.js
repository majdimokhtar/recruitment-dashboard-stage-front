import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { useState } from 'react'
import { useRouter } from 'next/router'

function Filters() {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const router = useRouter()

  let queryParams
  if (typeof window !== 'undefined') {
    queryParams = new URLSearchParams(window.location.search)
  }

  function handleChange(event) {
    const { name, value } = event.target

    if (queryParams.has(name)) {
      queryParams.set(name, value)
    } else {
      queryParams.append(name, value)
    }

    router.replace({
      search: queryParams.toString()
    })
  }

  const submitHandler = async e => {
    e.preventDefault()
    if (keyword) {
      let searchQuery = `/apps/recruitment/jobs/?keyword=${keyword}`
      if (location) {
        searchQuery = searchQuery.concat(`&location=${location}`)
      }
      router.push(searchQuery)
    } else {
      router.push('/apps/recruitment/jobs/')
    }
    setKeyword('')
    setLocation('')
    // console.log(keyword, location)
  }
  return (
    <>
      {/* Search */}
      <Card sx={{ mb: 6, boxShadow: 1 }}>
        <CardHeader title='Search' />
        <CardContent>
          <form onSubmit={submitHandler}>
            <Grid container spacing={2} justifyContent='space-between'>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                  <TextField
                    required
                    size='small'
                    value={keyword}
                    placeholder='Enter Your Keyword'
                    onChange={e => setKeyword(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                  <TextField
                    size='small'
                    value={location}
                    placeholder='Enter Location...'
                    onChange={e => setLocation(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl sx={{ display: 'flex' }}>
                  <Button variant='contained' color='primary' type='submit' sx={{ width: '100%', height: '100%' }}>
                    Search
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card sx={{ boxShadow: 1 }}>
        <CardHeader title='Filters' />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id='jobType-label'>Job Type</InputLabel>
                <Select
                  style={{ width: '100%' }}
                  labelId='jobType-label'
                  name='jobType'
                  value={queryParams.get('jobType') || ''}
                  onChange={handleChange}
                  label='Job Type'
                >
                  <MenuItem value=''>All</MenuItem>
                  <MenuItem value='Permanent'>Permanent</MenuItem>
                  <MenuItem value='Temporary'>Temporary</MenuItem>
                  <MenuItem value='Internship'>Internship</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id='education-label'>Education</InputLabel>
                <Select
                  style={{ width: '100%' }}
                  labelId='education-label'
                  name='education'
                  value={queryParams.get('education') || ''}
                  onChange={handleChange}
                  label='Education'
                >
                  <MenuItem value=''>All</MenuItem>
                  <MenuItem value='Bachelors'>Bachelors</MenuItem>
                  <MenuItem value='Masters'>Masters</MenuItem>
                  <MenuItem value='Phd'>Phd</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id='experience-label'>Experience</InputLabel>
                <Select
                  style={{ width: '100%' }}
                  labelId='experience-label'
                  name='experience'
                  value={queryParams.get('experience') || ''}
                  onChange={handleChange}
                  label='Experience'
                >
                  <MenuItem value=''>All</MenuItem>
                  <MenuItem value='No Experience'>No Experience</MenuItem>
                  <MenuItem value='1 Years'>1 Year</MenuItem>
                  <MenuItem value='2 Years'>2 Years</MenuItem>
                  <MenuItem value='3 Years above'>3 Years+</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id='salary-label'>Salary Range</InputLabel>
                <Select
                  style={{ width: '100%' }}
                  labelId='salary-label'
                  name='salary'
                  value={queryParams.get('salary') || ''}
                  onChange={handleChange}
                  label='Salary'
                >
                  <MenuItem value=''>All</MenuItem>
                  <MenuItem value='1-50000'>$1 - $50000</MenuItem>
                  <MenuItem value='50000-100000'>$50000 - $100,000</MenuItem>
                  <MenuItem value='100000-200000'>$100,000 - $200,000</MenuItem>
                  <MenuItem value='300000-500000'>$300,000 - $500,000</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default Filters
