import { useSelector } from "react-redux"
import { Post } from "../components/Post"
import { selectSearchResultStatus, selectSearchResults, selectPostsListStatus, selectPostsLists } from "../features/post/postSlice"
import { RedditPostsList } from "../features/post/RedditPostsList"

export const Search = () => {
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