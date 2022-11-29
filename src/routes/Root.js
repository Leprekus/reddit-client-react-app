import { Button } from "@mui/material"
import { Link, Outlet } from "react-router-dom"

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