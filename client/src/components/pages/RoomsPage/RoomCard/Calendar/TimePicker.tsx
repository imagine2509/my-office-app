import { Box, Button } from '@mui/material'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux'
import { addBooking } from '../../../../../store/reducers/BookingSlice'

const TimePickers = () => {
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const { id } = useParams()
  const userId = useAppSelector((state) => state.users.user.id)
  const dispatch = useAppDispatch()

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
      const booking = await res.json()
      if (res.ok) {
        dispatch(addBooking(booking))
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
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
    </>
  )
}

export default TimePickers
