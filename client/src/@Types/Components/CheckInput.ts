import { GridProps } from '@mui/material';
import { ReactNode } from 'react';
import { UseControllerProps } from 'react-hook-form';

export interface ICheckInputProps extends UseControllerProps {
  label: ReactNode;
  grid?: GridProps;
  noGrid?: boolean;
  disabled?: boolean;
}
