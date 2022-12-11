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
    const filter = (color) => {
        return {
            ':hover': {
                cursor: 'pointer'
            },
            border: `${color} 2.5px solid`,
            color: `${color}`,
            fontWeight: 'bold',
            borderRadius: '15px',
            margin: '0 0.2rem',
            padding: '0 0.8rem 0.2rem 0.8rem',
          }
    }
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
            spacing={10}
            >
                <Grid2>
                    <span style={filter('#05d7a0')}>newest</span>
                    <span style={filter('#f0466e')}>most liked</span>
                    <span style={filter('#ffd264')}>awards</span>
                    <span style={filter('#0f8cb4')}>flaired</span>
                    <span style={filter('#f5a05f')}>videos</span>
                    <span style={filter('#6e5a7d')}>images</span>
                    <span style={filter('#053c4b')}>text</span>
                </Grid2>
                {
                postsLists.map((data, index) =>
                <Grid2 xs={12} key={index}>
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
