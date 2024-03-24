import './ProductTable.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getShortProducts } from '../../../api/api';
import { ShortProduct } from '../../../types/ShortProduct';

export const ProductTable = () => {
  const [products, setProducts] = useState<ShortProduct[]>([]);

  useEffect(() => {
    getShortProducts('products')
      .then((p) => setProducts(p.splice(0, 5)));
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>pic</th>
          <th>phones</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, i) => (
          <tr>
            <th>{product.id}</th>
            <td><img className="productPic" src={`/${product.image}`} alt={product.name} /></td>
            <th>{product.category}</th>
            <td>
              <Link to={`/${product.category}/${product.itemId}`}>
                {product.name}
              </Link>
            </td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
