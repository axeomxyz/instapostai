import './App.css';
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Button, Chip, IconButton, Stack } from '@mui/material';
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { single, campaign } from "./api/openAiApi"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Message from './Message';
import ReplayIcon from '@mui/icons-material/Replay';
import { Send, VisibilityOff } from '@mui/icons-material';
import Divider from '@mui/material/Divider';





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
  
  const Typing = () => (
    <div className="typing">
      <div className="typing__dot"></div>
      <div className="typing__dot"></div>
      <div className="typing__dot"></div>
    </div>
  )

export default function Template() {
  const [value, setValue] = React.useState(0);
  const [postNumber, setPostNumber] = React.useState(2);
  let location = useLocation();
  let singlePost = location.pathname == "/"
  let postsNumber
  if (singlePost) {
    postsNumber = 1
  } else {
    postsNumber = postNumber
  }
  const [conversation, setConversation] = React.useState([{"role": "system", "content": 'You are a Expert Content Creator for Instagram page.'},
  {"role": "assistant", "content": "Hello, I'm Abby, your own seasoned content creator. I will help you craft Instagram content that not only resonates with your audience but also converts them into paying customers."},
  {"role": "assistant", "content": "Tell me about your business, its mission, vision, and target audience. The more you share, the better I can tailor content ideas to your unique brand identity and customer needs."},
  {"role": "system", "content": 'You will get the details from the user and give him 3 content ideas and do not make them long. After that ask the user to choose an idea and you will generate captions for ' + String(postsNumber) + ' posts using it. Your results should be in this format: "InstaPostStart <caption> InstaPostEnd" do not add anything else'},])
  const queryClient = useQueryClient()
  useEffect(
    () => {
      queryClient.invalidateQueries(["responseAi"])
      queryClient.setQueryData(["responseAi"], [])
      queryClient.invalidateQueries(["responseAiCampaign"])
      queryClient.setQueryData(["responseAiCampaign"], [])
      setConversation([{"role": "system", "content": 'You are a Expert Content Creator for Instagram page.'},
      {"role": "assistant", "content": "Hello, I'm Abby, your own seasoned content creator. I will help you craft Instagram content that not only resonates with your audience but also converts them into paying customers."},
      {"role": "assistant", "content": "Tell me about your business, its mission, vision, and target audience. The more you share, the better I can tailor content ideas to your unique brand identity and customer needs."},
      {"role": "system", "content": 'You will get the details from the user and give him 3 content ideas and do not make them long. After that ask the user to choose an idea and you will generate captions for ' + String(postsNumber) + ' posts using it. Your results should be in this format: "InstaPostStart <caption> InstaPostEnd" do not add anything else'},])
    },
    [singlePost]
  )
  const [textInput, setTextInput] = useState("");
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };
  
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
          setConversation(data)
          console.log(conversation)
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

    useEffect(() => {
      document.getElementById("messagesContainer").scrollTop = document.getElementById("messagesContainer").scrollHeight
    }, [isLoading])
      
  return (
    <Box sx={{height: "95%"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="TEMPLATE 1" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{justifyContent: "center", display: "flex", height: "100%"}}>
    
        <Typography sx={{fontWeight: "700", fontSize: "1.5rem"}}>{singlePost ? "Single Post" : "Campaign"}<Divider /></Typography>
        
        <Box id="messagesContainer" sx={{height: "1vh", overflow: "auto", flexGrow: "1", overflowX: "hidden"}}>
          {conversation.map(el => {
            if(el.role == "user") {
              return <Message AI={false} text={el.content} visible={true}/>
            }
            if (el.role == "assistant") {
              if(el.content.includes("InstaPostStart")) {
                if(singlePost) {
                  queryClient.invalidateQueries(["responseAi"])
                  queryClient.setQueryData(["responseAi"], el.content.replaceAll("<br />", ""))
                } else {
                  queryClient.invalidateQueries(["responseAiCampaign"])
                  queryClient.setQueryData(["responseAiCampaign"], el.content.replaceAll("<br />", ""))
                }
                return (
                  <Message AI={true} text={el.content.substring(0, el.content.indexOf("InstaPostStart"), el.content.lastIndexOf("InstaPostEnd")).replaceAll("<br />", "") + el.content.substring(el.content.lastIndexOf("InstaPostEnd") + "InstaPostEnd".length, el.content.length).replaceAll("<br />", "")} visible={true}/>
                  )
                } else {
                  return el.content.split("<br />").filter((x) => x != "").map(y => {return <Message AI={true} text={y} visible={true}/>})
                }
              }
            })}
            {isLoading ? <Message AI={true} text={<Typing />} visible={true}/> : ""}
        </Box>
        {!singlePost && <TextField
          label="How many posts?"
          id="outlined-start-adornment"
          sx={{width: "100%", padding: "10px"}}
          type="number"
          onChange= {(e) => {
            var value = parseInt(e.target.value);
  
            if (value > 10) value = 10;
            if (value < 2) value = 2;
  
            setPostNumber(value);
          }}
          value={postNumber}
        />}
        <TextField
          multiline
          sx={{width: "100%"}}
          placeholder='Write here...'
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              let toPush = [...conversation, {"role": "user", content: textInput}]
              setConversation(toPush)
              mutate(toPush)
              console.log(toPush)
              setTextInput("")
            }
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end"><IconButton onClick={() => {
              let toPush = [...conversation, {"role": "user", content: textInput}]
              setConversation(toPush)
              mutate(toPush)
              console.log(toPush)
              setTextInput("")
            }}><Send /></IconButton></InputAdornment>
          }}
          onChange= {handleTextInputChange}
          value={textInput}
        />
        
      </TabPanel>
    </Box>
  )
}
