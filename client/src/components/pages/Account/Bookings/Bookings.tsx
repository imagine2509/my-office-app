import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material'

import styles from '../profile.module.scss'

type booking = {
  id: number
  date: Date
  roomId: number
  theme: string
}

const mockBookings: booking[] = [
  { id: 1, date: new Date(), roomId: 1, theme: 'random theme' },
  { id: 2, date: new Date(), roomId: 1, theme: 'random theme' },
  { id: 3, date: new Date(), roomId: 1, theme: 'random theme' },
  { id: 4, date: new Date(), roomId: 1, theme: 'random theme' },
]

const Bookings = () => {
  return (
    <Container className={styles.bookingsContainer}>
      <Typography component='h3' variant='h5'>
        Мои бронирования
      </Typography>
      <Grid container className={styles.bookingCardContainer}>
        {mockBookings.map((booking) => (
          <Grid item>
            <Card key={booking.id} className={styles.bookingCard}>
              <CardContent>
                <Typography component='p'>
                  Дата: {booking.date.toLocaleString()}
                </Typography>
                <Typography component='p'>
                  Переговорка: {booking.roomId}
                </Typography>
                <Typography component='p'>
                  Тема совещания: {booking.theme}
                </Typography>
                <Button
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3 }}
                  type='button'>
                  Отменить
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Bookings
