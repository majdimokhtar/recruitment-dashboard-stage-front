import axios from 'axios'
import Error404 from 'src/pages/404'
import Header from 'src/@core/layouts/components/recruitment/layout/Header'
import JobDetails from 'src/@core/layouts/components/recruitment/jobs/JobDetails'

function JobDetailsPage({ job, candidates, error, access_token, csrf_token }) {
  if (error?.includes('Not found.')) {
    return <Error404 />
  }

  return (
    <Header title={job?.title ?? 'Job Details'}>
      <div>
        <JobDetails job={job} candidates={candidates} access_token={access_token} csrf_token={csrf_token} />
      </div>
    </Header>
  )
}

export default JobDetailsPage

export async function getServerSideProps({ req, params }) {
  try {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}/`)
    const job = res.data.job
    const candidates = res.data.candidates
    const access_token = req.cookies.access_token || ''
    const csrf_token = req.cookies.csrf_token || ''
    console.log('req.cookies:', req.cookies)
    return {
      props: {
        job,
        candidates,
        access_token,
        csrf_token
      }
    }
  } catch (error) {
    return {
      props: {
        error: error.response.data.detail
      }
    }
  }
}
