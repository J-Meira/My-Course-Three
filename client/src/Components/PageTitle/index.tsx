import { Divider, Typography } from '@mui/material';
import { IPageTitleProps } from '../../@Types';

export const PageTitle = ({ title, subTitle }: IPageTitleProps) => (
  <>
    <Typography variant='h2' sx={{ fontSize: '2.5rem', fontWeight: 600 }}>
      {title}
    </Typography>
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
