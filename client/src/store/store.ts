import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "./reducers/ModalSlice";
import UserSlice from "./reducers/UserSlice";
import { officeAPI } from "../hooks/officeService";
import { roomAPI } from "../hooks/roomService";
import { userAPI } from "../hooks/userService";

const store = configureStore({
    reducer: {
        modals: ModalSlice,
        users: UserSlice,
        [officeAPI.reducerPath]:officeAPI.reducer,
        [roomAPI.reducerPath]:roomAPI.reducer,
        [userAPI.reducerPath]:userAPI.reducer,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(officeAPI.middleware).concat(roomAPI.middleware).concat(userAPI.middleware)
})

export default store
