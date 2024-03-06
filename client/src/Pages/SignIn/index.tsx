import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';

import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { MdLock } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { signIn } from '../../Redux/Slices';

export const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'all',
  });

  const submitForm = async (data: FieldValues) => {
    try {
      await dispatch(signIn(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) navigate(state?.from || '/');
  }, [user, state, navigate]);

  return (
    <Container
      component={Paper}
      maxWidth='sm'
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <MdLock />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(submitForm)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin='normal'
          fullWidth
          label='User Name'
          autoComplete='userName'
          autoFocus
          {...register('userName', { required: 'UserName is required' })}
          error={!!errors.userName}
          helperText={errors?.userName?.message as string}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Password'
          type='password'
          autoComplete='current-password'
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />
        <Button
          disabled={!isValid || isSubmitting}
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 3 }}
        >
          {isSubmitting ? <CircularProgress size='1.5rem' /> : 'Sign In'}
        </Button>
      </Box>
      <Typography
        component={Link}
        to='/sign-up'
        color='secondary'
        sx={{ textDecoration: 'none' }}
      >
        {"Don't have an account? Sign Up"}
      </Typography>
    </Container>
  );
};
