import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { TApiProductsItem } from '../../../store/apiProducts/types';
import { Link as RouterLink } from 'react-router-dom';
import { NAV_URL } from '../Content/global';

export default function ApiProductItem({ product }: { product: TApiProductsItem }) {
  return (
    <Card
      sx={{
        margin: '20px',
        maxWidth: '20%',
        width: '300px',
      }}>
      <CardActionArea
        component={RouterLink}
        to={`${NAV_URL.PRODUCT}${product.id}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '100%',
        }}>
        <CardMedia
          component='img'
          image={product.image}
          alt={product.title}
          sx={{
            width: '200px',
            height: '200px',
            objectFit: 'contain',
            marginBottom: '8px',
          }}
        />
        <CardContent>
          <Typography sx={{ fontWeight: 'bold', marginBottom: '8px' }}>{product.title}</Typography>
          <Typography sx={{}}>${product.price}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
