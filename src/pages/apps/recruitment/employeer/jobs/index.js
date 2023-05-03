import axios from 'axios'
import Header from 'src/@core/layouts/components/recruitment/layout/Header'
import MyJobs from 'src/@core/layouts/components/recruitment/jobs/MyJobs'

export default function MyJobsPage({ jobs, access_token }) {
  return (
    <Header title='My Jobs'>
      <MyJobs jobs={jobs} access_token={access_token} />
    </Header>
  )
}

export async function getServerSideProps({ req }) {
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

  const res = await axios.get(`${process.env.API_URL}/api/me/jobs/`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })

  const jobs = res.data

  return {
    props: {
      jobs,
      access_token
    }
  }
}
