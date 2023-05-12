import {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, Stack, TextField } from '@mui/material';

function PostsEdit() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <Stack spacing={3}>
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
          image={selectedImage == null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/WLM-icon-upload-neg_green.svg/2560px-WLM-icon-upload-neg_green.svg.png" : (imageUrl)}
        />
      </CardActionArea>
      </label>
        <CardContent sx={{height: "200px"}}>
          <TextField
            multiline
            rows={4}
            defaultValue="Protect your skin and the planet with our new natural sunblock. Our formula is free from harmful chemicals and provides broad-spectrum protection against UVA and UVB rays."
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
    </Stack>
  )
}

export default PostsEdit