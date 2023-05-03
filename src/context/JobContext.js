import axios from 'axios'
import { useState, createContext, useEffect } from 'react'
import cookie from 'cookie'

const JobContext = createContext()

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [error, setError] = useState(null)
  const [created, setCreated] = useState(null)
  const [updated, setUpdated] = useState(null)
  const [deleted, setDeleted] = useState(null)
  const [applied, setApplied] = useState(false)
  const [stats, setStats] = useState(null)

  const [user, setUser] = useState(null)
  const [uploaded, setUploaded] = useState(null)
  const [userLoaded, setUserLoaded] = useState(false)

  // Create a new job
  const newJob = async (data, access_token) => {
    try {
      // console.log('context', access_token)
      setLoading(true)

      const res = await axios.post(`${process.env.API_URL}/api/jobs/addjob/`, data, {
        headers: {
          Authorization: `Bearer ${access_token.access_token}`
        }
      })

      if (res.data) {
        setLoading(false)
        setCreated(true)
      }
    } catch (error) {
      setLoading(false)
      setError(error.response && (error.response.data.detail || error.response.data.error))
    }
  }

  // Update job
  const updateJob = async (id, data, access_token) => {
    try {
      setLoading(true)

      const res = await axios.put(`${process.env.API_URL}/api/jobs/${id}/update/`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      if (res.data) {
        setLoading(false)
        setUpdated(true)
      }
    } catch (error) {
      setLoading(false)
      setError(error.response && (error.response.data.detail || error.response.data.error))
    }
  }

  // Apply to Job
  const applyToJob = async (id, access_token) => {
    try {
      setLoading(true)

      const res = await axios.post(
        `${process.env.API_URL}/api/jobs/${id}/apply/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      )

      if (res.data.applied === true) {
        setLoading(false)
        setApplied(true)
      }
    } catch (error) {
      setLoading(false)
      setError(error.response && (error.response.data.detail || error.response.data.error))
    }
  }

  // Check job applied
  const checkJobApplied = async (id, access_token) => {
    try {
      setLoading(true)

      const res = await axios.get(`${process.env.API_URL}/api/jobs/${id}/check/`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      setLoading(false)
      setApplied(res.data)
    } catch (error) {
      setLoading(false)
      setError(error.response && (error.response.data.detail || error.response.data.error))
    }
  }

  // Get stats
  const getTopicStats = async topic => {
    try {
      setLoading(true)

      const res = await axios.get(`${process.env.API_URL}/api/stats/${topic}/`)

      setLoading(false)
      setStats(res.data)
    } catch (error) {
      setLoading(false)
      setError(error.response && (error.response.data.detail || error.response.data.error))
    }
  }

  // Delete job
  const deleteJob = async (id, access_token) => {
    try {
      setLoading(true)

      const res = await axios.delete(`${process.env.API_URL}/api/jobs/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      setLoading(false)
      setDeleted(true)
    } catch (error) {
      setLoading(false)
      setError(error.response && (error.response.data.detail || error.response.data.error))
    }
  }

  // Clear Errors
  const clearErrors = () => {
    setError(null)
  }

  // Upload Resume
  const uploadResume = async (formData, access_token) => {
    try {
      setLoadingUpload(true)

      const res = await axios.put(`${process.env.API_URL}/api/upload/resume/`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      if (res.data) {
        setLoadingUpload(false)
        setUploaded(true)
      }
    } catch (error) {
      console.log(error.response)
      setLoadingUpload(false)
      setError(error.response && (error.response.data.detail || error.response.data.error))
    }
  }

  //Getting the user
  useEffect(() => {
    const cookies = cookie.parse(document.cookie)
    const access_token = cookies.access_token

    const fetchUser = async access_token => {
      try {
        const response = await axios.get(`${process.env.API_URL}/api/me/`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
        setUser(response.data)
        setUserLoaded(true)
      } catch (error) {
        console.error(error)
        setUserLoaded(true)
      }
    }

    if (access_token) {
      fetchUser(access_token)
    } else {
      setUserLoaded(true)
    }
  }, [])

  return (
    <JobContext.Provider
      value={{
        loading,
        loadingUpload,
        error,
        created,
        updated,
        deleted,
        applied,
        stats,
        newJob,
        updateJob,
        deleteJob,
        getTopicStats,
        applyToJob,
        setUpdated,
        checkJobApplied,
        setCreated,
        setDeleted,
        clearErrors,
        setStats,
        user,
        uploaded,
        error,
        clearErrors,
        uploadResume,
        setUploaded,
        userLoaded,
        setLoading,
        setApplied
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export default JobContext
