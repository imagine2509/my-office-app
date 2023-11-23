import { Box, Container, Typography } from '@mui/material'
import styles from './description.style.module.scss'

type Client = {
  logo: string
  name: string
}

const clients: Client[] = [{ logo: '/img/google_logo.png', name: 'Google' }]

const OurClients = () => {
  return (
    <Container component={'section'} className={styles.clientContainer}>
      <Typography component={'h3'} variant='h4' className={styles.clientHeader}>
        Наши клиенты:
      </Typography>
      {clients.map((client) => (
        <Box className={styles.clientBlock}>
          <Box
            component={'img'}
            alt='client-logo'
            src={client.logo}
            className={styles.clientLogo}
          />
          <Typography component={'p'} className={styles.clientName}>
            {client.name}
          </Typography>
        </Box>
      ))}
    </Container>
  )
}

export default OurClients
