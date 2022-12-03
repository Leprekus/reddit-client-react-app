import { Button } from "@mui/material"
import { useAuth } from "../../hooks/useAuth"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import randomstring from "randomstring"

export const LoginPage = () => {
    const { login, user } = useAuth()
    const [randString, setRandString] = useLocalStorage('RANDOM_STRING', randomstring.generate())
    const handleLogin = () => {
        const authEndpoint = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_ID}&response_type=code&state=${randString}&redirect_uri=${process.env.REACT_APP_URI}&duration=permanent&scope=${process.env.REACT_APP_SCOPE_STRING}`
        window.location.href = authEndpoint
        login({ authenticated: true })
    }
    return ( 
        <div>
            <Button onClick={handleLogin} variant="contained">Login</Button>
        </div>
    )
}