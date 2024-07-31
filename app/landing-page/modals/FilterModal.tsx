import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, ToggleButton, ToggleButtonGroup, Typography, Slider } from '@mui/material';

const FilterModal = () => {
  const [bedroom, setBedroom] = useState('Any');
  const [minSquareFeet, setMinSquareFeet] = useState('');
  const [maxSquareFeet, setMaxSquareFeet] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(['Studio']);

  const handleOptionChange = (event: any, newOptions: any) => {
    // Ensure 'Studio' is always selected
    if (!newOptions.includes('Studio')) {
      newOptions.push('Studio');
    }
    setSelectedOptions(newOptions);

  };



  const handleMinSquareFeetChange = (event: any) => {
    setMinSquareFeet(event.target.value);
  };

  const handleMaxSquareFeetChange = (event: any) => {
    setMaxSquareFeet(event.target.value);
  };

  const handleReset = () => {
    setBedroom('Any');
    setMinSquareFeet('');
    setMaxSquareFeet('');
  };

  return (
    <Box
      sx={{
        padding: "16px",
        border: '2px solid #7B61FF',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        width: "338px",
        backgroundColor: "white"
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "4px" }}>Beds</Typography>
      <ToggleButtonGroup
        value={selectedOptions}
        onChange={handleOptionChange}
        aria-label="bedroom selection"
        sx={{
          mb: 2,
          height: "39px",
        }}
        exclusive={false}
      >
        <ToggleButton value="Any">Any</ToggleButton>
        <ToggleButton value="Studio" sx={{
          '&.Mui-selected': {
            backgroundColor: 'rgba(123, 97, 255, 0.35)',
            color: "rgba(123, 97, 255, 1)",
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(123, 97, 255, 0.35)',
          },
        }}>Studio</ToggleButton>
        <ToggleButton value="1" sx={{
          '&.Mui-selected': {
            backgroundColor: 'rgba(123, 97, 255, 0.35)',
            color: "rgba(123, 97, 255, 1)"
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(123, 97, 255, 0.35)',
          },
        }} >1</ToggleButton>
        <ToggleButton value="2" sx={{
          '&.Mui-selected': {
            backgroundColor: 'rgba(123, 97, 255, 0.35)',
            color: "rgba(123, 97, 255, 1)"
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(123, 97, 255, 0.35)'
          },
        }}>2</ToggleButton>
        <ToggleButton value="3" sx={{
          '&.Mui-selected': {
            backgroundColor: 'rgba(123, 97, 255, 0.35)',
            color: "rgba(123, 97, 255, 1)"
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(123, 97, 255, 0.35)',
          },
        }}>3</ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ display: 'flex', justifyContent: "center", gap: "20px", marginBottom: "39px" }}>
        <Box >
          <Typography variant="subtitle1" sx={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px', marginBottom: "4px" }}>Square feet</Typography>
          <Select
            value={minSquareFeet}
            onChange={handleMinSquareFeetChange}
            displayEmpty
            sx={{ minWidth: 140, height: "39px" }}
          >
            <MenuItem value="">No min</MenuItem>
            <MenuItem value={500}>500</MenuItem>
            <MenuItem value={1000}>1000</MenuItem>
            <MenuItem value={1500}>1500</MenuItem>
            <MenuItem value={2000}>2000</MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px', marginBottom: "4px" }}>Square feet</Typography>
          <Select
            value={maxSquareFeet}
            onChange={handleMaxSquareFeetChange}
            displayEmpty
            sx={{ minWidth: 140, height: "39px" }}
          >
            <MenuItem value="">No max</MenuItem>
            <MenuItem value={500}>500</MenuItem>
            <MenuItem value={1000}>1000</MenuItem>
            <MenuItem value={1500}>1500</MenuItem>
            <MenuItem value={2000}>2000</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: "flex-end", gap: '8px' }}>
        <Button variant="outlined" onClick={handleReset} sx={{ padding: "8px 29px" }}>Reset</Button>
        <Button
          variant="contained"
          disableElevation
          sx={{
            background: '#7b61ff',
            color: '#fff',
            padding: "8px 29px",
            borderRadius: "5px"
          }}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
};

export default FilterModal;

