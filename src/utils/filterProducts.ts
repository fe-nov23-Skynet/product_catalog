import { ShortProduct } from '../types/ShortProduct';

export function filterProducts(
  people: ShortProduct[],
  querryForFilter: string,
): ShortProduct[] {
  let productsCopy = [...people];
  const normalizedQuerry = querryForFilter.toLowerCase().trim();

  if (normalizedQuerry) {
    productsCopy = productsCopy.filter(
      product => product.name.toLowerCase().includes(normalizedQuerry)
                || product.ram.toLowerCase().includes(normalizedQuerry)
                || product.screen.toLowerCase().includes(normalizedQuerry)
                || product.fullPrice.toString().toLowerCase().includes(normalizedQuerry)
                || product.price.toString().toLowerCase().includes(normalizedQuerry)
                || product.category.toLowerCase().includes(normalizedQuerry),
    );
  }

  return productsCopy;
}

export function filterProductsAgain(
  products: ShortProduct[],
  query: string,
): ShortProduct[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return products;
  }

  const queryWords = normalizedQuery.split(' ').filter(Boolean);

  return products.filter(
    product => queryWords.every(
      word => Object.values(product)
        .some(value => typeof value === 'string' && value.toLowerCase().includes(word)),
    ),
  );
}
