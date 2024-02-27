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
