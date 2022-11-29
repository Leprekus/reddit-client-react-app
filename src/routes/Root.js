import { Link, Outlet } from "react-router-dom"

export const Root = () => {
    <>
        <h1>I am the root</h1>
        <Link to='homePage'></Link>
        <div>
            <Outlet/>
        </div>
    </>
}