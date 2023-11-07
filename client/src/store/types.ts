import store from "./store";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ErrorState = {
    error: string | null;
}

export type ModalState = {
  isOpen: boolean
}

export type ModalWindow = {
  name: string
}