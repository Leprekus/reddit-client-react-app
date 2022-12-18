import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    randomString: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        setCredentials: (state, { payload }) => {
            const { accessToken } = payload[0]
            state.token = accessToken
        },
        setRandomString: (state, { payload }) => {
            state.randomString = payload
        },
        logout: (state) => {
            state.token = null
        }
    }
})


export const { setCredentials, setRandomString, logout } = authSlice.actions; 
export const selectCurrentRandomString = (state) => state.auth.randomString
export const selectCurrentToken = (state) => state.auth.token
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
            const token = JSON.parse(request.responseText)
            return token.accessToken ? (  
            localStorage.setItem('token', JSON.stringify(token)),
            dispatch(setCredentials(token))
            ): ''
            }
        };

} 
export default authSlice.reducer