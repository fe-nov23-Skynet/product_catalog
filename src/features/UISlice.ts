import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
  isDarkMode: boolean;
}

const prevState = localStorage.getItem('UIState');

const initialState: UIState = prevState ? JSON.parse(prevState) : {
  isDarkMode: false,
};

function saveUIState(state: UIState) {
  localStorage.setItem('UIState', JSON.stringify(state));
}

export const UISlice = createSlice({
  name: 'UIState',
  initialState,
  reducers: {
    changeTheme: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isDarkMode = !state.isDarkMode;
      saveUIState(state);
    },
  },
});

export const { changeTheme } = UISlice.actions;

export default UISlice.reducer;
