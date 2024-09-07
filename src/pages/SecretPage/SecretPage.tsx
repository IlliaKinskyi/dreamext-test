import { Box, Typography } from '@mui/material';
import BreadcrumbsComponent from '../../components/modules/BreadcrumbsComponent/BreadcrumbsComponent';

export default function SecretPage() {
  return (
    <Box>
      <BreadcrumbsComponent />
      <Typography sx={{ marginLeft: '20px', fontSize: '30px' }}>
        You can see this text only if your are login.
      </Typography>
    </Box>
  );
}
