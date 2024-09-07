import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../../store/store';
import { TUser } from '../../../store/auth/types';
import { SyntheticEvent, useEffect, useState } from 'react';
import { login } from '../../../store/auth/asyncActions';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../../../store/auth/selectors';
import { logout } from '../../../store/auth/authSlice';

export default function AuthMenu() {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const { isAuth } = useSelector(selectAuthData);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const userCredentials: TUser = {
      username: emailValue,
      password: passwordValue,
    };

    dispatch(login(userCredentials));
  }
  return (
    <Container sx={{ width: '300px' }}>
      {isAuth ? (
        <Box>
          <Typography>Hello, logined user (Your name could be here)</Typography>
          <Typography
            onClick={() => dispatch(logout())}
            color='secondary'
            sx={{ marginTop: '10px', textAlign: 'center', cursor: 'pointer' }}>
            Logout
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />

            <Button type='submit' fullWidth variant='contained' color='primary'>
              Sign In
            </Button>
          </form>
        </Box>
      )}
    </Container>
  );
}
