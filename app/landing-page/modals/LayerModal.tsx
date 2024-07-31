import React from 'react'
import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const LayerModal = ({ buttons, selectedButtons, setSelectedButtons }: any) => {

  const toggleLayer = (id: string) => {
    setSelectedButtons((prevSelectedButtons: [string]) => {
      if (prevSelectedButtons.includes(id)) {
        return prevSelectedButtons.filter((layerId: string) => layerId !== id);
      } else {
        return [...prevSelectedButtons, id];
      }
    });
  };

  return (
    <Box sx={{ backgroundColor: "#fff", borderRadius: "8px", display: "flex", flexDirection: "column", padding: "15px 15px 11px 15px", border: "2px solid #7B61FF" }}>
      <Box>
        <Typography sx={{ fontSize: "16px", fontFamily: "Roboto, sans-serif", fontWeight: "400", lineHeight: "24px" }}>
          Map layers
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "15px", margin: "15px 0" }}>
        {buttons.map((item: any) => {
          const isSelected = selectedButtons.includes(item.id);
          return (
            <Box key={item.id} sx={{ display: "flex", flexDirection: "column", gap: "3px" }} onClick={() => toggleLayer(item.id)}>
              <Box sx={{ width: "57px", height: "57px", borderRadius: "6px", border: isSelected ? '2px solid #7B61FF' : '' }} >
                <img src={item.image} style={{ width: "100%", height: "100%", borderRadius: "6px" }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "11px", fontFamily: "Roboto, sans-serif", fontWeight: "400", lineHeight: "16.5px", color: isSelected ? '#7B61FF' : '' }}>
                  {item.label}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>

      <Box sx={{ display: "flex", gap: "11px" }}>
        <Typography sx={{ fontSize: "11px", fontFamily: "Roboto, sans-serif", fontWeight: "700", lineHeight: "11px" }}>
          Present <InfoIcon style={{ fontSize: '9px' }} />
        </Typography>
        <Typography sx={{ fontSize: "11px", fontFamily: "Roboto, sans-serif", fontWeight: "700", lineHeight: "11px" }}>
          Undetected <InfoIcon style={{ fontSize: '9px' }} />
        </Typography>
      </Box>
    </Box>
  )
}

export default LayerModal
