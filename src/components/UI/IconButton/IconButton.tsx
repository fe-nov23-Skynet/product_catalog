/* eslint-disable indent */
import React from 'react';
import './Button.scss';
import classNames from 'classnames';
import { ReactComponent as PlusIcon } from '../../../styles/icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../../styles/icons/minus.svg';
import { ReactComponent as ArrowUpIcon } from '../../../styles/icons/chevron_arrow_up.svg';
import { ReactComponent as ArrowDownIcon } from '../../../styles/icons/chevron_arrow_down.svg';
import { ReactComponent as ArrowLeftIcon } from '../../../styles/icons/chevron_arrow_left.svg';
import { ReactComponent as ArrowRightIcon } from '../../../styles/icons/chevron_arrow_right.svg';
import { ReactComponent as SendIcon } from '../../../styles/icons/send_message.svg';

interface Props {
  type: string;
  onClick?: () => void;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}
export const IconButton: React.FC<Props> = (props) => {
  const {
    type,
    onClick = () => { },
    className = '',
    ...other
  } = props;

  function getIcon(iconType: string) {
    switch (type) {
      case 'plus': return (<PlusIcon />);
      case 'minus': return (<MinusIcon />);
      case 'arrowUp': return (<ArrowUpIcon />);
      case 'arrowDown': return (<ArrowDownIcon />);
      case 'arrowLeft': return (<ArrowLeftIcon />);
      case 'arrowRight': return (<ArrowRightIcon />);
      case 'sendMsg': return (<SendIcon />);
      default: return '';
    }
  }

  return (
    <button
      className={classNames('iconButton', className)}
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {getIcon(type)}
    </button>
  );
};
