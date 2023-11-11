import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ModalState = Record<ModalName, boolean>;

export type ModalName = 
| 'reg'
| 'login'
| 'edit'
| 'editOffice'
| 'editRoom'

const initialState: ModalState = {
'reg': false,
'edit': false,
"login": false,
"editOffice": false,
"editRoom": false,
};

type ModalAction = {
  modalName: ModalName,
  id? : string | number
}


const modalSlice = createSlice({
 name: 'modal',
 initialState,
 reducers: {
   openModal: (state: ModalState, action: PayloadAction<ModalAction>) => {
     state[action.payload.modalName] = true;
   },
   closeModal: (state: ModalState, action: PayloadAction<ModalAction>) => {
     state[action.payload.modalName] = false;
   },
 },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
