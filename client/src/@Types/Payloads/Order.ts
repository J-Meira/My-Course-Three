import { IShippingAddress } from '..';

export interface IOrderCreate {
  saveAddress: boolean;
  shippingAddress: IShippingAddress;
}
