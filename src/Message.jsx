import { Avatar, Chip, Grid } from '@mui/material'
import React from 'react'

function Message({AI, text, visible}) {

    if (AI) {
        return (
            <Grid sx={{mb: 2}} container spacing={1}>
                {visible ? <Grid item xs={2}>
                    <Avatar>AI</Avatar>
                </Grid> : <Grid item xs={2}>
                </Grid>}
                
                <Grid justifyContent="center" container direction="column" item xs={10}>
                <Chip sx={{ height: '100%',
                p: 1,
                    '& .MuiChip-label': {
                        display: 'block',
                        whiteSpace: 'normal',
                    },}} label={text}></Chip>
                </Grid>
            </Grid>
          )
    } else {
        return (
            <Grid sx={{mb: 2}} container spacing={1}>
                <Grid justifyContent="center" container direction="column" item xs={10}>
                    <Chip color="primary" sx={{ height: '100%',
                    p: 1,
                    '& .MuiChip-label': {
                        display: 'block',
                        whiteSpace: 'normal',
                    },}} label={text}></Chip>
                </Grid>
                <Grid item xs={2}>
                    <Avatar>J</Avatar>
                </Grid>
            </Grid>
          )
    }
  
}

export default Message