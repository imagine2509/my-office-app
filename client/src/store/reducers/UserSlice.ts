import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";

export type UserState = {
    users: User[]
    isLoading: boolean
    error: string | null
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    }
})

export default userSlice.reducer