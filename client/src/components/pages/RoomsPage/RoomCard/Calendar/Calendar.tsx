import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../../../hooks/redux'
import { getBookings } from '../../../../../store/reducers/BookingSlice'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

import dayjs, { Dayjs } from 'dayjs'

const CalendarComponent = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs())
  const { id } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchBookings = async () => {
      const allBookings = await fetch(
        `http://localhost:3002/api/userroom/${id}`
      )
      const res = await allBookings.json()
      dispatch(getBookings(res))
    }
    fetchBookings()
  }, [value, dispatch, id])

  return (
    <>
      <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
    </>
  )
}

export default CalendarComponent
