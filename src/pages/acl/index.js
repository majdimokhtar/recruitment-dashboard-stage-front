// ** React Imports
import { useContext } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useAuth } from 'src/hooks/useAuth'

//import { axiosPrivateInstance } from '../../axios'
import useAxiosPrivate from 'src/hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'
import authConfig from 'src/configs/auth'
import { axiosInstance } from 'src/axios'

const ACLPage = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const auth = useAuth()
  const [project, setProject] = useState(null)
  const axiosPrivateInstance = useAxiosPrivate()

  useEffect(() => {
    async function getProject() {
        const res = await axiosPrivateInstance.get(authConfig.projectEndpoint)
        console.log('project :: ', res.data)
        setProject(res.data.message)
    }

    getProject()
  }, [project])

  return (
    <Grid container spacing={6}>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader title='Common' />
          <CardContent>
            <Typography sx={{ mb: 4 }}>{project}</Typography>
            <Typography sx={{ color: 'primary.main' }}>This card is visible to 'user' and 'admin' both</Typography>
          </CardContent>
        </Card>
      </Grid>
      {ability?.can('read', 'analytics') ? (
        <Grid item md={6} xs={12}>
          <Card>
            <CardHeader title='Analytics' />
            <CardContent>
              <Typography sx={{ mb: 4 }}>User with 'Analytics' subject's 'Read' ability can view this card</Typography>
              <Typography sx={{ color: 'error.main' }}>This card is visible to 'admin' only</Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
    </Grid>
  )
}
ACLPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ACLPage
