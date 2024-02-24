import './favoriteButton.scss';
import emptyHeart from '../../../styles/icons/favourites_heart_like.svg';
import filledHeart from '../../../styles/icons/favourites_heart_filled.svg';
import { Product } from '../../../types/Product';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  makeFavorite: (...args: any[]) => void
  product: Product,
  favoriteProduct: string,
}

export function FavoriteButton({
  makeFavorite,
  product,
  favoriteProduct,
}: Props) {
  return (
    <button className="make-favorite" onClick={makeFavorite}>
      <img
        src={favoriteProduct === product.id ? filledHeart : emptyHeart}
        alt="Make favorite"
      />
    </button>

  );
}
