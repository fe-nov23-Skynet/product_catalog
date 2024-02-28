import i18n from 'i18next';
import { createSlice } from '@reduxjs/toolkit';

export interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: localStorage.getItem('language') || 'en',
};

function saveLanguageState(state: LanguageState) {
  localStorage.setItem('language', state.language);
}

export const languageSlice = createSlice({
  name: 'LanguageState',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.language = action.payload;
      saveLanguageState(state);
      i18n.changeLanguage(state.language);
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
