import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper, Grid, Button } from '@mui/material';
import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { DropZoneInput, PageTitle, SelectInput, TextInput } from '..';
import { IProductFormProps } from '../../@Types';
import { validationSchema } from './validationSchema';
import { useAppDispatch } from '../../Redux';
import { createFormData, useProducts } from '../../Utils';
import { removeLoading, resetProducts, setLoading } from '../../Redux/Slices';
import { productServices } from '../../Services';

export const ProductForm = ({ product, onClose }: IProductFormProps) => {
  const dispatch = useAppDispatch();
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver<any>(validationSchema),
  });

  const { brands, types } = useProducts();
  const watchFile = watch('file', null);

  useEffect(() => {
    if (product && !watchFile && !isDirty) reset(product);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [product, reset, watchFile, isDirty]);

  const handleSubmitData = async (data: FieldValues) => {
    try {
      dispatch(setLoading('pendingProductForm'));
      console.log(data);
      const formData = createFormData(data);
      const response = product
        ? await productServices.updateById(product.id, formData)
        : await productServices.create(formData);
      dispatch(removeLoading('pendingProductForm'));
      if (response) {
        dispatch(resetProducts());
        onClose();
      }
    } catch (error) {
      dispatch(removeLoading('pendingProductForm'));
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle title='Product Details' />
      <Box component={Paper} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <Grid container spacing={3}>
            <TextInput
              grid={{ sm: 12 }}
              control={control}
              name='name'
              label='Product name'
            />
            <SelectInput
              options={brands}
              control={control}
              name='brand'
              label='Brand'
            />
            <SelectInput
              options={types}
              control={control}
              name='type'
              label='Type'
            />
            <TextInput
              type='number'
              control={control}
              name='price'
              label='Price'
            />
            <TextInput
              type='number'
              control={control}
              name='quantityInStock'
              label='Quantity in Stock'
            />
            <TextInput
              grid={{ sm: 12 }}
              multiline={true}
              rows={4}
              control={control}
              name='description'
              label='Description'
            />
            <DropZoneInput control={control} name='file' />
            <Grid
              item
              xs={12}
              sm={6}
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              {watchFile && watchFile.preview ? (
                <img
                  src={watchFile.preview}
                  alt='preview'
                  style={{ maxHeight: 200 }}
                />
              ) : (
                <img
                  src={product?.pictureUrl}
                  alt={product?.name}
                  style={{ maxHeight: 200 }}
                />
              )}
            </Grid>
          </Grid>
          <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
            <Button onClick={onClose} variant='contained' color='inherit'>
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              type='submit'
              variant='contained'
              color='success'
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};
