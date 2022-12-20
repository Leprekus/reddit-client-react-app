import { Button, IconButton, Input, InputAdornment, TextField } from "@mui/material"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { logout, selectCurrentToken, fetchClientToken } from "../features/auth/authSlice"
import { Unstable_Grid2 as Grid2 } from "@mui/material";
import { Search } from "@mui/icons-material"

export const Root = () => {
    const dispatch = useDispatch()
    const currentToken = useSelector(selectCurrentToken)
    const [login, setLogin] = useState(() => {
        return !currentToken ? 'Login' : 'Logout'
    })
    useMemo(() => {
        if(!currentToken){ 
            dispatch(fetchClientToken()) 
        }
    }, [])
    
    const handleToggleLogin = () => {
        if(login === 'Login') setLogin('Logout')
        if(login === 'Logout') {
            setLogin('Login')
            dispatch(logout())
        }
    }
    return (
    <main>
        <h1>I am the root</h1>
        <Grid2 container spacing={4} justifySelf='center'>
            <Button  component={Link} variant='outline' data-testid='home-page-button' to='homepage'>Home Page</Button>
            <TextField 
            placeholder="Search"
            InputProps={{
                endAdornment: <IconButton><Search/></IconButton>
            }}
            />
            <Button  component={Link} variant='outline' to='homepage'>Trending</Button>
            <Button  component={Link} variant='outline' to='homepage'>Notifications</Button>
            <Button  component={Link} variant='outline' to={login === 'Login' ? '/login' : ''} onClick={handleToggleLogin}>{login}</Button>:
        </Grid2>
        {currentToken ?
             <Outlet/>:
             <h1>Loading...</h1>
        }
       
    </main>
   ) 
}