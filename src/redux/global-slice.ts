import type { RootState } from "@/app/store";
import { IHomeLoadDetails } from "@/models/home-loan-details";
import { ILoanChanges } from "@/models/loan-change";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  isLoading: number;
  homeLoanDetails: IHomeLoadDetails | undefined;
  checkboxStates: ILoanChanges;
}

const initialState: GlobalState = {
  isLoading: 0,
  homeLoanDetails: undefined,
  checkboxStates: {
    fix: 1,
    cancel: 1,
    reduce: 1,
    "change io/pi": 1,
    "loan split": 1,
    "loan purpose": 1,
  },
};

interface ICheckboxChange {
  key: keyof ILoanChanges;
  value: number;
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    addLoading: (state) => {
      state.isLoading += 1;
    },
    removeLoading: (state) => {
      state.isLoading -= 1;
    },
    setHomeLoanDetails: (
      state,
      action: PayloadAction<IHomeLoadDetails | undefined>
    ) => {
      state.homeLoanDetails = action.payload;
    },
    onCheckboxChange: (state, action: PayloadAction<ICheckboxChange>) => {
      state.checkboxStates[action.payload.key] = action.payload.value;
    },
    setCheckboxStates: (state, action: PayloadAction<ILoanChanges>) => {
      state.checkboxStates = action.payload;
    },
  },
});

export const {
  addLoading,
  removeLoading,
  setHomeLoanDetails,
  onCheckboxChange,
  setCheckboxStates,
} = globalSlice.actions;

export const selectIsLoading = (state: RootState) => state.global.isLoading;
export const selectHomeLoanDetails = (state: RootState) =>
  state.global.homeLoanDetails;
export const selectCheckboxStates = (state: RootState) =>
  state.global.checkboxStates;

export default globalSlice.reducer;
