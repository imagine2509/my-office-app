import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { useAppSelector } from '../../../hooks/redux'

const UsersApproval = () => {
  const companyId = useAppSelector((state) => state.users.user.companyId)

  // useEffect(() => {
  //     const usersToApprove = async () {
  //         const users = await fetch('')
  //     }
  // })

  return <Grid container></Grid>
}
