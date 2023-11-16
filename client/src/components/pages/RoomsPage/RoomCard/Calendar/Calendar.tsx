import { useEffect, useState } from 'react'
import moment from 'moment'

import { Calendar, momentLocalizer } from 'react-big-calendar'

import styles from '../RoomCard.styles.module.scss'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux'
import { getBookings } from '../../../../../store/reducers/BookingSlice'

const localizer = momentLocalizer(moment)

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const bookings = useAppSelector((state) => state.bookings.bookings)

  useEffect(() => {
    const fetchBookings = async () => {
      const allBookings = await fetch(
        `http://localhost:3002/api/userroom/${id}`
      )
      const res = await allBookings.json()
      console.log(typeof res.startTime)

      dispatch(getBookings(res))
    }
    fetchBookings()
  }, [])

  return (
    <>
      <Calendar
        date={currentDate}
        onNavigate={setCurrentDate}
        localizer={localizer}
        defaultDate={new Date()}
        events={bookings}
        startAccessor='startTime'
        endAccessor='endTime'
        className={styles.calendarContainer}
      />
    </>
  )
}

export default CalendarComponent
