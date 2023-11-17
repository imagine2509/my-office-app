import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Dayjs } from 'dayjs'

export type DateState = {
  date: MoreDate
}
export type MoreDate = {
  $d: string | null
}

export const initialDateState: DateState = {
  date: { $d: null },
}
const dateSlice = createSlice({
  name: 'date',
  initialState: initialDateState,
  reducers: {
    setDate: (state: DateState, action: PayloadAction<Dayjs | null>) => {
      state.date = { $d: action.payload ? action.payload.toISOString() : null }
    },
  },
})

export const { setDate } = dateSlice.actions

export default dateSlice.reducer
