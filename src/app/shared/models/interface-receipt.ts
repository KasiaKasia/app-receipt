export interface Receipt {
  id?: number;
  storeName?: string;
  dateOfPurchase?: string;
  totalPrice?: number;
  productId?: Product;
  barcode?: string;
}

export interface Product {

  id?: string;
  name?: string;
  quantity?: number;
  price?: number;
  totalPrice?: number;
}

export interface ClickPosition {
  x?: number;
  y?: number;
}