import { IMetaData, IProductParams } from '..';

export interface IProductsState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  brands: string[];
  types: string[];
  productParams: IProductParams;
  metaData: IMetaData | null;
}
