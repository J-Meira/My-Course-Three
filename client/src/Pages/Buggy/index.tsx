import { useState } from 'react';
import { PageTitle } from '../../Components';

import { buggyServices } from '../../Services';
import {
  ButtonGroup,
  Button,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export const Buggy = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationError = () => {
    buggyServices
      .getValidationError()
      .then(() => console.log('should not see this!'))
      .catch((error) => setValidationErrors(error));
  };
  return (
    <>
      <PageTitle title='Buggy' subTitle='Errors for testing purposes' />
      <ButtonGroup fullWidth>
        <Button
          onClick={() =>
            buggyServices.get500Error().catch((error) => console.log(error))
          }
          variant={'contained'}
        >
          Test 500 error
        </Button>
        <Button
          onClick={() =>
            buggyServices.get404Error().catch((error) => console.log(error))
          }
          variant={'contained'}
        >
          Test 404 error
        </Button>
        <Button
          onClick={() =>
            buggyServices.get400Error().catch((error) => console.log(error))
          }
          variant={'contained'}
        >
          Test 400 error
        </Button>
        <Button onClick={getValidationError} variant={'contained'}>
          Test 400 validation error
        </Button>
        <Button
          onClick={() =>
            buggyServices.get401Error().catch((error) => console.log(error))
          }
          variant={'contained'}
        >
          Test 401 error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity='error'>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </>
  );
};
