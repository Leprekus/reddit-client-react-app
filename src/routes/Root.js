import { Button, IconButton, Input, InputAdornment, TextField } from "@mui/material"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { logout, selectCurrentToken, fetchClientToken, selectCurrentUser } from "../features/auth/authSlice"
import { Unstable_Grid2 as Grid2 } from "@mui/material";
import { Search } from "@mui/icons-material"
import { fetchPosts } from "../features/post/postSlice"

export const Root = () => {
    const dispatch = useDispatch()
    const currentToken = useSelector(selectCurrentToken)
    const currentUser = useSelector(selectCurrentUser)
    const [searchField, setSearchField] = useState('')
    const [login, setLogin] = useState(() => {
        return !currentUser ? 'Login' : 'Logout'
    })
    useMemo(() => {
        if(!currentToken){ 
            dispatch(fetchClientToken()) 
        }
        if(currentToken.expires_in < Date.now()) {
            dispatch(fetchClientToken())
        }
    }, [])
    
    const handleToggleLogin = () => {
        if(login === 'Login') {
            setLogin('Logout')
            
        }
        if(login === 'Logout') {
            setLogin('Login')
            dispatch(logout())
        }
    }
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
            <Button variant='outline' onClick={handleToggleLogin}>{login}</Button>:
        </Grid2>
        {currentToken ?
             <Outlet/>:
             <h1>Loading...</h1>
        }
       
    </main>
   ) 
}