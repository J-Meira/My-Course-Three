import { CircularProgress, IconButton } from '@mui/material';
import { ILoadingIconButtonProps } from '../../@Types';

export const LoadingIconButton = ({
  color,
  icon,
  isLoading,
  onClick,
}: ILoadingIconButtonProps) => {
  return (
    <IconButton onClick={onClick} color={color}>
      {isLoading ? <CircularProgress size='1.5rem' /> : icon}
    </IconButton>
  );
};
