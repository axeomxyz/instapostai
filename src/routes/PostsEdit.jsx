import {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, Stack, TextField } from '@mui/material';
import { useQuery } from "@tanstack/react-query"


function PostsEdit() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  let resp = useQuery(["responseAi"]).data

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  if (resp) {
    if(resp.includes("InstaPostStart")) {
      return <div>
      <Card sx={{width: "40vh"}}>
      <input
  accept="image/"
  type="file"
  id="select-image"
  style={{ display: 'none' }}
  onChange={e => setSelectedImage(e.target.files[0])}
/>
<label htmlFor="select-image">

    <CardActionArea component="span" onClick={() => console.log("hey")}>
      <CardMedia
        component="img"
        height="400"
        image={selectedImage == null ? "https://picsum.photos/500/600" : (imageUrl)}
      />
    </CardActionArea>
    </label>
      <CardContent sx={{height: "200px"}}>
        <TextField
          multiline
          rows={4}
          defaultValue="Protect your skin and the planet with our new natural sunblock. Our formula is free from harmful chemicals and provides broad-spectrum protection against UVA and UVB rays."
          value={resp.substring(resp.indexOf("InstaPostStart") + "InstaPostStart".length, resp.indexOf("InstaPostEnd")).replace(/(\r\n|\n|\r)/gm, "")}
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
      <Button variant="contained" color="primary" sx={{borderRadius: "100px", width: "100%"}} size="large">
          POST!
      </Button>
      </div>
    } else {
      return <div>
              <h2>Give us a prompt to generate a post!</h2>
              </div>
    }
  }else {
    return <div>
            <h2>Give us a prompt to generate a post!</h2>
            </div>
  }

}

export default PostsEdit