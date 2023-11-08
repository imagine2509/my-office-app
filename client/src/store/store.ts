import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import { officeAPI } from "../hooks/officeService";


const rootReducer = () => {
    return {
    userReducer,
    [officeAPI.reducerPath]:officeAPI.reducer
}}

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer(), // TODO: users: userReducer, nextRed: ...
        middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(officeAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']