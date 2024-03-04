import { ReactNode } from 'react';

export interface ICheckBoxButtonsProps {
  label: ReactNode;
  options: string[];
  checkedOptions?: string[];
  onChange: (items: string[]) => void;
}
