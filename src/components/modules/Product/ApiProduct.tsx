import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TApiProductsItem } from '../../../store/apiProducts/types';
import axios from 'axios';
import { Endpoints } from '../../../constants/api';
import { CardContent, CardMedia, Container, Rating, Typography } from '@mui/material';
import BreadcrumbsComponent from '../BreadcrumbsComponent/BreadcrumbsComponent';
import { NAV_URL } from '../Content/global';

export default function ApiProduct({ id }: { id: string | undefined }) {
  const [product, setProduct] = useState<TApiProductsItem>({
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data }: { data: TApiProductsItem } = await axios.get(`${Endpoints.PRODUCTS}/${id}`);
        setProduct(data);
        return data;
      } catch (error) {
        alert('Помилка при загрузці продукту');
        navigate('/');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  useEffect(() => {
    if (!product) {
      alert('Помилка при загрузці продукту');
      navigate(NAV_URL.PRODUCT_PAGE);
    }
  }, [id, product, navigate]);

  return (
    <>
      <BreadcrumbsComponent item={product} />
      <Container
        sx={{
          margin: '20px',
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <CardMedia
          component='img'
          image={product.image}
          alt={product.title}
          sx={{
            width: '500px',
            height: '500px',
            objectFit: 'contain',
            marginBottom: '8px',
          }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'flex-start',
            maxWidth: '50%',
          }}>
          <Typography sx={{ fontWeight: 'bold', marginBottom: '20px' }}>{product.title}</Typography>

          {product.rating?.rate && <Rating name='read-only' value={product.rating.rate} readOnly />}

          {product.rating?.count && (
            <Typography sx={{ marginLeft: '20px', marginBottom: '20px' }}>
              Rating: {product.rating.count}
            </Typography>
          )}

          <Typography sx={{ marginBottom: '8px', color: 'gray' }}>
            Category: {product.category}
          </Typography>
          <Typography sx={{ marginBottom: '8px', textAlign: 'left' }}>
            {product.description}
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>${product.price}</Typography>
        </CardContent>
      </Container>
    </>
  );
}
