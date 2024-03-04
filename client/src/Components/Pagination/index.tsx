import { useState } from 'react';
import { Box, Typography, Pagination as MuiPagination } from '@mui/material';
import { IPaginationProps } from '../../@Types';

export const Pagination = ({ metaData, onPageChange }: IPaginationProps) => {
  const { pageSize, currentPage, totalCount, totalPages } = metaData;
  const [pageNumber, setPageNumber] = useState(currentPage);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    onPageChange(page);
  };

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mt: 3, mb: 3 }}
    >
      <Typography variant='body1'>
        Displaying {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount!
          ? totalCount
          : currentPage * pageSize}{' '}
        of {totalCount} results
      </Typography>
      <MuiPagination
        color='secondary'
        size='large'
        count={totalPages}
        page={pageNumber}
        onChange={(_e, page) => handlePageChange(page)}
      />
    </Box>
  );
};
