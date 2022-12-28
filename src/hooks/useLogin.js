import { Button } from "@mui/material"
import randomstring from "randomstring"
import { useEffect, useMemo } from "react"
import { fetchClientToken, fetchToken, selectCurrentRandomString, selectCurrentUser } from "../features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { current } from "@reduxjs/toolkit"

export const useLogin = () => {
    //useFetchToken(); handles login logic
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrentUser)
    const currentRandomString = JSON.parse(useSelector(selectCurrentRandomString))
    const urlContainsCurrentRandomString = (new URL(window.location.href)).searchParams.get('state') === currentRandomString && currentRandomString !== null
    useMemo(() => { 
        if(urlContainsCurrentRandomString && currentUser) {
            console.log(true)
            return navigate('/', { replace: true })
        }
        //set random string in redux global store
        if(currentRandomString && !currentUser) {
            //check that random string in url matches with stored string
            if(urlContainsCurrentRandomString){ 
                console.log(urlContainsCurrentRandomString)
                const code = new URL(window.location.href).searchParams.get('code')
                //send post request and store token
                dispatch(fetchClientToken(true, code))
                return;
            }
            const authEndpoint = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_ID}&response_type=code&state=${currentRandomString}&redirect_uri=${process.env.REACT_APP_URI}&duration=permanent&scope=${process.env.REACT_APP_SCOPE_STRING}`
            window.location.href = authEndpoint   
        }
    }, [currentUser, currentRandomString, urlContainsCurrentRandomString])
}