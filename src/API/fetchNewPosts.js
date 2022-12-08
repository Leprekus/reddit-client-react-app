export default async function fetchNewPosts (token) {
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
    const params = new URLSearchParams({
        q: 'Nuclear Revenge'
    })
    const  res = await fetch(`https://oauth.reddit.com/.json?sort=new`, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${token}` ,
        },
    })

    return await res.json()
}