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

const create = (data: FormData) =>
  api.post('product', data, {
    headers: { 'Content-type': 'multipart/form-data' },
  });

const updateById = (id: number, data: FormData) =>
  api.put(`product/${id}`, data, {
    headers: { 'Content-type': 'multipart/form-data' },
  });

const deleteById = (id: number) => api.delete(`product/${id}`);

export const productServices = {
  getAll,
  getById,
  getFilters,
  create,
  updateById,
  deleteById,
};
