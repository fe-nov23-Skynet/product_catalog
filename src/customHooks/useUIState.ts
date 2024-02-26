import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
// eslint-disable-next-line object-curly-newline
import { changeTheme as changeThemeAction } from '../features/UISlice';

export const useUIState = () => {
  const UIState = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();

  const changeTheme = () => {
    dispatch(changeThemeAction());
  };

  return {
    UIState,
    changeTheme,
  };
};
