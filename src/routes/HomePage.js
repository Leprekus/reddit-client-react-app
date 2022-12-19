import { RedditPostsList } from "../features/post/RedditPostsList"
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/post/postSlice";
import { fetchClientToken, selectCurrentToken } from "../features/auth/authSlice";
import { useMemo } from "react";


export const HomePage = () => {
    //handles logic of whether user or client homepage should be fetched
    const dispatch = useDispatch()
    const currentToken = useSelector(selectCurrentToken)
    const homepageParams = '.json?sort=new'
    const args = [currentToken, homepageParams]
    useMemo(() => {
        if(!currentToken) dispatch(fetchClientToken())
        //populates postsLists used by RedditPostsList component
        if(currentToken.access_token) dispatch(fetchPosts(args))
    }, [])

    return ( 
   <>
        <h1>
            Home Page rendered
        </h1>
        <RedditPostsList/>
    </>
    )
}