export default async function fetchCommentSection (id) {
    const getToken = JSON.parse(localStorage.getItem('token'))
    const token = getToken.access_token
    console.log(token)
    const parameters = `r/OldSchoolCool/comments/${id}`
    const  res = await fetch(`https://oauth.reddit.com/${parameters}`, {
        method: 'GET',
        headers: {
            Authorization: `bearer ${token}` ,
        },
    })
    return await res.json()
}