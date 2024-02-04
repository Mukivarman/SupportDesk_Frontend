import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loadingicon() {
  return (
    <Box sx={{height:'60px',width:'60px'}}>
      <CircularProgress />
    </Box>
  );
}