import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import './OptionLink.scss';

interface Props {
  capacity: string;
  to: string;
  selected?: boolean;
}

export const OptionLink: React.FC<Props> = (props) => {
  const { capacity, to: link, selected = false } = props;
  return (
    <Link
      to={link}
      className={classNames('capacity-link', { 'capacity-link--active': selected })}
    >
      {capacity}
    </Link>
  );
};
