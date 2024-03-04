import { TextField, debounce } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { setProductParams } from '../../Redux/Slices';
import { ChangeEvent, useState } from 'react';

export const ProductSearch = () => {
  const { productParams } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <TextField
      label='Search products'
      variant='outlined'
      fullWidth
      value={searchTerm || ''}
      sx={{ mb: 3 }}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
};
