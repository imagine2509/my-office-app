import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material'

import styles from '../profile.module.scss'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { getBookings } from '../../../../store/reducers/BookingSlice'

type parsedDate = {
  date: string
  time: string
}

const Bookings = () => {
  const dispatch = useAppDispatch()
  const bookings = useAppSelector((state) => state.bookings.bookings)
  const userId = useAppSelector((state) => state.users.user.id)

  useEffect(() => {
    const getAllBookings = async () => {
      const res = await fetch(
        `http://localhost:3002/api/userroom//bookings/${userId}`
      )
      const data = await res.json()
      console.log(data)

      dispatch(getBookings(data))
    }
    getAllBookings()
  }, [userId, dispatch])

  const parseDates = (date: Date): parsedDate => {
    const parsedDate = new Date(date)
    const day = ('0' + parsedDate.getDate()).slice(-2)
    const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2)
    const year = parsedDate.getFullYear()

    const hours = ('0' + parsedDate.getHours()).slice(-2)
    const minutes = ('0' + parsedDate.getMinutes()).slice(-2)

    const formattedDate = `${day}.${month}.${year}`
    const formattedTime = `${hours}:${minutes}`
    return {
      date: formattedDate,
      time: formattedTime,
    }
  }

  return (
    <Container className={styles.bookingsContainer}>
      <Typography component='h3' variant='h5'>
        Мои бронирования
      </Typography>
      <Grid container className={styles.bookingCardContainer}>
        {bookings.map((booking) => (
          <Grid item>
            <Card key={booking.id} className={styles.bookingCard}>
              <CardContent>
                <Typography component='p'>
                  Дата:{parseDates(booking.startTime).date}
                </Typography>
                <Typography component='p'>
                  Время:
                  {`${parseDates(booking.startTime).time} - ${
                    parseDates(booking.endTime).time
                  }`}
                </Typography>
                <Typography component='p'>
                  Переговорка: {booking.roomId}
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
