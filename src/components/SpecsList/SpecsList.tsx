import classNames from 'classnames';
/* import AOS from 'aos'; */
import 'aos/dist/aos.css';

import { useEffect } from 'react';
import { Spec } from '../../types/Spec';
import './specsList.scss';

interface Props {
  specs: Spec[];
  boldValue?: boolean;
  className?: string;
}

const RAM = 'ram';

export const SpecsList: React.FC<Props> = (props) => {
  const { specs, className = '', boldValue = false } = props;

  /*  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []); */

  return (
    <ul className={classNames('specs-list', className)}>
      {specs.map((spec, i) => (
        <li
          className="specs-list__item"
          key={spec.title}
          /* data-aos-delay={i * 50}
          data-aos="fade-left" */
        >
          <span
            className={classNames('text-gray', 'specs-list__spec', {
              'specs-list__uppercase': spec.title.toLocaleLowerCase() === RAM,
            })}
          >
            {spec.title}
          </span>
          <span className={classNames({
            'specs-list__boldValue': boldValue,
          })}
          >
            {spec.value}
          </span>
        </li>
      ))}
    </ul>
  );
};
