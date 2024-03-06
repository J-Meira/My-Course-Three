import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useToast } from '../Utils';
import { useAppSelector } from '../Redux/Hooks';

export const RequireAuth = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    useToast.error('You need to be logged in to do that!');
    return <Navigate to='/sign-in' state={{ from: location }} />;
  }

  return <Outlet />;
};
