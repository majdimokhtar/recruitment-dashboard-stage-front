import Header from 'src/@core/layouts/components/recruitment/layout/Header'

import axios from 'axios'
import Error404 from 'src/pages/404'
import JobCandidates from 'src/@core/layouts/components/recruitment/jobs/JobCandidates'

export default function JobCandidatesPage({ candidatesApplied, error }) {
  if (error?.includes('Not found')) return <Error404 />

  return (
    <Header title='Job Candidates'>
      <JobCandidates candidatesApplied={candidatesApplied} />
    </Header>
  )
}

export async function getServerSideProps({ req, params }) {
  const access_token = req.cookies.access_token || ''
  //   const access_token = req.cookies.access;

  //   const user = await isAuthenticatedUser(access_token);

  //   if (!user) {
  //     return {
  //       redirect: {
  //         destination: "/login",
  //         permanent: false,
  //       },
  //     };
  //   }

  try {
    const res = await axios.get(`${process.env.API_URL}/api/job/${params.id}/candidates/`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const candidatesApplied = res.data

    return {
      props: {
        candidatesApplied,
        access_token
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
