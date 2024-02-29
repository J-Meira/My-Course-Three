export interface IBasketItemUpdate {
  productId: number;
  quantity: number;
}
export interface IBasketItemUpdateAction {
  productId: number;
  quantity?: number;
}
