import './App.css';
import React, {useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { single, useData } from "./api/openAiApi"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';





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
  const [textInput, setTextInput] = useState("Write me an instagram post about me in the beach");
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };
  const queryClient = useQueryClient()


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const { mutate, isLoading } = useMutation(single, {
      onSuccess: data => {
         console.log(data);
         queryClient.setQueryData(["responseAi"], data)
   },
     onError: () => {
          alert("there was an error")
   },
     onSettled: () => {
        queryClient.invalidateQueries(["responseAi"])
   }
   });
   

  return (
    <Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="TEMPLATE 1" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{justifyContent: "center", display: "flex"}}>
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
          onChange= {handleTextInputChange}
          value={textInput}
        />
        <Button variant="contained" color="primary" sx={{borderRadius: "100px", width: "100%"}} size="large" onClick={() => mutate(textInput)}>
            CREATE! 
        </Button>
    </Stack>
      </TabPanel>
    </Box>
  )
}
