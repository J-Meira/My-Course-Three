import { Navigate, createBrowserRouter } from 'react-router-dom';

import { App } from '../App';

import {
  AboutPage,
  ContactPage,
  HomePage,
  NotFoundPage,
  ProductPage,
  SignInPage,
  SignUpPage,
} from '../Pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/product/:id', element: <ProductPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/not-found', element: <NotFoundPage /> },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
]);
