import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISystemState } from '../../@Types';
import { RootState } from '..';

const localTheme = localStorage.getItem('V_D_R') || 'false';

const initialState: ISystemState = {
  isDarkMode: JSON.parse(localTheme),
  pendingActions: [],
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    handleTheme: (state) => {
      const isDark = !state.isDarkMode;
      state.isDarkMode = isDark;
      localStorage.setItem('V_D_R', JSON.stringify(isDark));
    },
    setLoading: (state, { payload }: PayloadAction<string>) => {
      state.pendingActions = [...state.pendingActions, payload];
    },
    removeLoading: (state, { payload }: PayloadAction<string>) => {
      if (state.pendingActions.length > 1) {
        const indexOf = state.pendingActions.findIndex((i) => i === payload);
        state.pendingActions = state.pendingActions.slice(indexOf, 1);
      } else {
        state.pendingActions = [];
      }
    },
  },
});

export const { handleTheme, setLoading, removeLoading } = systemSlice.actions;

export const getLoading = (state: RootState): boolean =>
  state.system.pendingActions.length > 0;
