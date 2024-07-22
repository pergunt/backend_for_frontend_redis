export interface ProductListItem {
  id: number;
  title: string;
  price: number;
  src: string;
}

export interface ProductDetails extends ProductListItem {
  description: string;
  brand: string;
  category: string;
}
