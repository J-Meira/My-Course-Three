import { Box, Button, Divider, Typography } from '@mui/material';
import { IPageTitleProps } from '../../@Types';

export const PageTitle = ({ title, subTitle, backAction }: IPageTitleProps) => (
  <>
    <Box display='flex' justifyContent='space-between'>
      <Typography variant='h2' sx={{ fontSize: '2.5rem', fontWeight: 600 }}>
        {title}
      </Typography>
      {backAction && (
        <Button
          onClick={backAction}
          sx={{ m: 2 }}
          size='large'
          variant='contained'
        >
          Back to orders
        </Button>
      )}
    </Box>
    {subTitle && (
      <Typography
        variant='h4'
        sx={{ fontSize: '1.5rem', fontWeight: 500 }}
        color='secondary'
      >
        {subTitle}
      </Typography>
    )}
    <Divider sx={{ mb: 2 }} />
  </>
);
