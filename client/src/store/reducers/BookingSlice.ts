import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Booking, BookingsState } from '../../models/Bookings'

const initialBookingsState: BookingsState = {
  bookings: [],
}

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: initialBookingsState,
  reducers: {
    getBookings: (state: BookingsState, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload
    },
    addBooking: (state: BookingsState, action: PayloadAction<Booking>) => {
      state.bookings = [...state.bookings, action.payload]
    },
    deleteBooking: (state: BookingsState, action: PayloadAction<Booking>) => {
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking.id !== action.payload.id
        ),
      }
    },
    editBooking: (state: BookingsState, action: PayloadAction<Booking>) => {
      state.bookings = state.bookings.map((booking) => {
        if (booking.id === action.payload.id) {
          return action.payload
        }
        return booking
      })
    },
  },
})

export const { getBookings, addBooking, deleteBooking, editBooking } =
  bookingsSlice.actions

export default bookingsSlice.reducer
