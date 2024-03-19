import { useState } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';

import {
  LoadingIconButton,
  PageTitle,
  Pagination,
  ProductForm,
} from '../../Components';

import { IProduct } from '../../@Types';
import { useAppDispatch } from '../../Redux/Hooks';
import { resetProducts, setPageNumber } from '../../Redux/Slices';
import { currencyFormat, useProducts } from '../../Utils';
import { productServices } from '../../Services';

export const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { products, metaData } = useProducts();
  const [editMode, setEditMode] = useState(false);
  const [loadingTarget, setLoadingTarget] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined,
  );

  const handleSelectProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setEditMode(true);
  };

  const cancelEdit = () => {
    if (selectedProduct) setSelectedProduct(undefined);
    setEditMode(false);
  };

  const handleDeleteProduct = (id: number) => {
    setLoadingTarget(id);
    productServices
      .deleteById(id)
      .then(() => dispatch(resetProducts()))
      .catch((error) => console.log(error))
      .finally(() => setLoadingTarget(0));
  };

  return editMode ? (
    <ProductForm onClose={cancelEdit} product={selectedProduct} />
  ) : (
    <>
      <PageTitle
        title='Products Admin'
        action={() => setEditMode(true)}
        actionLabel='Create'
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align='left'>Product</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='center'>Type</TableCell>
              <TableCell align='center'>Brand</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {product.id}
                </TableCell>
                <TableCell align='left'>
                  <Box display='flex' alignItems='center'>
                    <img
                      src={product.pictureUrl}
                      alt={product.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align='right'>
                  {currencyFormat(product.price)}
                </TableCell>
                <TableCell align='center'>{product.type}</TableCell>
                <TableCell align='center'>{product.brand}</TableCell>
                <TableCell align='center'>{product.quantityInStock}</TableCell>
                <TableCell align='right'>
                  <LoadingIconButton
                    icon={<MdEdit />}
                    isLoading={false}
                    color='primary'
                    onClick={() => handleSelectProduct(product)}
                  />
                  <LoadingIconButton
                    isLoading={loadingTarget === product.id}
                    icon={<MdDelete />}
                    color='error'
                    onClick={() => handleDeleteProduct(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {metaData && (
        <Box sx={{ pt: 2 }}>
          <Pagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        </Box>
      )}
    </>
  );
};
