import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NAV_URL } from '../Content/global';
import { TFormProductsItem } from '../../../store/formProducts/types';
import DeleteProduct from '../Product/DeleteProduct';

export default function FormProductItem({ product }: { product: TFormProductsItem }) {
  return (
    <Card
      sx={{
        margin: '20px',
        width: '200px',
        display: 'flex',
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
        }}>
        <CardContent>
          <Typography sx={{ fontWeight: 'bold', marginBottom: '8px' }}>{product.title}</Typography>
          <Typography sx={{}}>${product.price}</Typography>
        </CardContent>
      </CardActionArea>

      <Box>
        <DeleteProduct id={product.id} icon={true} />
      </Box>
    </Card>
  );
}
