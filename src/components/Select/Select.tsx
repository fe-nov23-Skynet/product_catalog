/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-parens */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import Styles from './Select.module.scss';

interface Props {
  items: string[];
  selectedItem?: string;
  onSelect?: (item: string) => void;
}

export const Select:React.FC<Props> = (props) => {
  const { items, onSelect = () => {}, selectedItem } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selectedItem || '');
  const rootRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const placeHolder = 'Select value';

  function handleList() {
    setIsOpen(!isOpen);
  }

  function selectItem(value: string) {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect(value);
  }

  function handleEnter(
    e: React.KeyboardEvent<HTMLLIElement>,
    item: string,
  ) {
    if (e.key === 'Enter') {
      selectItem(item);
    }
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  /* function handleBlur(e: React.FocusEvent<HTMLDivElement, Element>):void {
    e.target
  } */

  const openStyle = Styles['list_wrapper--open'];
  const closeIcon = Styles['select_icon--close'];

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={Styles.select}
      onClick={handleList}
      ref={rootRef}
      /* onBlur={handleBlur} */
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      <p className={Styles.select_title}>
        {selectedValue || placeHolder}
      </p>
      <div className={classNames(`${Styles.select_icon}`, {
        [closeIcon]: isOpen,
      })}
      />

      <div className={classNames(`${Styles.list_wrapper}`, {
        [openStyle]: isOpen,
      })}
      >
        <ul className={Styles.select_list}>
          {items.map(
            item => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                className={Styles.select_item}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                onClick={() => selectItem(item)}
                onKeyUp={e => handleEnter(e, item)}
                key={uuidv4()}
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
