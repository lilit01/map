import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Pagination, Box, Card, CardMedia, IconButton, Typography, Button } from '@mui/material';

export default function SelectedPlanModal({ setSelectedFloorPlan, selectedFloorPlan, onSelect, isSmallScreen }: any) {

  const images = [
    { id: '1', image: `${selectedFloorPlan.image}`, dimensions: `${selectedFloorPlan.dimensions}` },
    { id: '2', image: '/assets/images/bed/bed11.jpg', dimensions: '480x460' },
    { id: '3', image: '/assets/images/bed/bed10.jpg', dimensions: '420x420' },
    { id: '4', image: '/assets/images/bed/bed9.jpg', dimensions: '420x240' },
    { id: '5', image: '/assets/images/bed/bed8.jpg', dimensions: '600x165.5' },
    { id: '6', image: '/assets/images/bed/bed7.jpg', dimensions: '165.5x391.5, 384.5x169.5' },
    { id: '7', image: '/assets/images/bed/bed6.jpg', dimensions: '420x372' },
    { id: '8', image: '/assets/images/bed/bed5.jpg', dimensions: '240x360' },
    { id: '9', image: '/assets/images/bed/bed4.jpg', dimensions: '456x166' },
    { id: '10', image: '/assets/images/bed/bed3.jpg', dimensions: '456x166' },
    { id: '11', image: '/assets/images/bed/bed2.jpg', dimensions: '369x218' },
    { id: '12', image: '/assets/images/bed/bed1.jpg', dimensions: '240x216' },
  ];

  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedImage, setSelectedImage] = React.useState(images[0]);

  const handlePageChange = (event: any, value: any) => {
    setCurrentPage(value);
    setSelectedImage(images[value - 1]);
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(selectedImage);
    }
    setSelectedFloorPlan(null);
  };


  const currentImage = images[currentPage - 1];
  const { image, dimensions } = currentImage || {};

  return (
    <Box
      sx={{
        width: isSmallScreen ? "393px" : "761px", height: isSmallScreen ? "none" : "629px", backgroundColor: "#fff", right: 'unset', bottom: 'unset',
        left: '50%', top: isSmallScreen ? "100%" : '50%', transform: "translate(-50%, -50%)", zIndex: "9999",
        position: "absolute", border: "3px solid #7B61FF", borderRadius: "10px", padding: "22px 28px 21px 52px",
        display: 'flex', flexDirection: "column", justifyContent: "space-between"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", zIndex: "9999" }}>
        <Box>
          <Typography sx={{ fontSize: "28px", fontFamily: "Poppins, sans-serif", fontWeight: "400", lineHeight: "42px" }}>
            The California
          </Typography>
          <Typography sx={{ fontSize: "15px", fontFamily: "Poppins, sans-serif", fontWeight: "400", lineHeight: "22.5px" }}>
            Studio 1 bed, 1 kitchen, 1 bath
          </Typography>
        </Box>
        <IconButton onClick={() => setSelectedFloorPlan(null)} style={{ padding: "0" }}>
          <CloseIcon style={{ fontSize: '33px' }} />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Card sx={{ border: "none", height: isSmallScreen ? 'none' : "400px", width: isSmallScreen ? "none" : '730px', position: "relative" }}>
          <CardMedia
            component="img"
            image={image}
            alt={`Image ${currentPage}`}
            style={{ width: '100%', height: '100%' }}
          />
        </Card>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around", zIndex: "9999", flexDirection: isSmallScreen ? "column" : "row", gap: isSmallScreen ? "15px" : "none" }}>
        <Pagination
          count={images.length}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
        <Button
          variant="contained"
          disableElevation
          sx={{
            background: '#7b61ff',
            color: '#fff',
            padding: "10px 39px",
            borderRadius: "0"
          }}
          onClick={handleSelect}
        >
          Select
        </Button>
      </Box>
    </Box>
  );
}