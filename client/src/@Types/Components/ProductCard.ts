import { IProduct } from '..';

export interface IProductCardProps extends Omit<IProduct, 'description'> {}
