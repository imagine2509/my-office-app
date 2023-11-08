import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { useAppCookie } from "../../hooks/redux";

export type UserState = {
    user: User
    isLoading: boolean
    error: string | null
}

export type TokenState = Pick<UserState, 'user'>

const initialState: UserState = {
    user: {
       refreshToken: ''
    },
    isLoading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state: TokenState) => {
            // const {getCookie} = useAppCookie('refreshToken')
            const refreshToken = getCookie()
            state.user.refreshToken = refreshToken
        },
        LogoutUser: (state: TokenState) => {
            const {removeAppCookie} = useAppCookie('refreshToken')
            removeAppCookie()
            state.user.refreshToken = ''
        },
    }
})

export const {getUser, LogoutUser} = userSlice.actions

export default userSlice.reducer