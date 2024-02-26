/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import './toggleButton.scss';
import { useUIState } from '../../customHooks/useUIState';

type Props = {
  onMobile?: boolean;
  componentKey: number;
};

export const ToggleButton: React.FC<Props> = ({ onMobile, componentKey }) => {
  const { UIState, changeTheme } = useUIState();

  return (
    <div className={classNames('toggle-theme', {
      dark: UIState.isDarkMode,
      'toggle-mobile': onMobile,
    })}
    >
      <input type="checkbox" id={`toggle-${componentKey}`} className="toggle-input" onChange={changeTheme} checked={UIState.isDarkMode} />
      <label htmlFor={`toggle-${componentKey}`} className="toggle-label" />
    </div>
  );
};
