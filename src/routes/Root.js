import { Button } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useNavigate, useParams } from "react-router-dom"
//http://localhost:3000/?state=null&code=rCEwwSadImR9asNhNzBdMcSixiS9HQ#_
export const Root = () => {
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