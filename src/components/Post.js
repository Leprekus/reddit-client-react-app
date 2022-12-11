import { ExpandMore, SendTimeExtensionSharp } from "@mui/icons-material"
import { Button, Card, CardContent, CardHeader, CardMedia, Collapse, Typography } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import { useState } from "react"
import { useDispatch } from "react-redux"

export const Post = ({ data }) => {
  const [expanded, setExpanded] = useState(false)
  console.log(data)
  const dispatch = useDispatch()
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

    return (
        <>
        <h1>I am the post</h1>
      <Card 
      sx={{ width: 600, height: 500 }}
      >
        <CardHeader
        avatar='here goes avatar'
        title={ data.title }
        subheader={ `r/${data.subreddit} Posted by u/${data.author}` }
        />
        { data.post_hint === 'image' &&
        <CardMedia
        component='img'
        height='194'
        image={data.url}
        />
        }
        { 
        data.is_gallery === true && 
        <Carousel 
        autoPlay={false}
        NavButton={({onClick, className='contained', style, next, prev}) => {
          // Other logic
  
          return (
              <Button onClick={onClick} className={className} style={style}>
                  {next && "Next"}
                  {prev && "Previous"}
              </Button>
          )
      }}
        >
          {
            Object.keys(data.media_metadata).map(key =>{
              const link = data.media_metadata[key].s.u
              const src = link.replaceAll('amp;','')
              return <CardMedia
              key={key}
              component='img'
              height='194'
              image={src}
              />
            })
          }
        </Carousel>
        }
        { data.post_hint === 'link' &&
        <p>Link</p>
        }
        <Button 
        onClick={handleExpandClick}
        >Show More</Button>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography>{ data.selftext }</Typography>
          </CardContent>
        </Collapse>
        
      </Card>    
        </>
    )
}