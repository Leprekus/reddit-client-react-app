import { Button } from "@mui/material"
import { useAuth } from "../hooks/useAuth"
import randomstring from "randomstring"
import { useFetchToken } from "../hooks/useFetchToken"
import { useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { fetchToken, selectCurrentRandomString, selectCurrentToken, setRandomString } from "../features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const LoginPage = () => {
    //const { randString } = useAuth();
    //useFetchToken(); handles login logic
    const dispatch = useDispatch()
    const currentRandomString = useSelector(selectCurrentRandomString)
    const currentToken = useSelector(selectCurrentToken)
    const urlContainsCurrentRandomString = (new URL(window.location.href)).searchParams.get('state') && currentRandomString
    useEffect(() => {
        //set random string in redux global store
        if(localStorage?.getItem('randomString')) {
            dispatch(setRandomString(localStorage.getItem('randomString')))
        } else {
            localStorage.setItem('randomString', randomstring.generate())
            dispatch(setRandomString(localStorage.getItem('randomString')))
        }
        //check that random string in url matches with stored string 
        if(urlContainsCurrentRandomString){ 
            const code = new URL(window.location.href).searchParams.get('code')
            //send post request and store token
            dispatch(fetchToken(code))
        }
    }, [urlContainsCurrentRandomString, currentToken, dispatch])
    if(currentToken) {
        return <Navigate to='/homepage' replace/>
    }
    const handleLogin = () => {
        const authEndpoint = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_ID}&response_type=code&state=${currentRandomString}&redirect_uri=${process.env.REACT_APP_URI}&duration=permanent&scope=${process.env.REACT_APP_SCOPE_STRING}`
        window.location.href = authEndpoint
        // setCookie('test', 2324, Date.now())
        // setCookie('test2', 2324, Date.now())
        
    }
    return ( 
        <div>
            <Button onClick={handleLogin} variant="contained">Login</Button>
        </div>
    )
}