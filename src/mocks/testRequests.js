import randomstring from 'randomstring'
import { useState, useEffect } from 'react'
export const Dropdown = ({ isDisplayed, searchTerm }) => {
    console.log(searchTerm)
    
    const secret = process.env.REACT_APP_REDDIT_SECRET
    let 
    CLIENT_ID = 'qjuHHDbFqllu2b76JMYmGQ',
    RESPONSE_TYPE = 'code', //code for implicit grant
    RANDOM_STRING = randomstring.generate,
    URI = 'http://localhost:3000/',
    DURATION = 'temporary',
    SCOPE_STRING = 'identity, edit, flair, history, modconfig, modflair, modlog, modposts, modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote, wikiedit, wikiread'
    
    const authEndpoint = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING()}&redirect_uri=${URI}&duration=${DURATION}&scope=${SCOPE_STRING}`
    const urlHasCode = (new URL(window.location.href)).searchParams.get('code')
    const [token, setToken] = useState(null)
    useEffect( () => {
        if(!urlHasCode) {window.open(authEndpoint)}
      else{
        const options = {
            method: 'POST',
            body : `grant_type=authorization_code&code=${urlHasCode}&redirect_uri=${URI}`
            
        }
        fetch('https://www.reddit.com/api/v1/access_token', options).then(res => res.json()).then(data => console.log(data))
    }

      
    }, [])
    http://localhost:3000/?state=Ndk8emh09TztDEankWSR035PQyd2C2wm&code=Sr0gDnpAkLOv4aOuliFRlVWKyHK5ug#_
    console.log(authEndpoint)
    return (
        <div className="dropdown-content" style={{display: isDisplayed}}>
            <p>hello world</p>
        </div>
    )
}
