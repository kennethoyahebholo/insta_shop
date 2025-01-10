export interface IFormData {
  productTitle: string;
  inventoryStocks: string;
  productDescription: string;
  productCollection: string[];
  price: string;
  oldPrice: string;
  size: string[];
  color: string[];
  weight: string[];
  shippingInventoryStocks: string;
}

export interface ImageData {
  id: number;
  src: string; // URL or Base64 string for the image
  name: string;
  isEnabled: boolean;
}
