import { createSlice } from '@reduxjs/toolkit';
export interface OpenState {
  value: boolean;
}
const initialState: OpenState = {
  value: false,
};
export const openModal = createSlice({
  name: 'modalOpen',
  initialState,
  reducers: {
    setIsOpen: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setIsOpen } = openModal.actions;
export default openModal.reducer;
