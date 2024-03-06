import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

import { useAppSelector } from '../../Redux/Hooks';
import { authServices } from '../../Services';
import { useToast } from '../../Utils';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'all',
  });

  const submitForm = async (data: FieldValues) => {
    authServices
      .signUp({
        email: data.email,
        userName: data.userName,
        password: data.password,
      })
      .then(() => {
        useToast.success('Registration successful - you can now login');
        navigate('/sign-in');
      })
      .catch((error) => {
        console.log(error);
        if (error && error instanceof Array) {
          error.map((err: string) => {
            if (err.includes('Password')) {
              setError('password', { message: err });
            } else if (err.includes('Email')) {
              setError('email', { message: err });
            } else if (err.includes('Username')) {
              setError('userName', { message: err });
            }
          });
        } else {
          useToast.error('A problem occurred, please try again later');
        }
      });
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

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
        Sign Up
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
          label='email'
          type='email'
          autoComplete='email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
              message: 'Not a valid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors?.email?.message as string}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Password'
          type='password'
          autoComplete='current-password'
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: 'Password does not meet complexity requirements',
            },
          })}
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
          {isSubmitting ? <CircularProgress size='1.5rem' /> : 'Sign Up'}
        </Button>
      </Box>
      <Typography
        component={Link}
        to='/sign-in'
        color='secondary'
        sx={{ textDecoration: 'none' }}
      >
        {'Already  have an account? Sign In'}
      </Typography>
    </Container>
  );
};
