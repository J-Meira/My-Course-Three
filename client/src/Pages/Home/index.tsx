import { Grid } from '@mui/material';

import { Pagination } from '../../Components';
import { List } from './List';
import { Filters } from './Filters';

import { useAppDispatch } from '../../Redux/Hooks';
import { setPageNumber } from '../../Redux/Slices';
import { useProducts } from '../../Utils';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { metaData } = useProducts();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <Filters />
      </Grid>
      <Grid item xs={12} sm={9}>
        <List />
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
