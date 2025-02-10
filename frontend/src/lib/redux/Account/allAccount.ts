import { AccountDataModel } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const allAccountSlice = createSlice({
  name: 'allAccount',
  initialState: [] as AccountDataModel[],
  reducers: {
    pushAccountArray: (
      state,
      action: PayloadAction<{ allAccount: AccountDataModel[] }>
    ) => {
      state.push(...action.payload.allAccount);
    },
  },
});

export const { pushAccountArray } = allAccountSlice.actions;
export default allAccountSlice.reducer;
