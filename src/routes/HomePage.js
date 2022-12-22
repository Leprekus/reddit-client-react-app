import { RedditPostsList } from "../features/post/RedditPostsList"
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPostsListStatus, selectPostsLists } from "../features/post/postSlice";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useMemo } from "react";


export const HomePage = () => {
    const dispatch = useDispatch()
    const currentToken = useSelector(selectCurrentToken)
    //handles logic of whether user or client homepage should be fetched
    const homepageParams = '.json?sort=new'
    const args = [currentToken, homepageParams]
    useMemo(() => {

        if(currentToken) {
            //populates postsLists used by RedditPostsList c)omponent
            dispatch(fetchPosts(args))
        }
    }, [])
    const postsListStatus = useSelector(selectPostsListStatus)
    const postsList = useSelector(selectPostsLists) || []

    return ( 
   <>
        <h1>
            Home Page rendered
        </h1>
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
        {
            postsListStatus === 'rejected' && 
            <p>Error</p>
        }

    </>
    )
}