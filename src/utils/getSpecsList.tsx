import { Product } from '../types/Product';
import { Spec } from '../types/Spec';

export function getSpecsList(fromProduct: Product, specsList: string[]) {
  return Object.entries(fromProduct).map(([key, value]) => {
    if (specsList.includes(key)) {
      return { title: key, value: String(value) };
    }
    return null;
  }).filter(obj => obj !== null) as Spec[];
  /* const result: Spec[] = [];

  specsList.forEach(spec => result.push({
    title: spec,
    value: fromProduct[spec],
  }));

  return result; */
}
