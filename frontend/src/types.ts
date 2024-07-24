export interface Product {
  id: number;
  title: string;
  price: number;
  src: string;
}

export interface ProductDetails extends Product {
  description: string;
  brand: string;
  category: string;
}
