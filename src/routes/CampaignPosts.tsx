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




function CampaignPosts() {
    const [items, setItems] = React.useState([
      {
        id: "0",
        date: "05/19/2023",
        image: "https://placehold.co/600x400",
        description: "Protect your skin and the planet with our new natural sunblock. Our formula is free from harmful chemicals and provides broad-spectrum protection against UVA and UVB rays."
      },
      {
        id: "1",
        date: "05/23/2023",
        image: "https://placehold.co/700x200",
        description: "Protect your skin and the planet with our new natural sunblock. Our formula is free from harmful chemicals and provides broad-spectrum protection against UVA and UVB rays."
      },
      {
        id: "2",
        date: "05/28/2023",
        image: "https://placehold.co/400x400",
        description: "Protect your skin and the planet with our new natural sunblock. Our formula is free from harmful chemicals and provides broad-spectrum protection against UVA and UVB rays."
      },
      {
        id: "3",
        date: "05/28/2023",
        image: "https://placehold.co/400x450",
        description: "Protect your skin and the planet with our new natural sunblock. Our formula is free from harmful chemicals and provides broad-spectrum protection against UVA and UVB rays."
      }
    ]);
    

    return (
      <div>
        <Box sx={{display: { sm: 'none', md: "block", xs: "none" }}}>

        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {items.map(({ id, date, image, description }) => (
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
            {items.map(({ id, date, image, description }) => (
              <SingleCard
              itemId={id}
              date={date}
              image={image}
              description={description}
              key={id}
              />
              ))}
        </Box>
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