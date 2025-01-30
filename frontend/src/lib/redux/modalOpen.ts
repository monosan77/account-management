import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface OpenState {
  isOpen: boolean;
  name: string;
  accountId: string;
}
const initialState: OpenState = {
  isOpen: false,
  name: '',
  accountId: '',
};
export const openModal = createSlice({
  name: 'modalOpen',
  initialState,
  reducers: {
    setIsOpen: (
      state,
      action: PayloadAction<{ accountName: string; accountId: string }>
    ) => {
      state.isOpen = true;
      state.name = action.payload.accountName;
      state.accountId = action.payload.accountId;
    },
    setIsClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setIsOpen, setIsClose } = openModal.actions;
export default openModal.reducer;
