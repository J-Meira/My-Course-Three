import { GridProps } from '@mui/material';
import { UseControllerProps } from 'react-hook-form';

export interface IDropZoneInputProps extends UseControllerProps {
  grid?: GridProps;
  noGrid?: boolean;
}
