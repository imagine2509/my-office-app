import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { format } from 'date-fns'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Box, Button } from '@mui/material'

type Booking = {
  id: number | string
  startTime: Date
  endTime: Date
}

const localizer = momentLocalizer(moment)

function TestRoomCard() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const { id } = useParams()
  const userId = localStorage.getItem('id')

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      const data = { startTime, endTime, id, userId }
      console.log(data)
      const res = await fetch(`http://localhost:3002/api/userroom/${id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const [booking, setBookings] = useState<Booking[]>([
    {
      startTime: new Date(),
      endTime: new Date(),
      id: 0,
    },
  ])

  useEffect(() => {
    const fetchBookings = async () => {
      const allBookings = await fetch(
        `http://localhost:3002/api/userroom/${id}`
      )
      const res = await allBookings.json()
      console.log(res)

      const result = res.map((el: Booking) => {
        el.endTime = new Date(el.endTime)
        el.startTime = new Date(el.startTime)
        return el
      })
      setBookings(result)
    }
    fetchBookings()
  }, [])
  return (
    <div>
      <div>Все брони для комнаты с ID:{id}</div>
      {booking.map((date, index) => {
        return (
          <div key={index}>
            <div>
              <span>
                Дата брони: {format(new Date(date.startTime), 'MM-dd')}
              </span>
              <span>
                Время брони с {format(new Date(date.startTime), 'HH-mm')}
              </span>
              <span> до {format(new Date(date.endTime), 'HH-mm')}</span>
            </div>
          </div>
        )
      })}
      <div>
        <Calendar
          date={currentDate}
          onNavigate={setCurrentDate}
          localizer={localizer}
          defaultDate={new Date()}
          events={booking}
          startAccessor='startTime'
          endAccessor='endTime'
          style={{ height: 350, width: 700 }}
        />
      </div>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker', 'TimePicker']}>
            <TimePicker
              ampm={false}
              label='Start Time'
              onAccept={(value) => setStartTime(value.$d)}
            />
            <TimePicker
              ampm={false}
              label='End Time'
              onAccept={(value) => setEndTime(value.$d)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
          Забронировать
        </Button>
      </Box>
    </div>
  )
}

export default TestRoomCard
