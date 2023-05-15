import './App.css';
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Button, Chip, Stack } from '@mui/material';
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { single, campaign } from "./api/openAiApi"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Message from './Message';






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
            <Typography sx={{display: "flex", flexDirection: "column", height: "100%"}}>{children}</Typography>
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
  const [conversation, setConversation] = React.useState([{"role": "system", "content": 'You are a Expert Content Creator for Instagram page.'},
  {"role": "assistant", "content": "Hello, I'm Abby, your own seasoned content creator. I will help you craft Instagram content that not only resonates with your audience but also converts them into paying customers."},
  {"role": "assistant", "content": "Tell me about your business, its mission, vision, and target audience. The more you share, the better I can tailor content ideas to your unique brand identity and customer needs."},
  {"role": "system", "content": 'You will get the details from the user and give him 3 content ideas and do not make them long. After that ask the user to choose an idea and you will generate one post caption using it. It should start with: InstaPostStart and ends with InstaPostEnd'},])
  let location = useLocation();
  let singlePost = location.pathname == "/"
  const [textInput, setTextInput] = useState("");
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };
  const queryClient = useQueryClient()
    useEffect(() => {
      if (singlePost) {
        setTextInput("My company uses AI to make art")
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
          setConversation(data)
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
    <Box sx={{height: "95%"}}>
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
      <TabPanel value={value} index={0} style={{justifyContent: "center", display: "flex", height: "100%"}}>
    
        <Typography sx={{fontWeight: "700", fontSize: "1.5rem"}}>What's this campaign about?</Typography>
        <Box sx={{height: "1vh", overflow: "auto", flexGrow: "1", overflowX: "hidden"}}>
          {conversation.map(el => {
            if(el.role == "user") {
              return <Message AI={false} text={el.content} visible={true}/>
            }
            if (el.role == "assistant") {
              if(el.content.includes("InstaPostStart")) {
                queryClient.invalidateQueries(["responseAi"])
                queryClient.setQueryData(["responseAi"], el.content)
                return (
                  <Message AI={true} text={el.content.substring(0, el.content.indexOf("InstaPostStart"), el.content.indexOf("InstaPostEnd")) + el.content.substring(el.content.indexOf("InstaPostEnd") + "InstaPostEnd".length, el.content.length)} visible={true}/>
                  )
              } else {
                return <Message AI={true} text={el.content} visible={true}/>
              }
            }
          })}
        </Box>
        <TextField
          multiline
          sx={{width: "100%"}}
          inputProps={{
          }}
          onChange= {handleTextInputChange}
          value={textInput}
        />
        {!singlePost && <TextField
          label="How many posts?"
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
        <Button variant="contained" color="primary" sx={{borderRadius: "100px", width: "100%"}} size="large" onClick={() => {
          let toPush = [...conversation, {"role": "user", content: textInput}]
          setConversation(toPush)
          mutate(toPush)
          console.log(conversation)
        }}>
            CREATE! 
        </Button>
      </TabPanel>
    </Box>
  )
}
