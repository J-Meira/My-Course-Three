import { useController } from 'react-hook-form';
import { ITextInputProps } from '../../@Types';
import { Grid, GridProps, TextField } from '@mui/material';

export const TextInput = (props: ITextInputProps) => {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });
  const { multiline, rows, type, grid, noGrid } = props;

  const getGrid = (g?: GridProps) => {
    return {
      xs: 12,
      sm: 6,
      ...g,
    };
  };

  const render = (() => (
    <TextField
      {...props}
      {...field}
      multiline={multiline}
      rows={rows}
      type={type}
      fullWidth
      variant='outlined'
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  ))();

  return noGrid ? (
    render
  ) : (
    <Grid item {...getGrid(grid)}>
      {render}
    </Grid>
  );
};
