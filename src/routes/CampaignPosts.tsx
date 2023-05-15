import { IconButton, TextField } from '@mui/material';
import React from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from '@mui/material/Box';
import { useQuery } from "@tanstack/react-query"





function CampaignPosts() {
    const [items, setItems] = React.useState([]);
    let resp = useQuery(["responseAiCampaign"]).data
    let respArray
    let finalResp
    if (resp) {

      respArray = resp.split("InstaPostEnd")
      respArray.pop()
      finalResp = []
      respArray.forEach((element, index) => {
        const obj = {
          id: index,
          date: "05/23/2023",
          image: "https://picsum.photos/500/600",
          description: element.replace(/(\r\n|\n|\r)/gm, "").replace("InstaPostStart:", "")
        }
        finalResp.push(obj)
      });
    }
      

    return (
      <div>
          {resp ? <div>
            <Box sx={{display: { sm: 'none', md: "block", xs: "none" }}}>
              {/*JSON.stringify(respArray)*/}
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
              {finalResp.map(({ id, date, image, description }) => (
                <SingleCard
                itemId={id}
                date={date}
                image={image}
                description={description}
                key={id}
                />
                ))}
            </ScrollMenu>
            </Box>
            <Box sx={{display: { sm: 'block', md: "none" }}}>
                {finalResp.map(({ id, date, image, description }) => (
                  <SingleCard
                  itemId={id}
                  date={date}
                  image={image}
                  description={description}
                  key={id}
                  />
                  ))}
            </Box>
          </div> : 
          <h2>Give us a prompt to generate a campaign!</h2>
          }
          

      </div>
    );
}

function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);
  
    return (
      <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        <ArrowBackIosNewIcon/>
      </Arrow>
    );
  }
  
  function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  
    return (
      <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
        <ArrowForwardIosIcon/>
      </Arrow>
    );
  }
  
  function SingleCard({ itemId, date, image, description }: {itemId: string ; date: string; image: string; description: string}) {
  
    return (
      <div
        role="button"
        style={{
          width: "40vh",
          margin: "30px"
        }}
        tabIndex={0}
        className="card"
      >
        <Card>
      <CardActionArea onClick={() => console.log("hey")}>
        <CardMedia
          component="img"
          height="400"
          image={image}
        />
      </CardActionArea>
        <CardContent sx={{height: "200px"}}>
          <TextField
            multiline
            rows={4}
            defaultValue={description}
            variant="standard"
            InputProps={{
              disableUnderline: true
            }}
            sx={{width: "-webkit-fill-available"}}
            inputProps={{
              style: {
                height: "180px"
              },
            }}
          />
        </CardContent>
    </Card>
      </div>
    );
  }
  
  
  function Arrow({
    children,
    disabled,
    onClick
  }: {
    children: React.ReactNode;
    disabled: boolean;
    onClick: VoidFunction;
  }) {
    return (
      <IconButton color="primary"
      disabled={disabled}
        onClick={onClick}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          right: "1%",
          opacity: disabled ? "0" : "1",
          userSelect: "none"
        }}>
        {children}
      </IconButton>
    );
  }

export default CampaignPosts