import { IconButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export interface ILoadingIconButtonProps {
  icon: ReactNode;
  isLoading: boolean;
  color: IconButtonProps['color'];
  onClick: IconButtonProps['onClick'];
}
