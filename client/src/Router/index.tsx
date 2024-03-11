import { Navigate, createBrowserRouter } from 'react-router-dom';

import { App } from '../App';

import {
  AboutPage,
  BasketPage,
  BuggyPage,
  CheckoutPage,
  ContactPage,
  HomePage,
  NotFoundPage,
  OrdersPage,
  ProductPage,
  ServerErrorPage,
  SignInPage,
  SignUpPage,
} from '../Pages';
import { RequireAuth } from './RequireAuth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: '/checkout', element: <CheckoutPage /> },
          { path: '/my-orders', element: <OrdersPage /> },
        ],
      },
      { path: '/', element: <HomePage /> },
      { path: '/product/:id', element: <ProductPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/not-found', element: <NotFoundPage /> },
      { path: '/server-error', element: <ServerErrorPage /> },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
      { path: '/buggy', element: <BuggyPage /> },
      { path: '/basket', element: <BasketPage /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
]);
