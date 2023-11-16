import { configureStore } from '@reduxjs/toolkit'
import ModalSlice from './reducers/ModalSlice'
import UserSlice from './reducers/UserSlice'
import { officeAPI } from '../hooks/officeService'
import { roomAPI } from '../hooks/roomService'
import BookingSlice from './reducers/BookingSlice'

const store = configureStore({
  reducer: {
    modals: ModalSlice,
    users: UserSlice,
    [officeAPI.reducerPath]: officeAPI.reducer,
    [roomAPI.reducerPath]: roomAPI.reducer,
    bookings: BookingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(officeAPI.middleware)
      .concat(roomAPI.middleware),
})

export default store
