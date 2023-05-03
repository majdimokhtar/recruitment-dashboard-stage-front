import axios from 'axios'
import UpdateJob from 'src/@core/layouts/components/recruitment/jobs/UpdateJob '
import Header from 'src/@core/layouts/components/recruitment/layout/Header'
import Error404 from 'src/pages/404'

export default function UpdateJobPage({ job, access_token, error }) {
  if (error?.includes('Not found')) return <Error404 />

  return (
    <Header title='Job Candidates'>
      <UpdateJob job={job} access_token={access_token} />
    </Header>
  )
}

export async function getServerSideProps({ req, params }) {
  const access_token = req.cookies.access_token || ''

  //   const user = await isAuthenticatedUser(access_token)

  //   if (!user) {
  //     return {
  //       redirect: {
  //         destination: '/login',
  //         permanent: false
  //       }
  //     }
  //   }

  try {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}/`)

    const job = res.data.job

    return {
      props: {
        job,
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
