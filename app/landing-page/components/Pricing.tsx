import * as React from 'react';
import { Box, Container, Skeleton } from '@mui/material';
import { AddressParams } from '../LandingPage';
import PanelTabs from './PanelTabs';


export interface ChildComponentProps {
  addressParams: AddressParams;
  isSmallScreen: boolean
}

const Pricing: React.FC<ChildComponentProps> = ({ addressParams, isSmallScreen }) => {
  const [streetImg, setStreetImg] = React.useState<string | null>(null)

  React.useEffect(() => {
    const address = `${addressParams.addr_num} ${addressParams.addr_street} ${addressParams.addr_city} MA`;
    const imageUrl = `https://maps.googleapis.com/maps/api/streetview?parameters&size=1000x1920&fov=50&location=${encodeURIComponent(address)}&key=AIzaSyC-kawhDLXzSeMsHzYaC69gInG4fAElG98`;
    setStreetImg(imageUrl)

  }, [addressParams]);

  return (
    <Container
      id="pricing"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: isSmallScreen ? '0' : "60px",
        paddingLeft: { xs: 0 },
        paddingRight: { xs: 0 }
      }}
    >{!streetImg ?
      (<Skeleton variant="rectangular" width={601} height={343} />)
      :
      (<Box sx={{ width: { xs: "100%", sm: "601px" }, height: "343px" }}>
        <img
          src={streetImg}
          alt="Skeleton"
          style={{ width: "100%", height: "100%", objectFit: 'cover' }}
        />
      </Box>)}

    </Container>
  );
}

export default Pricing