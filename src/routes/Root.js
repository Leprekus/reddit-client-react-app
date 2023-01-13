import { Alert, Button, Fade, IconButton, Input, InputAdornment, TextField } from "@mui/material"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { logout, selectCurrentToken, fetchClientToken, selectCurrentUser, setRandomString } from "../features/auth/authSlice"
import { Unstable_Grid2 as Grid2 } from "@mui/material";
import { Search } from "@mui/icons-material"
import { fetchPosts, selectAlertProps, selectDisplayAlert } from "../features/post/postSlice"
import randomstring from "randomstring"
import { useLogin } from "../hooks/useLogin"

export const Root = () => {
    const dispatch = useDispatch()
    const currentToken = useSelector(selectCurrentToken)
    const currentUser = useSelector(selectCurrentUser)
    const displayAlert = useSelector(selectDisplayAlert)
    const alertProps = useSelector(selectAlertProps)
    const { type, text } = alertProps
  

    const [searchField, setSearchField] = useState('')
    const [login, setLogin] = useState(() => {
        return currentUser ? 'Logout' : 'Login'
    })
    useMemo(() => {
        if(currentUser) {
            setLogin('Logout')
        }
        if(!currentToken){ 
            dispatch(fetchClientToken()) 
        }
        if(currentToken && currentToken.expires_in < Date.now()) {
            dispatch(fetchClientToken())
        }
    }, [currentUser, currentToken])
    
    const handleToggleLogin = () => {
        if(login === 'Login') {
            setLogin('Logout')
            dispatch(setRandomString(randomstring.generate()))
        }
        if(login === 'Logout') {
            setLogin('Login')
            dispatch(logout())
        }
    }
    useLogin()
    const handleFetchQuery = () => {
        dispatch(fetchPosts(`search.json?q=${searchField}`))
    }
    return (
    <main>
        <Grid2 container columnGap={2} justifyContent='center'>
            <Button  component={Link} variant='outline' data-testid='home-page-button' to='/'>Home Page</Button>
            <TextField 
            placeholder="Search Reddit"
            value={searchField}
            onChange={({ target }) => setSearchField(target.value)}
            InputProps={{
                endAdornment: <IconButton onClick={handleFetchQuery} component={Link} to='search'><Search/></IconButton>
            }}
            />
            <Button  component={Link} variant='outline' to='trending'>Trending</Button>
            <Button  component={Link} variant='outline' to='homepage'>Notifications</Button>
            <Button  component={Link} variant='outline' onClick={handleToggleLogin}>{login}</Button>:
        </Grid2>
        {currentToken ?
             <Outlet/>:
             <h1>Loading...</h1>
        }
        <Fade in={displayAlert}>
            <Alert severity={type} sx={{ position: 'fixed', top: 0, right: 0, transform: 'translate(-50%, 50%)'}}>{ text }</Alert>
        </Fade>
       

       
    </main>
   ) 
}