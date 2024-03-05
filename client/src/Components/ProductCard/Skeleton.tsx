import {
  Grid,
  Card,
  CardHeader,
  Skeleton as MuiSkeleton,
  CardContent,
  CardActions,
} from '@mui/material';

export const ProductCardSkeleton = () => (
  <Grid item xs={12} md={6} lg={4}>
    <Card>
      <CardHeader
        title={
          <MuiSkeleton
            animation='wave'
            height={10}
            width='100%'
            style={{ marginBottom: 6 }}
          />
        }
      />
      <MuiSkeleton
        sx={{ height: 190 }}
        animation='wave'
        variant='rectangular'
      />
      <CardContent>
        <>
          <MuiSkeleton
            animation='wave'
            height={10}
            style={{ marginBottom: 6 }}
          />
          <MuiSkeleton animation='wave' height={10} width='80%' />
        </>
      </CardContent>
      <CardActions>
        <>
          <MuiSkeleton animation='wave' height={10} width='40%' />
          <MuiSkeleton animation='wave' height={10} width='20%' />
        </>
      </CardActions>
    </Card>
  </Grid>
);
