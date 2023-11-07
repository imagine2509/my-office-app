import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";

export type UserState = {
    user: User
    isLoading: boolean
    error: string | null
}

const initialState: UserState = {
    user: {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        officeId: 0,
        companyId: 0,
        isAdmin: false
    },
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