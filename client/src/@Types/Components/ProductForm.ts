import { IProduct } from '..';

export interface IProductFormProps {
  product?: IProduct;
  onClose: () => void;
}
