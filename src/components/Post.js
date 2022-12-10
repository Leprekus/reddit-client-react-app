import { ExpandMore, SendTimeExtensionSharp } from "@mui/icons-material"
import { Carousel, Card, CardContent, CardHeader, CardMedia, Collapse, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"

export const Post = ({ data }) => {
  const [expanded, setExpanded] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  console.log(data)
  const dispatch = useDispatch()
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const galleryUrls = () => {
    const keys = Object.keys(data.media_metadata)
    const urls = keys.map(key =>  data.media_metadata[key].s.u)
    const imgSrc = urls[0].replaceAll('amp;','')
    setImgSrc(imgSrc)
  }
    return (
        <>
        <h1>I am the post</h1>
      <Card 
      sx={{ width: 600 }}
      >
        <CardHeader
        avatar='here goes avatar'
        title={ data.title }
        subheader={ `r/${data.subreddit} Posted by u/${data.author}` }
        />
        { data.post_hint === 'image' &&
        <Carousel
        component='img'
        height='194'
        image={data.url}
        />
        }
        { 
        data.is_gallery === true && 
        <CardMedia
        image={galleryUrls()}
        />
        

        }
        { data.post_hint === 'link' &&
        <p>Link</p>
        }
        <ExpandMore 
        expand={expanded}
        onClick={handleExpandClick}
        />
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography>{ data.selftext }</Typography>
          </CardContent>
        </Collapse>
        
      </Card>    
        </>
    )
}