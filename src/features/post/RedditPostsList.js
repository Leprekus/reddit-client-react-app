import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Post } from "../../components/Post";
import { fetchPosts } from "./postSlice";
export const RedditPostsList = () => {
    const dispatch = useDispatch()
    const postsList = dispatch(fetchPosts());
    useMemo(() => {
        
    }, [postsList])
    return (
        <>
        {
            postsList.length > 0 ? postsList.map(data => {
                return <Post data={data}/>
            }) :
            <p>Couldn't fetch posts</p>
        }
        </>
    )
}
