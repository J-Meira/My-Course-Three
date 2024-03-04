import { ChangeEvent } from 'react';

export interface IRadioButtonGroupProps {
  options: IOptionList[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
}

export interface IOptionList {
  value: string;
  label: string;
}
