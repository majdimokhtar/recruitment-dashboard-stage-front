import Header from 'src/@core/layouts/components/recruitment/layout/Header'
import NewJob from 'src/@core/layouts/components/recruitment/jobs/NewJob'
// import { isAuthenticatedUser } from '../../utils/isAuthenticated'

export default function NewJobPage(access_token ) {
  return (
    <Header title='Post a new Job'>
      <NewJob access_token={access_token}  />
    </Header>
  )
}

export async function getServerSideProps({ req }) {
  const access_token = req.cookies.access_token || ''
  // const csrf_token = req.cookies.csrf_token || ''
  // console.log('req.cookies:', req.cookies.access_token)

  // const user = await isAuthenticatedUser(access_token);
  // console.log("user",user)

  // if (!user) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      access_token,
      // csrf_token
    }
  }
}
