import { ChangeEvent, useEffect, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  useMediaQuery,
} from '@mui/material';

import {
  CheckBoxButtons,
  Pagination,
  ProductSearch,
  RadioButtonGroup,
} from '../../Components';

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import {
  getAllProducts,
  getFilters,
  productSelectors,
  setPageNumber,
  setProductParams,
} from '../../Redux/Slices';
import { MdExpandMore } from 'react-icons/md';
import { IOptionList } from '../../@Types';
import { List } from './List';

const sortByOptions: IOptionList[] = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
];

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const matches = useMediaQuery('(max-width:599px)');
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.products);
  const products = useAppSelector(productSelectors.selectAll);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!productsLoaded) dispatch(getAllProducts());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(getFilters());
  }, [filtersLoaded, dispatch]);

  useEffect(() => {
    setIsOpen(!matches);
  }, [matches]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <Accordion expanded={isOpen} onChange={() => setIsOpen(!isOpen)}>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            Filters
          </AccordionSummary>
          <AccordionDetails>
            <ProductSearch />
            <RadioButtonGroup
              options={sortByOptions}
              selectedValue={productParams.orderBy}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch(setProductParams({ orderBy: e.target.value }))
              }
            />
            <Divider sx={{ mb: 2, mt: 2 }} />
            <CheckBoxButtons
              label='Brands:'
              options={brands}
              checkedOptions={productParams.brands}
              onChange={(items: string[]) =>
                dispatch(setProductParams({ brands: items }))
              }
            />
            <Divider sx={{ mb: 2, mt: 2 }} />
            <CheckBoxButtons
              label='Types:'
              options={types}
              checkedOptions={productParams.types}
              onChange={(items: string[]) =>
                dispatch(setProductParams({ types: items }))
              }
            />
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} sm={9}>
        <List products={products} />
        {metaData && (
          <Pagination
            metaData={metaData}
            onPageChange={(page) => dispatch(setPageNumber(page))}
          />
        )}
      </Grid>
    </Grid>
  );
};
