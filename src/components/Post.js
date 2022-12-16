import { ArrowDownward, ArrowUpward, InsertComment, OpenInNew } from "@mui/icons-material"
import { Button, Card, CardContent, CardHeader, CardMedia, CardActions, Collapse, Typography, IconButton, Link } from "@mui/material"
import { Link as RouterLink, Navigate } from "react-router-dom"
import Carousel from 'react-material-ui-carousel'
import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"

export const Post = ({ data }) => {
  const [expanded, setExpanded] = useState(false)
  const [viewPostButton, setViewPostButton]  = useState('show more')
  console.log(data)
  useMemo(() => {
    if(expanded) setViewPostButton('show less')
    if(!expanded) setViewPostButton('show more')
  }, [expanded])
  const dispatch = useDispatch()
  const handleExpandClick = (e) => {
    setExpanded(!expanded)
  }

    return (
        <>
        <h1 id={data.id}>I am the post</h1>
      <Card>
        <CardHeader
        titleTypographyProps={{ variant: 'h5', margin: '0.4rem 0' }}
        title={ data.title }
        subheader={ `Posted by u/${data.author}` }
        subheaderTypographyProps={{ variant: 'h6' }}
        />
        { data.post_hint === 'image' &&
        <CardMedia
        component='img'
        image={data.url}
        loading='lazy'
        />
        }
        { 
        data.is_gallery === true && 
        <Carousel 
        sx={{width: '100%', height: 'fit-content'}}
        autoPlay={false}
        loading='lazy'
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
              height='fit-content'
              image={src}
              loading='lazy'
              />
            })
          }
        </Carousel>
        }
        { data.post_hint === 'link' &&
        <>
        <CardMedia 
        loading='lazy'
        component='img'
        sx={{width: 'fit-content', height: 'auto'}}
        src={data.thumbnail}/>
        <a href={data.url} target='_blank' rel="noopener noreferrer">
          <span>
            {(new URL(data.url)).hostname}
            <OpenInNew/>
          </span>
        </a>
        </>
        }
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>{ data.selftext }</Typography>
          </CardContent>
        </Collapse>
        <CardActions>
          <IconButton><ArrowUpward/></IconButton>
          <IconButton><ArrowDownward/></IconButton>
          <IconButton sx={{ borderRadius: '5px'}}><InsertComment/></IconButton>
          {data.selftext.length > 0 && 
          <Button
          onClick={handleExpandClick}
          href={expanded ? `#${data.id}` : ''}
          >{viewPostButton}</Button>}
          <Button component={RouterLink} sx={{ margin: '0 1rem'}}>{`r/${data.subreddit}`}</Button>
        </CardActions>
        
      </Card>    
        </>
    )
}