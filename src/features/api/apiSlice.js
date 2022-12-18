import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../auth/authSlice';


export const redditApiGetAccessToken = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://www.reddit.com/api/v1/access_token',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if(token) { headers.set('authorization', `bearer ${token}`) }
            return headers
        }
    }),
})

// const redditApiWithReauth = async (args, api, extraOptions) => {
//     let result = await redditApi(args, api, extraOptions) 
//     if(result?.error?.originalStatus === 401) {
//         console.log('sending refresh token')
//         //get new access token
//         const refreshResult = await redditApi('endpoint', api, extraOptions)
//         console.log(refreshResult)
//         if(refreshResult?.data) {
//             const user = api.getState().auth.user
//             api.dispatch(setCredentials({ ...refreshResult.data, user }))
//             //retry original query 
//             result = await redditApi(args, api, extraOptions)
//         }
//     }
// }

export const apiSlice = createApi({
    redditApi: redditApiWithReauth, 
    endpoints: (builder) => ({
        getPostComments: builder.query({
            query: ({ subreddit, id }) => `r/${subreddit}/comments/${id}`,
        })
    })
})