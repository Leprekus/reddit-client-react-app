import { Cookie } from '@mui/icons-material'
import { Button } from '@mui/material'
import { response } from 'msw'
import randomstring from 'randomstring'
import { useState, useEffect } from 'react'
export const TestRequests = ({ isDisplayed, searchTerm }) => {
    console.log(searchTerm)
    
    let 
    CLIENT_ID = process.env.REACT_APP_REDDIT_ID,
    CLIENT_SECRET = process.env.REACT_APP_REDDIT_SECRET,
    RESPONSE_TYPE = 'code', //code for implicit grant
    RANDOM_STRING = randomstring.generate(),
    URI = 'http://localhost:3000/',
    DURATION = 'permament',
    SCOPE_STRING = 'identity, edit, flair, history, modconfig, modflair, modlog, modposts, modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote, wikiedit, wikiread'
    
    const authEndpoint = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${URI}&duration=${DURATION}&scope=${SCOPE_STRING}`
    const [token, setToken] = useState(null)
    const [testEndpointResponse, setTestEndpointResponse] = useState('')
    const urlHasCode = (new URL(window.location.href)).searchParams.get('code')
    useEffect( () => {
        // authentication process: 
        // https://github.com/reddit-archive/reddit/wiki/OAuth2
        // localStorage.setItem('TEST', 'test value')

      if(localStorage.getItem('ACCESS_TOKEN') !== 'undefined') {
            setToken(localStorage.getItem('ACCESS_TOKEN'))
        }
      if(!token && urlHasCode) {
        console.log(urlHasCode)
        
        // var authorizationBasic = $.base64.btoa(clientId + ':' + clientSecret);
        var authorizationBasic = window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);
        
        var request = new XMLHttpRequest();
        request.open('POST', 'https://www.reddit.com/api/v1/access_token', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
        request.setRequestHeader('Accept', 'application/json');
        request.send(`grant_type=authorization_code&code=${urlHasCode}&redirect_uri=${URI}`);
        
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                const resObject = JSON.parse(request.responseText)
                console.log('response')
                console.log(resObject)
                console.log('access token')
                console.log(resObject.access_token)

               return resObject.access_token ? localStorage.setItem('ACCESS_TOKEN', resObject.access_token) : ''
            }
        };
    }
    }, [urlHasCode])

    console.log(authEndpoint)
    const handleLogin = () => {
        window.location.href = authEndpoint
    }
    const handleRequest = async () => {
        const params = new URLSearchParams({
            q : 'Nuclear Revenge'
        })
        const searchStr = 'https://oauth.reddit.com/subreddits/search?' + params
        console.log(searchStr)
        // const response = await fetch('https://oauth.reddit.com/subreddits/search' + params, {
        //     Authorization: `bearer ${token}`
        // })
        // console.log(await response.json())
        const request = new XMLHttpRequest();
        request.open('GET', 'https://oauth.reddit.com/subreddits/search/?' + params);
        request.setRequestHeader('Authorization', `bearer ${token}`)
        console.log(request)
        request.send();
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                const resObject = JSON.parse(request.responseText)
                console.log('response')
                console.log(resObject)
            }
        };
    }
    const handleTestEndpoint = async () => {
        const response = await fetch('https://httpbin.org/get')
        const data = await response.json()
        console.log(data)
        const origin = data.headers.Origin
        setTestEndpointResponse(origin)
    }
    return (
        <div className="dropdown-content" style={{display: isDisplayed}}>
            <p></p>
            {token ? (
            <>
            <p>Authorized</p>
            <Button variant='outlined' onClick={handleRequest}>Make Request</Button>
            </>
            ): <Button variant='contained' size='large' onClick={handleLogin}>Login</Button>}
            <p>{testEndpointResponse}</p>
            <Button onClick={handleTestEndpoint}>Test Endpoint</Button>
        </div>
    )
}
