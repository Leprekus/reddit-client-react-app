import { ArrowDownward, ArrowUpward, OpenInNew } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import { useDispatch, useSelector } from "react-redux"
import { postVote, selectCommentsListsStatus, showAlert } from "../features/post/postSlice"
import { useState } from "react"
import { selectCurrentRandomString, selectCurrentUser } from "../features/auth/authSlice"
export const Comment = ({ data }) => {
    const [upvoteColor, setUpvoteColor] = useState('')
    const [downvoteColor, setDownvoteColor] = useState('')
    const [currentVote, setCurrentVote] = useState(0)

    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const handleVote = (value) => {
        if(!currentUser) return dispatch(showAlert(['info', 'sign in to perform this action']))
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
        <Card aria-label='comment'>   
            <CardHeader
            title={data.author}
            titleTypographyProps={{ variant: 'p'}}
            />         
            <CardContent>
                <Typography>{ data.body }</Typography>
            </CardContent> 
            <CardActions>
                <IconButton color={upvoteColor} onClick={() => handleVote(1)} ><ArrowUpward/></IconButton>
                <IconButton color={downvoteColor} onClick={() => handleVote(-1)}><ArrowDownward/></IconButton>
            </CardActions>
        </Card>
    )
}