import { useController } from 'react-hook-form';
import { ICheckInputProps } from '../../@Types';
import { FormControlLabel, Checkbox, Grid } from '@mui/material';

export const CheckInput = (props: ICheckInputProps) => {
  const { field } = useController({ ...props, defaultValue: false });
  const { grid, noGrid } = props;

  const getGrid = () => {
    return {
      xs: 12,
      sm: 6,
      ...grid,
    };
  };

  const render = (() => (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          checked={field.value}
          color='secondary'
          disabled={props.disabled}
        />
      }
      label={props.label}
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
