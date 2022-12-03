import { Button } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useNavigate, useParams } from "react-router-dom"
import fetchToken from "../utils/fetchToken"
//http://localhost:3000/?state=null&code=rCEwwSadImR9asNhNzBdMcSixiS9HQ#_
export const Root = () => {
    const navigate = useNavigate()
    const urlHasCode = (new URL(window.location.href)).searchParams.get('code') && true
    const urlStateString = (new URL(window.location.href)).searchParams.get('state')
   
    let 
    CLIENT_ID = process.env.REACT_APP_REDDIT_ID,
    CLIENT_SECRET = process.env.REACT_APP_REDDIT_SECRET,
    URI = 'http://localhost:3000/',
    DURATION = 'temporary',
    SCOPE_STRING = 'identity, edit, flair, history, modconfig, modflair, modlog, modposts, modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote, wikiedit, wikiread'

    useEffect(() => {
        if(urlHasCode && urlStateString === localStorage.getItem('RANDOM_STRING')) {
            //store code needed to retrieve token
            localStorage.setItem('CODE', (new URL(window.location.href)).searchParams.get('code'))
            return async () => await fetchToken(CLIENT_ID, CLIENT_SECRET, localStorage.getItem('CODE'), URI)
             
            
        }
        return navigate('/login')
            
    },[urlHasCode, urlStateString, navigate])
    return (
    <main>
        <h1>I am the root</h1>
        <nav >
            <Button  component={Link} variant='outline' data-testid='home-page-button' to='homePage'>Home Page</Button>
            <Button  component={Link} variant='outline' to='homePage'>Search</Button>
            <Button  component={Link} variant='outline' to='homePage'>Trending</Button>
            <Button  component={Link} variant='outline' to='homePage'>Notifications</Button>
            <Button  component={Link} variant='outline' to='homePage'>Profile</Button>
        </nav>
        <div>
            <Outlet/>
        </div>
    </main>
   ) 
}