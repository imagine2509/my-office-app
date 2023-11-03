import { Container, ThemeProvider } from '@mui/material'

import styles from '../profile.module.scss'
import { mainTheme } from '../../../themes/mainTheme'

const ProfileContainer = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Container className={styles.profileContainer}></Container>
    </ThemeProvider>
  )
}

export default ProfileContainer
