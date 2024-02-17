/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-parens */
import React, { useState } from 'react';
import classNames from 'classnames';

import Styles from './Select.module.scss';

export const Select:React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const a = ['Phone 1', 'Size 2', 'Tablet 3', 'Screen 4', 'Size 2'];
  const placeHolder = 'Select value';

  function handleList() {
    setIsOpen(!isOpen);
  }

  function selectItem(value: string) {
    setSelectedValue(value);
    setIsOpen(false);
  }

  function handleEnter(
    e: React.KeyboardEvent<HTMLLIElement>,
    item: string,
  ) {
    if (e.key === 'Enter') {
      selectItem(item);
    }
  }

  const openStyle = Styles['list_wrapper--open'];
  const closeIcon = Styles['select_icon--close'];

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={Styles.select}
      onClick={handleList}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      {selectedValue || placeHolder}
      <div className={classNames(`${Styles.select_icon}`, {
        [closeIcon]: isOpen,
      })}
      />

      <div className={classNames(`${Styles.list_wrapper}`, {
        [openStyle]: isOpen,
      })}
      >
        <ul className={Styles.select_list}>
          {a.map(
            item => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                className={Styles.select_item}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                onClick={() => selectItem(item)}
                onKeyUp={e => handleEnter(e, item)}
              >
                {item}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};
