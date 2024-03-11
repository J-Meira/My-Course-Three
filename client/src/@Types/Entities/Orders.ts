export interface IShippingAddress {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface IOrderItem {
  productId: number;
  name: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  id: number;
  buyerId: string;
  shippingAddress: IShippingAddress;
  orderDate: string;
  subtotal: number;
  deliveryFee: number;
  orderStatus: number;
  total: number;
  orderItems: IOrderItem[];
}
