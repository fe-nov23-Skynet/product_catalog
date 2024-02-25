import './favoriteButton.scss';
import { ReactComponent as EmptyHeart } from '../../../styles/icons/favourites_heart_like.svg';
import { ReactComponent as FilledHeart } from '../../../styles/icons/favourites_heart_filled.svg';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickAdd: (...args: any[]) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickRemove: (...args: any[]) => void
  active: boolean,
}

export function FavoriteButton({
  onClickAdd,
  onClickRemove,
  active,
}: Props) {
  return (
    <div>
      {active ? (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button className="make-favorite" onClick={onClickRemove}>
          <FilledHeart />
        </button>
      ) : (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button className="make-favorite" onClick={onClickAdd}>
          <EmptyHeart />
        </button>
      )}
    </div>
  );
}
