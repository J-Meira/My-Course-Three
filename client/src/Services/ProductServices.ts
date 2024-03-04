import { api } from '.';
import { IProduct, IProductParams } from '../@Types';

const getAll = (params: IProductParams) =>
  api.get('product', {
    params: {
      ...params,
      brands: params.brands.length > 0 ? params.brands.toString() : undefined,
      types: params.types.length > 0 ? params.types.toString() : undefined,
    },
  });

const getById = (id: number): Promise<IProduct | null> =>
  api.get(`product/${id}`);

const getFilters = () => api.get('product/filters');

export const productServices = {
  getAll,
  getById,
  getFilters,
};
