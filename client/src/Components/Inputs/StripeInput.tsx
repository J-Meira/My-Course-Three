/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputBaseComponentProps } from '@mui/material';
import { forwardRef, useRef, useImperativeHandle } from 'react';

export const StripeInput = forwardRef(function StripeInput(
  { component: Component, ...props }: InputBaseComponentProps,
  ref: React.Ref<unknown>,
) {
  const elementRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    focus: () => elementRef.current.focus,
  }));

  return (
    <Component
      onReady={(element: any) => (elementRef.current = element)}
      {...props}
    />
  );
});
