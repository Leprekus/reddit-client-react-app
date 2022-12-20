import { Button } from "@mui/material"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, Outlet } from "react-router-dom"
import { logout, selectCurrentToken, fetchClientToken } from "../features/auth/authSlice"
import { fetchPosts } from "../features/post/postSlice";

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
        <nav >
            <Button  component={Link} variant='outline' data-testid='home-page-button' to='homepage'>Home Page</Button>
            <Button  component={Link} variant='outline' to='homepage'>Search</Button>
            <Button  component={Link} variant='outline' to='homepage'>Trending</Button>
            <Button  component={Link} variant='outline' to='homepage'>Notifications</Button>
            <Button  component={Link} variant='outline' to={login === 'Login' ? '/login' : ''} onClick={handleToggleLogin}>{login}</Button>:
        </nav>
        {currentToken ?
             <Outlet/>:
             <h1>Loading...</h1>
        }
       
    </main>
   ) 
}