import { useController } from 'react-hook-form';
import { ITextInputProps } from '../../@Types';
import { Grid, TextField } from '@mui/material';

export const TextInput = (props: ITextInputProps) => {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });
  const { multiline, rows, type, grid, noGrid } = props;

  const getGrid = () => {
    return {
      xs: 12,
      sm: 6,
      ...grid,
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
    <Grid item {...getGrid()}>
      {render}
    </Grid>
  );
};
