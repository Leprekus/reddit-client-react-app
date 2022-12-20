import { useDispatch, useSelector } from "react-redux"
import { selectCommentsListsStatus, selectPostsLists, toggleDisplayComments } from "../features/post/postSlice"
import { Card, CardActionArea, IconButton, Paper, Unstable_Grid2 as Grid2 } from "@mui/material";
import { Comment } from "./Comment";
import { Post } from "./Post";
import { Close } from "@mui/icons-material";

export const CommentSection = ({ postId }) => {
    const dispatch = useDispatch()
    const commentsList = useSelector(selectPostsLists)[postId].comments
    console.log(commentsList)
    const commentStatus = useSelector(selectCommentsListsStatus)
    const handleCloseCommentSection = () => {
        dispatch(toggleDisplayComments(postId))
    }
    return (
    //paper component is used to designate the comment's section background / container area 
    //each comment renders a card component to display the content and add interactability to it 
    <Paper>
        <IconButton onClick={handleCloseCommentSection}>
            <Close/>
        </IconButton>
        {
            commentStatus === 'loading' && 
            <p>Loading...</p>
        }
        {
            commentStatus === 'fulfilled' &&
            commentsList.map(data => 
                <Comment 
                key={data.id}
                data={data}
                />
            )
        }
    </Paper>
    )
}
