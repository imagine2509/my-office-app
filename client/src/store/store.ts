import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'


const rootReducer = () => {
    return {
    userReducer
}}

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer()
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']