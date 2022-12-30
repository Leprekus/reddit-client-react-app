import { ArrowDownward, ArrowUpward, EmojiEvents, InsertComment, OpenInNew } from "@mui/icons-material"
import { Button, Card, CardContent, CardHeader, CardMedia, CardActions, Collapse, Typography, IconButton, Tooltip } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import { useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchComments, fetchPosts, postVote } from "../features/post/postSlice"
import { selectCurrentToken } from "../features/auth/authSlice"
import { Link } from "react-router-dom"

export const Post = ({ data }) => {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false)
  const [viewPostButton, setViewPostButton]  = useState('show more')
  const [upvoteColor, setUpvoteColor] = useState('')
  const [downvoteColor, setDownvoteColor] = useState('')
  const [currentVote, setCurrentVote] = useState(0)
  const currentToken = useSelector(selectCurrentToken)
  const awardContainerRef = useRef(null)
  console.log(data)
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
  const handleToggleAwards = () => {
    if(awardContainerRef.current.style.display === 'flex') {
      return awardContainerRef.current.style.display = 'none'
    }
    return awardContainerRef.current.style.display = 'flex'
  }
  const handleVote = (value) => {
    //changes downvote to upvote & viceversa
    if(value + currentVote === 0) {
      setCurrentVote(value)
      return value > 0 ? 
      (setUpvoteColor('primary'),
      setDownvoteColor(''),
      dispatch(postVote([data.name, value])))
      : 
      (setDownvoteColor('primary'),
      setUpvoteColor(''),
      dispatch(postVote([data.name, value]))
      )
    }
    //resets vote
    if(currentVote !== 0) {
      setCurrentVote(0)
      setUpvoteColor('')
      setDownvoteColor('')
      console.log(currentVote)
      return dispatch(postVote([data.name, 0]))
       
    }
    //dispatches normal vote (when currentVote === 0)
    value > 0 ? setUpvoteColor('primary') : setDownvoteColor('primary')    
    setCurrentVote(value)
    console.log(currentVote)
    return dispatch(postVote([data.name, value]))
    
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
        {
          data.selftext.length > 0 && 
          <p>tldr;</p>
        }
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
        data.post_hint === 'link' &&
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
          <IconButton color={upvoteColor} onClick={() => handleVote(1)} aria-label="upvote"><ArrowUpward/></IconButton>
          <IconButton color={downvoteColor} onClick={() => handleVote(-1)} aria-label="downvote"><ArrowDownward/></IconButton>
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
            onClick={handleFetchSubreddit}
            to={`/${data.subreddit_name_prefixed}`}
            >
            {`${data.subreddit_name_prefixed}`}</Button>
            {
            data.all_awardings.length > 0 &&
            <IconButton 
            edge='end'
            size="medium"
            onClick={handleToggleAwards}
            >
              <EmojiEvents/>
            </IconButton>
            }
        </CardActions>
      </Card>    
      <div className="award-container" ref={awardContainerRef}>
        {
          data.all_awardings.map(award => (
            <Tooltip 
            title={award.description}
            arrow
            placement="top"
            key={award.icon_url}
            >
              <img src={award.icon_url} alt='award' className="award"/>
            </Tooltip>)
          )
        }
      </div>
        </>
    )
}