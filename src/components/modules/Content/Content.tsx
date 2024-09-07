import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Content() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: '20px',
      }}>
      <Typography variant='h2' gutterBottom>
        Test Assignment
      </Typography>
      <Typography variant='subtitle1' gutterBottom sx={{ maxWidth: '50%' }}>
        If you want login, you may use (default fakestoreapi login and password):
      </Typography>
      <Typography variant='h6' gutterBottom sx={{ maxWidth: '50%' }}>
        Login: "mor_2314"
      </Typography>{' '}
      <Typography variant='h6' gutterBottom sx={{ maxWidth: '50%' }}>
        Password: "83r5^_"
      </Typography>
    </Box>
  );
}
