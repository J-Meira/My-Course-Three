import { useState, useEffect, ChangeEvent } from 'react';

import {
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import { MdExpandMore } from 'react-icons/md';

import {
  ProductSearch,
  RadioButtonGroup,
  CheckBoxButtons,
} from '../../Components';

import { IOptionList } from '../../@Types';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { setProductParams } from '../../Redux/Slices';

const sortByOptions: IOptionList[] = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
];

export const Filters = () => {
  const dispatch = useAppDispatch();
  const matches = useMediaQuery('(max-width:599px)');
  const { brands, types, productParams } = useAppSelector(
    (state) => state.products,
  );
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(!matches);
  }, [matches]);

  return (
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
  );
};
