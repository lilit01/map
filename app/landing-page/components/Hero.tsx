import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AddressParams } from '../LandingPage';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';

export interface ChildComponentProps {
  addressParams: AddressParams;
}
const Hero: React.FC<ChildComponentProps> = ({ addressParams }) => {

  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        backgroundColor: "white"
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: "13px",
          alignItems: 'center',
          paddingTop: '60px',
          paddingBottom: '60px'
        }}
        id='heroContainer'
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            component="span"
            sx={{ textAlign: "center", fontWeight: "400", fontSize: "16px", lineHeight: "24px", letterSpacing: "0.15px", fontFamily: "Roboto, sans-serif" }}
          >
            Home <ChevronRightIcon sx={{ fontSize: 20, color: "text.secondary", marginLeft: "13px", marginRight: "13px" }} />
            <Typography
              component="span"
              sx={{ textAlign: "center", fontWeight: "400", fontSize: "16px", lineHeight: "24px", letterSpacing: "0.15px", fontFamily: "Roboto, sans-serif" }}
            >
              ADU Planner
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            sx={{
              textAlign: "center", fontWeight: "600", fontSize: "34px", lineHeight: "41.99px", letterSpacing: "0.25px", fontFamily: "Roboto, sans-serif"
            }}
          >
            {addressParams.addr_num}  {addressParams.addr_street} - {addressParams.addr_city}, MA {addressParams.addr_zip}
          </Typography>
        </Stack>
      </Container>
      <Box id="heroMobile" sx={{ display: "none", backgroundColor: "#fff", borderRadius: "25px", position: "absolute", top: '32px', zIndex: "99999", padding: "7px 0" }}>
        <ArrowBackIosIcon style={{ width: "17px", height: "28px" }} />
        <Typography
          textAlign="center"
          sx={{
            fontWeight: "400", fontSize: "20px", lineHeight: "30px", letterSpacing: "0.15px", fontFamily: "Roboto, sans-serif"
          }}
        >
          {addressParams.addr_num}  {addressParams.addr_street} - {addressParams.addr_city}, MA {addressParams.addr_zip}
        </Typography>
        <MenuIcon style={{ width: "25px", height: "17px" }} />
      </Box>
    </Box>
  );
}

export default Hero;