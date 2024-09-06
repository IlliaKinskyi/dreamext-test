import { FormProvider, useForm } from 'react-hook-form';
import {
  productCreationSchema,
  TProductCreationSchema,
} from '../../../validations/productCreationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormControl, Typography } from '@mui/material';
import ProductCreationForm from './ProductCreationForm';
import { useAppDispatch } from '../../../store/store';
import { addProduct } from '../../../store/formProducts/formProductsSlice';

export default function ProductCreation() {
  const dispatch = useAppDispatch();
  const methods = useForm<TProductCreationSchema>({
    resolver: zodResolver(productCreationSchema),
  });

  const { handleSubmit } = methods;

  async function onSubmitData(obj: TProductCreationSchema) {
    dispatch(addProduct(obj));
    methods.reset();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitData)}>
        <FormControl sx={{ displa: 'flex', flexDirection: 'column', margin: '20px' }}>
          <Typography sx={{ marginBottom: '20px', fontSize: '20px' }}>Add Product</Typography>
          <ProductCreationForm />
          <Button
            variant='contained'
            type='submit'
            sx={{
              marginTop: '20px',
            }}>
            Add product
          </Button>
        </FormControl>
      </form>
    </FormProvider>
  );
}
