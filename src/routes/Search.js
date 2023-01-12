import { LinearProgress } from "@mui/material"
import { useSelector } from "react-redux"
import { selectPostsListStatus, selectPostsLists } from "../features/post/postSlice"
import { RedditPostsList } from "../features/post/RedditPostsList"

export const Search = () => {
    const postsListStatus = useSelector(selectPostsListStatus)
    const postsList = useSelector(selectPostsLists)
    console.log(postsList)
    return (
        <>
        {
            postsListStatus === 'loading' && 
            <LinearProgress/>
        }
        {
            postsListStatus === 'fulfilled' &&
            <RedditPostsList 
            list={postsList}
            />
        }
        </>
    )
}