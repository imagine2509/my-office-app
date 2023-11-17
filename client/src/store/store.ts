import { configureStore } from '@reduxjs/toolkit';
import ModalSlice from './reducers/ModalSlice';
import UserSlice from './reducers/UserSlice';
import { officeAPI } from '../hooks/officeService';
import { roomAPI } from '../hooks/roomService';
import BookingSlice from './reducers/BookingSlice';
import { userAPI } from '../hooks/userService';
import DateSlice from './reducers/DateSlice';

const store = configureStore({
	reducer: {
		modals: ModalSlice,
		users: UserSlice,
		bookings: BookingSlice,
		dates: DateSlice,
		[officeAPI.reducerPath]: officeAPI.reducer,
		[roomAPI.reducerPath]: roomAPI.reducer,
		[userAPI.reducerPath]: userAPI.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(officeAPI.middleware)
			.concat(roomAPI.middleware)
			.concat(userAPI.middleware),
});

export default store;
