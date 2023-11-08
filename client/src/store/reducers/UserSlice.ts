import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../models/User'

export type UserState = {
  user: User
}

export const initialUserState: UserState = {
  user: {
    id: 0,
    firstName: 'Adam',
    lastName: 'Jenkins',
    email: 'test@gmail.com',
    password: '1',
    officeId: 0,
    companyId: 0,
    isAdmin: false,
  },
}
const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    checkUser: (state: UserState, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setUser: (state:UserState, action: PayloadAction<User>) => {
        state.user = action.payload
    },
    LogoutUser: (state: UserState, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

export const { checkUser, setUser, LogoutUser } = userSlice.actions

export default userSlice.reducer
