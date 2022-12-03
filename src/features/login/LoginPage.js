import { Button } from "@mui/material"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export const LoginPage = () => {
    const { login, user } = useAuth()
    if(user) return <Navigate to='/homePage'/>
    const handleLogin = () => {
        login({ name: 'leprekus' })
    }
    return (
        <div>
            <Button onClick={handleLogin} variant="contained">Set User</Button>
        </div>
    )
}