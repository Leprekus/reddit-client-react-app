import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/Post";
import { Unstable_Grid2 as Grid2 } from "@mui/material";
import { fetchPosts, selectPostsLists, selectPostsListStatus } from "./postSlice";
export const RedditPostsList = () => {
    const dispatch = useDispatch()
    const postsListStatus = useSelector(selectPostsListStatus)
    const postsLists = useSelector(selectPostsLists)
    
    useMemo(() => {
        dispatch(fetchPosts())
    }, [])
    return (
        <>
        {
            postsListStatus === 'loading' &&
            <p>Loading...</p>
        }
         
        {
            postsListStatus === 'fulfilled' && 
            <Grid2
            container
            spacing={1}
            >
                {
                postsLists.map((data) =>
                <Grid2 xs={12}>
                    <Post
                    key={data.id}
                    data={data}/>
                </Grid2>
                )
                }
            </Grid2>
        }
        
        {
            postsListStatus === 'rejected' && 
            <p>Error</p>
        }

        </>
    )
}
