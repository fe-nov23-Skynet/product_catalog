import './selectImage.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';

interface Props {
  product: Product;
}

export function SelectImage({ product }: Props) {
  const [activeImage, setActiveImage] = useState(product.images?.[0]);
  const activeImgSrc = activeImage.includes('http') ? activeImage : `/${activeImage.replace('imgs', 'img')}`;

  useEffect(() => {
    setActiveImage(product.images?.[0]);
  }, [product.id]);

  return (
    <div className="product-images">
      <div className="product-images__list">
        {product.images.map(image => {
          const imgSource = image.includes('http') ? image : `/${image.replace('imgs', 'img')}`;

          return (
            <button
              key={image}
              className={cn('product-images__item', {
                'product-images__item--active': image === activeImage,
              })}
              onClick={() => setActiveImage(image)}
            >
              <img
                src={imgSource}
                alt={product.name}
                className="product-images__image"
              />
            </button>
          );
        })}
      </div>
      <div className="product-images__main">
        <img
          src={activeImgSrc}
          alt={product.name}
          className="product-images__main-image"
        />
      </div>
    </div>
  );
}
