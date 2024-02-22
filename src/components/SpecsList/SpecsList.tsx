import classNames from 'classnames';
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

  return (
    <ul className={classNames('specs-list', className)}>
      {specs.map(spec => (
        <li className="specs-list__item" key={spec.title}>
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
