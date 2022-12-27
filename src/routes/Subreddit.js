import { useSelector } from "react-redux"
import { selectPostsListStatus, selectPostsLists } from "../features/post/postSlice"
import { RedditPostsList } from "../features/post/RedditPostsList"

export const Subreddit = () => {
    const postsListStatus = useSelector(selectPostsListStatus)
    const postsList = useSelector(selectPostsLists)
    console.log(postsList)
    return (
        <>
        {
            postsListStatus === 'loading' && 
            <p>Loading...</p>
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