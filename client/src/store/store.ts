import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "./reducers/ModalSlice";
import UserSlice from "./reducers/UserSlice";

const store = configureStore({
    reducer: {
        modals: ModalSlice,
        users: UserSlice
    }
}) 

export default store
