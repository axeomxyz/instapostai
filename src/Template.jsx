import './App.css';
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { single, campaign } from "./api/openAiApi"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';






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
  const [postNumber, setPostNumber] = React.useState(2);
  let location = useLocation();
  let singlePost = location.pathname == "/"
  const [textInput, setTextInput] = useState("");
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };
  const queryClient = useQueryClient()
    useEffect(() => {
      if (singlePost) {
        setTextInput("Me in the beach")
      } else {
        setTextInput("A company that sells wood")
      }
    }, [singlePost])

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const { mutate, isLoading } = useMutation(singlePost ? single : campaign, {
      onSuccess: data => {
        console.log(data);
        if (singlePost) {
          queryClient.invalidateQueries(["responseAi"])
          queryClient.setQueryData(["responseAi"], data)
        } else {
          queryClient.invalidateQueries(["responseAiCampaign"])
          queryClient.setQueryData(["responseAiCampaign"], data)
        }
    },
    onError: () => {
            alert("there was an error")
    },
    onSettled: () => {
      if (singlePost) {
        queryClient.invalidateQueries(["responseAi"])
      } else {
        queryClient.invalidateQueries(["responseAiCampaign"])
      }
      
    }
    })
      

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
              height: singlePost ? "50vh" : "40vh",
            },
          }}
          onChange= {handleTextInputChange}
          value={textInput}
        />
        {!singlePost && <TextField
          label="Number of posts:"
          id="outlined-start-adornment"
          sx={{width: "100%"}}
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">post</InputAdornment>
          }}
          onChange= {(e) => {
            var value = parseInt(e.target.value);
  
            if (value > 10) value = 10;
            if (value < 2) value = 2;
  
            setPostNumber(value);
          }}
          value={postNumber}
        />}
        <Button variant="contained" color="primary" sx={{borderRadius: "100px", width: "100%"}} size="large" onClick={() => mutate([textInput, postNumber])}>
            CREATE! 
        </Button>
    </Stack>
      </TabPanel>
    </Box>
  )
}
