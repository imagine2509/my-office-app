import { Container, ThemeProvider } from '@mui/material'

import styles from '../profile.module.scss'
import { mainTheme } from '../../../themes/mainTheme'
import Personal from '../Personal/Personal'
import Bookings from '../Bookings/Bookings'

const props = {
  id: 1,
  firstName: 'Vasya',
  lastName: 'Pupkin',
  email: 'seva@123.com',
  officeId: 1,
  companyId: 1,
}

const ProfileContainer = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Container className={styles.profileContainer}>
        <Personal {...props} />
        <Bookings />
      </Container>
    </ThemeProvider>
  )
}

export default ProfileContainer
