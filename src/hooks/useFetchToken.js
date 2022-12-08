import { useMemo } from "react";
import setTokenExpiration from "../utils/setTokenExpiration";
import { useAuth } from "./useAuth";
export const useFetchToken = () => {    
    const { randString } = useAuth()
    const { token } = useAuth()
    const { login } = useAuth()
    const code = (new URL(window.location.href)).searchParams.get('code')
    //checks if url state matches with RANDOM_STRING stored in localStorage
    //and if it contains a code to retrieve access token
    const urlContainsCode = 
    randString === (new URL(window.location.href)).searchParams.get('state')
     &&
    code ? true : false
    useMemo(() => {
      if(token === null && urlContainsCode) {
         var authorizationBasic = window.btoa(process.env.REACT_APP_REDDIT_ID + ':' + process.env.REACT_APP_REDDIT_SECRET);
        var request = new XMLHttpRequest();
        request.open('POST', 'https://www.reddit.com/api/v1/access_token', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
        request.setRequestHeader('Accept', 'application/json');
        request.send(`grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REACT_APP_URI}`);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                const response = JSON.parse(request.responseText)
                const date = new Date();
                const expirationDate = date.setMinutes(date.getMinutes() + 86000);
                const access_token_object = {
                    ...response,
                    isNotExpired: Date.now() < expirationDate,
                }
                console.log(access_token_object)
                return access_token_object ? login(access_token_object) : ''
                }
            };
    }
    }, [urlContainsCode])
    return token
}