import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "./reducers/ModalSlice";

const store = configureStore({
    reducer: {
        modals: ModalSlice
    }
}) 

export default store
