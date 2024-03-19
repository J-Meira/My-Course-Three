import { useController } from 'react-hook-form';
import { FormControl, FormHelperText, Grid, Typography } from '@mui/material';
import { MdUploadFile } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';

import { IDropZoneInputProps } from '../../@Types';
import { useCallback } from 'react';

export const DropZoneInput = (props: IDropZoneInputProps) => {
  const { fieldState, field } = useController({ ...props, defaultValue: null });
  const { grid, noGrid } = props;

  const dzStyles = {
    display: 'flex',
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    alignItems: 'center',
    height: 200,
    width: 500,
  };

  const dzActive = {
    borderColor: 'green',
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles[0] = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      field.onChange(acceptedFiles[0]);
    },
    [field],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const getGrid = () => {
    return {
      xs: 12,
      sm: 6,
      ...grid,
    };
  };

  const render = (() => (
    <div {...getRootProps()}>
      <FormControl
        style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
        error={!!fieldState.error}
      >
        <input {...getInputProps()} />
        <MdUploadFile size={100} />
        <Typography variant='h4'>Drop image here</Typography>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  ))();

  return noGrid ? (
    render
  ) : (
    <Grid item {...getGrid()}>
      {render}
    </Grid>
  );
};
