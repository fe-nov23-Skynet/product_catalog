import { Outlet } from 'react-router-dom';
import { ProductCard } from './ProductCard/ProductCard';
import product from './productApi/products.json';

export function App() {
  return (
    <div className="App">
      <div>Header</div>
      <ProductCard product={product} />
      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
