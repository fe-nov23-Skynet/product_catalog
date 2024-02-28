import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../redux/store';
import { changeLanguage as changeLanguageAction } from '../features/translateSlice';

export const useTranslate = () => {
  const LanguageState = useSelector((state: RootState) => state.language);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const changeLanguage = (newLanguage: string) => {
    dispatch(changeLanguageAction(newLanguage));
  };

  const translate = (text: string) => {
    t(text);
  };

  return {
    LanguageState,
    changeLanguage,
    translate,
  };
};
