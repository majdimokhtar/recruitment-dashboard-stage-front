import axios from 'axios'
import Header from 'src/@core/layouts/components/recruitment/layout/Header'
import JobsApplied from 'src/@core/layouts/components/recruitment/jobs/JobApplied'

export default function JobsAppliedPage({ jobs }) {
  return (
    <Header title='Jobs Applied'>
      <JobsApplied jobs={jobs} />
    </Header>
  )
}

export async function getServerSideProps({ req }) {
  const access_token = req.cookies.access_token || ''

  //   const user = await isAuthenticatedUser(access_token);

  //   if (!user) {
  //     return {
  //       redirect: {
  //         destination: "/login",
  //         permanent: false,
  //       },
  //     };
  //   }

  const res = await axios.get(`${process.env.API_URL}/api/me/jobs/applied/`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })

  const jobs = res.data

  return {
    props: {
      jobs
    }
  }
}
