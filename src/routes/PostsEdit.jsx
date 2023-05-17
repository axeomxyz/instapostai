import {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, Stack, TextField } from '@mui/material';
import { useQuery } from "@tanstack/react-query"
import axios from 'axios';



function PostsEdit() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Image-Upload-Icon-Graphics-10388650-1-580x386.jpg");
  const [postCaption, setPostCaption] = useState("");
  const [isSharingPost, setIsSharingPost] = useState(false);
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");
  const [shared, setShared] = useState(false)
  const [error, setError] = useState(false);
  let resp = useQuery(["responseAi"]).data

  useEffect(() => {
    if(resp) {
      if(resp.includes("InstaPostStart")) {
        setPostCaption(resp.substring(resp.indexOf("InstaPostStart") + "InstaPostStart".length, resp.indexOf("InstaPostEnd")).replace(/(\r\n|\n|\r)/gm, ""))
      }
    }
  }, [resp])

  /* --------------------------------------------------------
   *             INSTAGRAM AND FACEBOOK GRAPH APIs
   * --------------------------------------------------------
   */

  const getFacebookPages = () => {
    return new Promise((resolve) => {
      window.FB.api(
        "me/accounts",
        { access_token: facebookUserAccessToken },
        (response) => {
          resolve(response.data);
        }
      );
    });
  };

  const getInstagramAccountId = (facebookPageId) => {
    return new Promise((resolve) => {
      window.FB.api(
        facebookPageId,
        {
          access_token: facebookUserAccessToken,
          fields: "instagram_business_account",
        },
        (response) => {
          resolve(response.instagram_business_account.id);
        }
      );
    });
  };

  const createMediaObjectContainer = (instagramAccountId) => {
    return new Promise((resolve) => {
      window.FB.api(
        `${instagramAccountId}/media`,
        "POST",
        {
          access_token: facebookUserAccessToken,
          image_url: imageUrl,
          caption: postCaption,
        },
        (response) => {
          resolve(response.id);
        }
      );
    });
  };

  const publishMediaObjectContainer = (
    instagramAccountId,
    mediaObjectContainerId
  ) => {
    return new Promise((resolve) => {
      window.FB.api(
        `${instagramAccountId}/media_publish`,
        "POST",
        {
          access_token: facebookUserAccessToken,
          creation_id: mediaObjectContainerId,
        },
        (response) => {
          resolve(response.id);
          if (response.error) {
            setError(true)
          }
        }
      );
    });
  };

  const shareInstagramPost = async () => {
    setIsSharingPost(true);
    const facebookPages = await getFacebookPages();
    const instagramAccountId = await getInstagramAccountId(facebookPages[0].id);
    const mediaObjectContainerId = await createMediaObjectContainer(
      instagramAccountId
    );

    await publishMediaObjectContainer(
      instagramAccountId,
      mediaObjectContainerId
    ).then(() => {
      setShared(true)
    })

    setIsSharingPost(false);

    // Reset the form state
    
  };

  if (resp) {
    if(resp.includes("InstaPostStart")) {
      return <div>
      <Card sx={{width: "40vh"}}>
      <input
  accept="image/"
  type="file"
  id="select-image"
  style={{ display: 'none' }}
  onChange={e => {
    setSelectedImage(e.target.files[0])
    console.log(imageUrl)
    const formData = new FormData();
     formData.append( "image", e.target.files[0] ); // has to be named 'image'!

     axios.post( 'https://api.imgbb.com/1/upload?key=a8abd338123ae56e2f8f9e6105e679b0', formData )
       .then( res => { setImageUrl(res.data.data.url)
      console.log(res.data.data.url) } )
       .catch( error => { return null } )

  }}
/>
<label htmlFor="select-image">

    <CardActionArea component="span" onClick={() => console.log()}>
      <CardMedia
        component="img"
        height="400"
        image={imageUrl}
      />
    </CardActionArea>
    </label>
      <CardContent sx={{height: "200px"}}>
        <TextField
          multiline
          rows={4}
          defaultValue={resp.substring(resp.indexOf("InstaPostStart") + "InstaPostStart".length, resp.indexOf("InstaPostEnd")).replace(/(\r\n|\n|\r)/gm, "")}
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
          onChange={(e) => {
            setPostCaption(e.target.value)
          }}
        />
      </CardContent>
  </Card>
      <Button
      onClick={shareInstagramPost}
      disabled={isSharingPost || !imageUrl  || shared}
      variant="contained" color="primary" sx={{borderRadius: "100px", width: "100%"}} size="large">
        {isSharingPost ? "Sharing..." : shared ? "Shared!" : "Share"}
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