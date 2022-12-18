import { useAuth } from "./useAuth"

export default async function useFetchData (parameters) {
    // const params = new URLSearchParams({
    //     q : 'Nuclear Revenge'
    // })
    // const searchStr = 'https://oauth.reddit.com/subreddits/search?' + params
    // console.log(searchStr)
    // const response = await fetch('https://oauth.reddit.com/subreddits/search' + params, {
    //     Authorization: `bearer ${token}`
    // })
    // console.log(await response.json())
    // const request = new XMLHttpRequest();
    // request.open('GET', 'https://oauth.reddit.com/subreddits/search/?' + params);
    // request.setRequestHeader('Authorization', `bearer ${token}`)
    // request.send();
    // request.onreadystatechange = function () {
    //     if (request.readyState === 4) {
    //         const resObject = JSON.parse(request.responseText)
    //         console.log('response')
    //         console.log(resObject)
    //     }
    // };
    const { token } = useAuth()
    const  res = await fetch(`https://oauth.reddit.com/${parameters}`, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${token.access_token}` ,
        },
    })

    return await res.json()
}