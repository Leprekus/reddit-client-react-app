import { Button } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
//http://localhost:3000/?state=null&code=rCEwwSadImR9asNhNzBdMcSixiS9HQ#_
export const Root = () => {
    return (
    <main>
        <h1>I am the root</h1>
        <nav >
            <Button  component={Link} variant='outline' data-testid='home-page-button' to='homepage'>Home Page</Button>
            <Button  component={Link} variant='outline' to='homepage'>Search</Button>
            <Button  component={Link} variant='outline' to='homepage'>Trending</Button>
            <Button  component={Link} variant='outline' to='homepage'>Notifications</Button>
            <Button  component={Link} variant='outline' to='homepage'>Profile</Button>
        </nav>
    </main>
   ) 
}