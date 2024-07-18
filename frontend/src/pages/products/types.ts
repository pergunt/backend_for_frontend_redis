export interface ProductListItem {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export interface ProductDetails extends ProductListItem {
  description: string;
  brand: string;
  category: string;
}
