export default async function fetchToken (CLIENT_ID, CLIENT_SECRET, CODE, URI) {
    var authorizationBasic = window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);
        
    var request = new XMLHttpRequest();
    request.open('POST', 'https://www.reddit.com/api/v1/access_token', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
    request.setRequestHeader('Accept', 'application/json');
    request.send(`grant_type=authorization_code&code=${CODE}&redirect_uri=${URI}`);
    
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            const resObject = JSON.parse(request.responseText)
            console.log(resObject)
           return resObject.access_token ? localStorage.setItem('ACCESS_TOKEN', resObject.access_token) : ''
        }
    };

}