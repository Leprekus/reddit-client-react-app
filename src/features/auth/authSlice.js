import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
    randomString: localStorage.getItem('randomString'),
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user'),
}

const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        setCredentials: (state, { payload }) => {
            const token = JSON.stringify(payload)
            localStorage.setItem('token', token)
            state.token = token
        },
        setUser:(state, { payload }) => {
            const user = JSON.stringify(payload)
            localStorage.setItem('user', user)
            state.user = user
        },
        setRandomString: (state, { payload }) => {
            const randomString = JSON.stringify(payload)
            localStorage.setItem('randomString', randomString)
            state.randomString = randomString
        },
        logout: (state) => {
            localStorage.clear()
            state.auth.token = localStorage.setItem('token', null)
        }
    }
})


export const { setCredentials, setUser, setRandomString, logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentRandomString = (state) => state.auth.randomString
export const selectCurrentToken = (state) => JSON.parse(state.auth.token)
export const fetchToken = (code) => (dispatch, getState) => {
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
            return response.access_token ? dispatch(setCredentials(response)) : ''
            }
        };

}
export const fetchClientToken = (userAuth=false, code) => (dispatch, getState) => {
    var authorizationBasic = window.btoa(process.env.REACT_APP_REDDIT_ID + ':' + process.env.REACT_APP_REDDIT_SECRET);
    const body = userAuth === true ? 
    `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REACT_APP_URI}` :
    `grant_type=client_credentials`
    console.log('body')
    console.log(body)
    var request = new XMLHttpRequest();
    request.open('POST', 'https://www.reddit.com/api/v1/access_token', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
    request.setRequestHeader('Accept', 'application/json');
    request.send(body);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            const response = JSON.parse(request.responseText)
            const date = new Date()
            response.expires_in = date.setSeconds(date.getSeconds() + response.expires_in)
            return response.access_token ? dispatch(setCredentials(response)) : ''
            }     
        if(userAuth) {
            dispatch(setUser(true))
        }
    };
} 
export default authSlice.reducer