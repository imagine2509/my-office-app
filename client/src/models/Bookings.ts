export type Booking = {
  id: number
  startTime: Date
  endTime: Date
  userId: number
  roomId: number
}

export type BookingsState = {
  bookings: Booking[]
}
