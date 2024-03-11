import { GridProps } from '@mui/material';
import { ReactNode } from 'react';
import { UseControllerProps } from 'react-hook-form';

export interface ITextInputProps extends UseControllerProps {
  label: ReactNode;
  multiline?: boolean;
  rows?: number;
  type?: string;
  grid?: GridProps;
  noGrid?: boolean;
  autoComplete?: string;
}
