import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../Redux';
import { productSelectors, getAllProducts, getFilters } from '../Redux/Slices';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, metaData } =
    useAppSelector((state) => state.products);

  useEffect(() => {
    if (!productsLoaded) dispatch(getAllProducts());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(getFilters());
  }, [filtersLoaded, dispatch]);

  return {
    products,
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    metaData,
  };
};
