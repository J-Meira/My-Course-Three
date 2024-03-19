import { GridProps } from '@mui/material';
import { ReactNode } from 'react';
import { UseControllerProps } from 'react-hook-form';

export interface ISelectInputProps extends UseControllerProps {
  label: ReactNode;
  options: string[];
  grid?: GridProps;
  noGrid?: boolean;
}
