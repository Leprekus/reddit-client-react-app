import { ArrowDownward, ArrowUpward, InsertComment, OpenInNew } from "@mui/icons-material"
import { Button, Card, CardContent, CardHeader, CardMedia, CardActions, Collapse, Typography, IconButton } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchComments, fetchPosts } from "../features/post/postSlice"
import { selectCurrentToken } from "../features/auth/authSlice"
import { Link, useParams } from "react-router-dom"

export const Post = ({ data }) => {
  const dispatch = useDispatch()
  const { subreddit } = useParams()
  const [expanded, setExpanded] = useState(false)
  const [viewPostButton, setViewPostButton]  = useState('show more')
  const currentToken = useSelector(selectCurrentToken)
  useMemo(() => {
    if(expanded) setViewPostButton('show less')
    if(!expanded) setViewPostButton('show more')
  }, [expanded])
  const handleExpandClick = (e) => {
    setExpanded(!expanded)
  }
  const handleDisplayComments = (e) => {
    dispatch(fetchComments([currentToken, data.subreddit, data.id]))
  }
  const handleFetchSubreddit = () => {
    dispatch(fetchPosts(`${data.subreddit_name_prefixed}`))
  }
    return (
        <>
      <Card>
        <CardHeader
        id={data.id}
        titleTypographyProps={{ variant: 'h5', margin: '0.4rem 0' }}
        title={ data.title }
        subheader={ `Posted by u/${data.author}` }
        subheaderTypographyProps={{ variant: 'h6' }}
        />
        { //handle images 
        data.post_hint === 'image' &&
        <CardMedia
        component='img'
        image={data.url}
        loading='lazy'
        />
        }
        { //handle galleries
        data.is_gallery === true && 
        <Carousel 
        sx={{width: '100%', height: 'fit-content'}}
        autoPlay={false}
        loading='lazy'
        NavButton={({onClick, className='contained', style, next, prev}) => {
          // render buttons to cycle gallery
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
        { //handle link posts  
         //checks for t3 prefix which indicates thing is a post
        data.name.split('_')[0] === 't3' &&
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
          <IconButton aria-label="upvote"><ArrowUpward/></IconButton>
          <IconButton aria-label="downvote"><ArrowDownward/></IconButton>
          <IconButton sx={{ borderRadius: '5px'}} aria-label="comments" onClick={handleDisplayComments}><InsertComment/></IconButton>
          {data.selftext?.length > 0 && 
          <Button
          onClick={handleExpandClick}
          href={expanded ? `#${data.id}` : ''}
          aria-label="show more"
          >{viewPostButton}</Button>}
          <Button 
            sx={{ margin: '0 1rem'}}
            aria-label="subreddit"
            component={Link}
            to={subreddit === data.subreddit ? null : `${data.subreddit_name_prefixed}`}
            onClick={handleFetchSubreddit}
            >
            {`${data.subreddit_name_prefixed}`}</Button>
        </CardActions>
        
      </Card>    
        </>
    )
}