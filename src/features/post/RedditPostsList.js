import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/Post";
import { fetchPosts, selectPostsLists, selectPostsListStatus } from "./postSlice";
export const RedditPostsList = () => {
    const dispatch = useDispatch()
    const postsListStatus = useSelector(selectPostsListStatus)
    const postsLists = useSelector(selectPostsLists)
    
    useMemo(() => {
        dispatch(fetchPosts())
    }, [])
    console.log(postsListStatus)
    return (
        <>
        {
            postsListStatus === 'loading' &&
            <p>Loading...</p>
        } 
        {
            postsListStatus === 'fulfilled' && 
            postsLists.map(data => 
            <Post 
            key={data.id}
            data={data}/>)
        }
        {
            postsListStatus === 'rejected' && 
            <p>Error</p>
        }

        </>
    )
}
