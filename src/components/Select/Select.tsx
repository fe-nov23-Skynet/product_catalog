/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-parens */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as ArrowDown } from
  '../../styles/icons/chevron_arrow_down.svg';

import Styles from './Select.module.scss';

type SelectValue = string | number;

interface SelectOption {
  value: SelectValue;
  title: string;
}

interface Props {
  options: SelectOption[];
  selectedOption?: SelectOption;
  onSelect?: (value: SelectValue) => void;
}

export const Select:React.FC<Props> = (props) => {
  const { options, onSelect = () => {}, selectedOption } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selectedOption?.title || '');
  const rootRef = useRef<HTMLDivElement>(null);
  const placeHolder = 'Select value';

  function handleList() {
    setIsOpen(!isOpen);
  }

  function selectItem(option: SelectOption) {
    setSelectedValue(option.title);
    setIsOpen(false);
    onSelect(option.value);
  }

  function handleKeyOnOption(
    e: React.KeyboardEvent<HTMLLIElement>,
    option: SelectOption,
  ) {
    if (e.key === 'Enter') {
      selectItem(option);
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
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

  const openStyle = Styles['list_wrapper--open'];
  const closeIcon = Styles['select_icon--close'];

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={Styles.select}
      ref={rootRef}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    >
      <button
        className={Styles.select__button}
        onClick={handleList}
      >
        <p className={Styles.select_title}>
          {selectedValue || placeHolder}
        </p>
        <ArrowDown className={classNames(`${Styles.select_icon}`, {
          [closeIcon]: isOpen,
        })}
        />
      </button>

      <div className={classNames(`${Styles.list_wrapper}`, {
        [openStyle]: isOpen,
      })}
      >
        <ul className={Styles.select_list}>
          {options.map(
            option => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                className={Styles.select_item}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                tabIndex={0}
                onClick={() => selectItem(option)}
                onKeyUp={e => handleKeyOnOption(e, option)}
                key={option.value}
              >
                {option.title}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};
