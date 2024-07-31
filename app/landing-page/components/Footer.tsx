import * as React from 'react';
import { Box, TextField, Typography, InputAdornment, Button } from '@mui/material';

export default function Footer() {
  return (

    <Box className='gradient' sx={{ display: "flex", justifyContent: "center", alignItems: "end", gap: "70px", marginTop: "60px", flexDirection: { xs: 'column', sm: 'row' } }}>
      <Box sx={{ width: "450px", display: "flex", flexDirection: "column", alignItems: "end", gap: "50px" }}>
        <Box>
          <Typography sx={{ fontWeight: '600', marginBottom: '16px', fontSize: { xs: "32px", sm: "67px" }, fontFamily: "Roboto, sans-serif", lineHeight: { xs: "40px", sm: "77.05px" }, textWrap: "nowrap" }}>
            Connect with <br /> - an Expert
          </Typography>
        </Box>
        <Box sx={{ width: "350px", paddingLeft: "10px" }}>
          <Typography sx={{ fontSize: { xs: "14px", sm: "18px" }, fontFamily: "Roboto, sans-serif", fontWeight: "400", color: "#555555", paddingBottom: "4px" }}>
            We would love to introduce you to top builders from our vetted network to explore next steps of your project.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ position: "relative" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="youremail123@gmail.com"
          type="email"
          InputProps={{
            style: {
              borderRadius: "0",
              border: "none",
              backgroundColor: "#ffffff",
              display: "flex", gap: "25px"
            },
            startAdornment: (
              <Box sx={{ width: "54px", height: "54px", backgroundColor: "#f8f8f8", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src="/assets/images/icons/email-icon.png" alt="Custom Icon" style={{ width: "26px", height: "26px" }} />
              </Box>

            ),
          }}
          sx={{
            '& ::placeholder': { fontSize: { xs: '14px', sm: '18px' } },
            padding: '0 8px',
            width: { xs: "100%", sm: "652px" },
            height: "80px",
          }
          }
        />
        <Button
          variant="contained"
          disableElevation
          sx={{
            background: '#7b61ff',
            color: '#fff',
            padding: '30px 49px 30px 49px',
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: "600",
            lineHeight: "24px",
            borderRadius: "0",
            position: "absolute",
            right: "8px",
            top: "48px",
            border: 'none !important',
            outline: "none",
            textTransform: "uppercase"
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Box >

  );
}
