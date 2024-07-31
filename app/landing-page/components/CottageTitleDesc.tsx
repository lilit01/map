import * as React from 'react';
import { Box, Typography, Container } from '@mui/material';



export default function CottageTitleDesc({ title, desc1, desc2, isSmallScreen }: any) {
  return (
    <Container
      sx={{
        marginTop: "60px",
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '60px'
      }}
    >
      <Box sx={{ position: "relative", textAlign: "center" }}>
        {!isSmallScreen &&
          <Typography variant="h6" sx={{ fontSize: "34px", fontWeight: "600", fontFamily: "Roboto, sans-serif", lineHeight: "41.99px", letterSpacing: "0.25px", marginBottom: "20px" }}>
            {title}
          </Typography>}

        <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400", fontFamily: "Roboto, sans-serif", lineHeight: "24px", letterSpacing: "0.15px" }}>
          {desc1}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400", fontFamily: "Roboto, sans-serif", lineHeight: "24px", letterSpacing: "0.15px" }}>
          {desc2}
        </Typography>
      </Box>
    </Container>
  );
}