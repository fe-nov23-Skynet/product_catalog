import './selectImage.scss';
import cn from 'classnames';
import { useState } from 'react';
import { Product } from '../../types/Product';

interface Props {
  product: Product;
}

export function SelectImage({ product }: Props) {
  const [activeImage, setActiveImage] = useState(product.images?.[0]);

  return (
    <div className="product-images">
      <div className="product-images__list">
        {product.images.map(image => (
          <button
            key={image}
            className={cn('product-images__item', {
              'product-images__item--active': image === activeImage,
            })}
            onClick={() => setActiveImage(image)}
          >
            <img
              src={`/${image.replace('imgs', 'img')}`}
              alt={product.name}
              className="product-images__image"
            />
          </button>
        ))}
      </div>
      <div className="product-images__main">
        <img
          src={`/${activeImage.replace('imgs', 'img')}`}
          alt={product.name}
          className="product-images__main-image"
        />
      </div>
    </div>
  );
}
