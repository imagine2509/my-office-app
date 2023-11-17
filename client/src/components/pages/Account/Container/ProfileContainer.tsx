import { Grid } from '@mui/material'

import styles from '../profile.module.scss'
import Personal from '../Personal/Personal'
import Bookings from '../Bookings/Bookings'
import Birthday from '../Personal/Birthday'

const ProfileContainer = () => {
  return (
    <Grid container className={styles.profileContainer}>
      <Grid item container className={styles.profileLeftContainer}>
        <Grid item>
          <Personal />
        </Grid>
        <Grid item>
          <Birthday />
        </Grid>
      </Grid>
      <Grid item>
        <Bookings />
      </Grid>
    </Grid>
  )
}

export default ProfileContainer
