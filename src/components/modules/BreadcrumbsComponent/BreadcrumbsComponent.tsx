import { Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { TApiProductsItem } from '../../../store/apiProducts/types';
import { Link as RouterLink } from 'react-router-dom';
import { TFormProductsItem } from '../../../store/formProducts/types';

export default function BreadcrumbsComponent({
  item,
}: {
  item?: TApiProductsItem | TFormProductsItem;
}) {
  const location = useLocation();
  return (
    <div role='presentation'>
      <Breadcrumbs aria-label='breadcrumb' sx={{ margin: '20px' }}>
        <Link component={RouterLink} underline='hover' color='inherit' to='/'>
          Homepage
        </Link>
        {location.pathname.includes('/products') && (
          <Link component={RouterLink} underline='hover' color='inherit' to='/products'>
            Products
          </Link>
        )}
        {location.pathname.includes('/products/') && item && (
          <Typography sx={{ color: 'text.primary' }}>{item?.title}</Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
