import { Button } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import { logout, selectCurrentToken } from "../features/auth/authSlice"
export const Root = () => {
    const dispatch = useDispatch()
    const currentToken = useSelector(selectCurrentToken)
    const [login, setLogin] = useState(() => {
        return !currentToken ? 'Login' : 'Logout'
    })
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
        <Outlet/>
    </main>
   ) 
}