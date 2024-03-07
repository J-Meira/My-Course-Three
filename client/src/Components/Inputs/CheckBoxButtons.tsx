import { useState } from 'react';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
} from '@mui/material';
import { ICheckBoxButtonsProps } from '../../@Types';

export const CheckBoxButtons = ({
  label,
  options,
  checkedOptions,
  onChange,
}: ICheckBoxButtonsProps) => {
  const [checkedItems, setCheckedItems] = useState(checkedOptions || []);

  const handleChecked = (value: string) => {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newChecked: string[] = [];
    if (currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter((i) => i !== value);
    setCheckedItems(newChecked);
    onChange(newChecked);
  };

  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      {options.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={checkedItems.indexOf(item) !== -1}
              onClick={() => handleChecked(item)}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );
};
