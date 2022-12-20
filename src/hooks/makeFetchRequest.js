import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"

export default async function makeFetchRequest (token, parameters) {
    const  res = await fetch(`https://oauth.reddit.com/${parameters}`, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${token.access_token}` ,
        },
    })

    return await res.json()
}