import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useToast } from '../Utils';
import { useAppSelector } from '../Redux/Hooks';

interface Props {
  roles?: string[];
}

export const RequireAuth = ({ roles }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    useToast.error('You need to be logged in to do that!');
    return <Navigate to='/sign-in' state={{ from: location }} />;
  }

  if (roles && !roles?.some((r) => user.roles?.includes(r))) {
    useToast.error('Not authorised to access this area');
    return <Navigate to='/catalog' />;
  }

  return <Outlet />;
};
