import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { IRadioButtonGroupProps } from '../../@Types';

export const RadioButtonGroup = ({
  options,
  onChange,
  selectedValue,
}: IRadioButtonGroupProps) => {
  return (
    <FormControl component='fieldset'>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            value={value}
            control={<Radio />}
            label={label}
            key={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
