import { Navigate, createBrowserRouter } from 'react-router-dom';

import { App } from '../App';

import {
  AboutPage,
  Buggy,
  ContactPage,
  HomePage,
  NotFoundPage,
  ProductPage,
  ServerErrorPage,
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
      { path: '/server-error', element: <ServerErrorPage /> },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
      { path: '/buggy', element: <Buggy /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
]);
