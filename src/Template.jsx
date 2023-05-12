import './App.css';
import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        style={{height: "90%", display: "flex"}}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography sx={{display: "flex"}}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

export default function Template() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="TEMPLATE 1" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Stack
        spacing={3}
        >
    
        <Typography sx={{fontWeight: "700", fontSize: "1.5rem"}}>What's this campaign about?</Typography>
        <TextField
          multiline
          sx={{width: "100%"}}
          inputProps={{
            style: {
              height: "60vh",
            },
          }}
          defaultValue="Write a post about me chilling in the sunset thinking about good times"
        />
        <Button variant="contained" color="primary" sx={{borderRadius: "100px", width: "100%"}} size="large">
            CREATE!
        </Button>
    </Stack>
      </TabPanel>
    </Box>
  )
}
