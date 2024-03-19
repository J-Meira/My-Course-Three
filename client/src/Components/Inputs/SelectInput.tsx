import { useController } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
} from '@mui/material';

import { ISelectInputProps } from '../../@Types';

export const SelectInput = (props: ISelectInputProps) => {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });
  const { options, label, grid, noGrid } = props;

  const getGrid = () => {
    return {
      xs: 12,
      sm: 6,
      ...grid,
    };
  };

  const render = (() => (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{label}</InputLabel>
      <Select value={field.value} label={props.label} onChange={field.onChange}>
        {options.map((item, index) => (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  ))();

  return noGrid ? (
    render
  ) : (
    <Grid item {...getGrid()}>
      {render}
    </Grid>
  );
};
