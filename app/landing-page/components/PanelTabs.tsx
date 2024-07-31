import * as React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const PanelTabs: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="tabComponent">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="custom tabs example"
        sx={{
          '& .MuiTab-root': {
            fontWeight: 400,
            textTransform: 'none',
            fontSize: 14,
            color: "#5E5E5E",
            lineHeight: '21px',
          },
          '& .Mui-selected': {
            color: '#7B61FF !important',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#7B61FF',
          },
        }}
      >
        <Tab label="Summary" />
        <Tab label="Backyard Cottage" />
        <Tab label="In Home Apt" />
      </Tabs>

      <TabPanel value={value} index={0}>

      </TabPanel>
      <TabPanel value={value} index={1}>

      </TabPanel>
      <TabPanel value={value} index={2}>

      </TabPanel>
    </Box>
  );
};

export default PanelTabs;