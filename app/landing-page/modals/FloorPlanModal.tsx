'use client'
import React from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';


const floorPlans = [{
  id: 1,
  image: '/assets/images/bed/bed5.jpg',
  sqft: '1200',
  name: "111111",
  bedrooms: '03',
  bathrooms: '03',
  kitchen: '01',
  dimensions: '240x360'
},
{
  id: 2,
  image: '/assets/images/bed/bed2.jpg',
  sqft: '1200',
  name: "222222",
  bedrooms: '03',
  bathrooms: '03',
  kitchen: '01',
  dimensions: '369x218'
},
{
  id: 3,
  image: '/assets/images/bed/bed3.jpg',
  sqft: '1200',
  name: "33333",
  bedrooms: '03',
  bathrooms: '03',
  kitchen: '01',
  dimensions: '456x166',
},
{
  id: 4,
  image: '/assets/images/bed/bed4.jpg',
  sqft: '1200',
  name: "44444",
  bedrooms: '03',
  bathrooms: '03',
  kitchen: '01',
  dimensions: '456x166',
}];

const FloorPlanModal = ({ setSelectedFloorPlan, selectedFloorPlan, isSmallScreen }: any) => {


  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ width: isSmallScreen ? '100%' : 202, bgcolor: 'white', borderRadius: "12px", position: isSmallScreen ? "" : "absolute", right: "29px", padding: "11px 14px 20px 14px ", boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.30)" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" height={"20px"}>
          <Typography sx={{ fontSize: "13px", fontWeight: "400", lineHeight: "19.5px", fontFamily: "Poppins, sans-serif" }}>Select a floor plan</Typography>
        </Box>
        <Box display="flex" sx={{ flexDirection: isSmallScreen ? "row" : "column", overflowX: isSmallScreen ? "scroll" : "", gap: isSmallScreen ? "20px" : "", marginBottom: isSmallScreen ? "10px" : "" }}>
          {floorPlans.map((plan: any) => (
            <Box key={plan.id}  >
              <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: isSmallScreen ? "174px" : "100%" }} onClick={() => setSelectedFloorPlan(plan)} >
                <img src={plan.image} alt={`Floor Plan ${plan.id}`} style={{ width: '174px', borderRadius: "4px", objectFit: "cover", margin: "9px 0", height: "101px", border: selectedFloorPlan?.id === plan?.id ? '3px solid #7B61FF' : '' }} />
                <Grid container >
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ fontSize: "10px", fontFamily: "Poppins, sans-serif", opacity: "0.8", fontWeight: "400", lineHeight: "15px" }}>Sq ft: {plan.sqft}</Typography>
                    <Typography variant="body2" sx={{ fontSize: "10px", fontFamily: "Poppins, sans-serif", opacity: "0.8", fontWeight: "400", lineHeight: "15px" }}>Bedrooms: {plan.bedrooms}</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign={'end'}>
                    <Typography variant="body2" sx={{ fontSize: "10px", fontFamily: "Poppins, sans-serif", opacity: "0.8", fontWeight: "400", lineHeight: "15px" }}>Bathrooms: {plan.bathrooms}</Typography>
                    <Typography variant="body2" sx={{ fontSize: "10px", fontFamily: "Poppins, sans-serif", opacity: "0.8", fontWeight: "400", lineHeight: "15px" }}>Kitchen: {plan.kitchen}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box >
  );
};

export default FloorPlanModal;