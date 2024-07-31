import * as React from 'react';
import { Box, Grid, Typography, Container, Skeleton } from '@mui/material';


export interface PropertyInfo {
  property_id: number;
  city_id: number;
  sbl: string;
  use_code: string;
  zoning: string;
  lot_size: number;
  gross_building_area: number;
  year_built: number;
  style: string;
  owner: string;
  addr_num: string;
  addr_street: string;
  addr_apt: string;
  zip: string;
  addr_city: string;
}

export interface ChildComponentProps {
  propertyInfo: PropertyInfo | null;
  isSmallScreen: boolean
}

const Summary: React.FC<ChildComponentProps> = ({ propertyInfo, isSmallScreen }) => {


  const summaryProperty = [
    { label: 'Property type', value: 'Single Family' },
    { label: 'Property style', value: propertyInfo?.style },
    { label: 'Zone', value: propertyInfo?.zoning },
    { label: 'Lot Size', value: `${propertyInfo?.lot_size} sq ft` },
    { label: 'Gross Building Area', value: `${propertyInfo?.gross_building_area} sq ft` },
    { label: 'Living Area', value: '2172 sq ft' },
    { label: 'Year Built', value: propertyInfo?.year_built },
    { label: 'Basement', value: '612 sq ft', subValue: "(unfinished)" },
    { label: 'Garage', value: 'Attached 180', subValue: "sq ft" },
    { label: 'Other structures', value: 'Shed 48 ', subValue: "sq ft" },
  ];


  return (
    <Container
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '60px',
        padding: "20px",
        border: "1px solid #00000033",
        maxWidth: "1216px",
        borderRadius: "6px",
        boxShadow: 1
      }}
      id='summaryCont'
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          boxSizing: 'border-box',
        }}
      >
        {!isSmallScreen &&
          <Typography variant="h6" sx={{
            fontStyle: "normal",
            fontSize: "24px", fontWeight: "600", fontFamily: "Roboto, sans-serif", lineHeight: "29.64px", letterSpacing: "0.25px", marginBottom: "25px"
          }}>
            Property summary
          </Typography>}

        {!propertyInfo ? (<Skeleton variant="rectangular" width={1150} height={123} />) : (
          <Grid container sx={{ rowGap: "30px" }}>
            {summaryProperty.map((item, index) => (
              <Grid item xs={6} sm={6} md={2.4} key={index} sx={{ display: 'flex', alignItems: 'start' }}>
                <img src="/assets/images/icons/search-icon.png" alt="Custom Icon" style={{ marginRight: '12px', width: '40px', height: '40px' }} />
                <Box sx={{ width: "133px" }} >
                  <Typography sx={{ fontSize: "12px", fontWeight: "400", fontFamily: "Roboto, sans-serif", lineHeight: "14.82px", letterSpacing: "0.25px", color: "#00000099" }}>
                    {item.label}
                  </Typography>
                  <Typography component={'span'} sx={{ fontSize: "20px", fontWeight: "600", fontFamily: "Roboto, sans-serif", lineHeight: "24.7px", letterSpacing: "0.25px" }}>
                    {item.value}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: "500", fontFamily: "Roboto, sans-serif", lineHeight: "14.82px", letterSpacing: "0.25px", display: "inline-block" }}>
                    {item.subValue}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
        {!isSmallScreen && <Box sx={{ marginTop: "25px" }}>
          <Typography variant="h6" sx={{ fontSize: "24px", fontWeight: "600", fontFamily: "Inter, sans-serif", lineHeight: "29.64px", letterSpacing: "0.25px", marginBottom: "16px" }}>
            Description
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: "16px", fontWeight: "400", fontFamily: "Roboto, sans-serif", lineHeight: "24px", letterSpacing: "0.15px", color: "#00000099" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={2} sx={{ fontSize: "16px", fontWeight: "400", fontFamily: "Roboto, sans-serif", lineHeight: "24px", letterSpacing: "0.15px", color: "#00000099" }}>
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Box>}

      </Box>
    </Container>
  );
}

export default Summary