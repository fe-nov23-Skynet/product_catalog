/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import './langSwitch.scss';
import { useState } from 'react';
import { ReactComponent as UkIcon } from './united-kingdom-flag-icon.svg';
import { ReactComponent as UaIcon } from './ukraine-flag-icon.svg';

type Props = {
  checked: boolean;
  onCheck: () => void;
};

export const LangSwitch: React.FC<Props> = ({ checked, onCheck }) => {
  const a = 0;

  return (
    <p className="languageArea">
      <span
        className="langIcon"
        onClick={() => (checked ? onCheck() : () => {})}
      >
        <UaIcon />
      </span>
      <p className={classNames('lang-theme')}>
        <input
          type="checkbox"
          id="langSwitch"
          className="lang-input"
          onChange={onCheck}
          checked={checked}
        />
        <label htmlFor="langSwitch" className="lang-label" />
      </p>
      <span
        className="langIcon"
        onClick={() => (!checked ? onCheck() : () => {})}
      >
        <UkIcon />
      </span>
    </p>

  );
};
