import BreadcrumbsComponent from '../../BreadcrumbsComponent/BreadcrumbsComponent';
import { Button, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectFormProduct } from '../../../store/formProducts/selectors';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  productCreationSchema,
  TProductCreationSchema,
} from '../../../validations/productCreationSchema';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAV_URL } from '../Content/global';
import FormProductForm from './FormProductForm';
import { useAppDispatch } from '../../../store/store';
import { updateFormProduct } from '../../../store/formProducts/asyncActions';
import DeleteProduct from './DeleteProduct';

export default function FormProduct({ id }: { id: string | undefined }) {
  const product = useSelector(selectFormProduct(+id!));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!product) {
      alert('Помилка при загрузці продукту');
      navigate(NAV_URL.PRODUCT_PAGE);
      window.location.reload();
    }
  }, [id, product, navigate]);

  const methods = useForm<TProductCreationSchema>({
    resolver: zodResolver(productCreationSchema),
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (product) {
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('published', product.published);
    }
  }, []);

  const onSubmitData = (item: TProductCreationSchema) => {
    if (product) {
      const updatedProduct = {
        id: product.id,
        title: item.title,
        price: item.price,
        description: item.description,
        published: item.published,
        created: product.created,
      };
      dispatch(updateFormProduct(updatedProduct));
      navigate('/products');
    }
  };

  return (
    <FormProvider {...methods}>
      <BreadcrumbsComponent item={product} />

      <Typography sx={{ margin: '20px', fontSize: '20px', fontWeight: 'bold' }}>
        Product editing
      </Typography>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: '0',
        }}>
        <form onSubmit={handleSubmit(onSubmitData)}>
          {product && <FormProductForm isPublished={product.published} />}
          <Button
            variant='contained'
            type='submit'
            sx={{
              marginTop: '20px',
            }}>
            Edit product
          </Button>
          <DeleteProduct id={id!} />
        </form>
      </Container>
    </FormProvider>
  );
}
