import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type ModalState = {
  open: ModalName | null
  id?: string | number
}

export type ModalName =
  | 'reg'
  | 'login'
  | 'edit'
  | 'editOffice'
  | 'editRoom'
  | 'createOffice'
  | 'createRoom'

const initialState: ModalState = {
  open: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeModal: (state: ModalState, action: PayloadAction<ModalState>) => {
      state.open = action.payload.open
      state.id = action.payload.id
    },
  },
})

export const { changeModal } = modalSlice.actions

export default modalSlice.reducer
