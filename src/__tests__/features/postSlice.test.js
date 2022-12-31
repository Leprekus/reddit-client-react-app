import { FundFilled } from '@ant-design/icons'
import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { store } from '../../app/store'
import postSlice, { postVote, selectPostsListStatus } from '../../features/post/postSlice'
import postSliceReducer, {
    fetchPosts, 
    fetchComments, 
    toggleDisplayComments
} from '../../features/post/postSlice'
import { redditPosts } from '../../mocks/responseData'
import { HomePage } from '../../routes/HomePage'
import { Root } from '../../routes/Root'

describe('postSlice reducer', () => {
    const initialState = {
        postsList: {},
        status: 'idle',
        commentStatus: 'idle',
        voteStatus: 'idle',
      }
      it('should handle initial state', () => {
        expect(postSliceReducer(undefined, { type: 'unknown' })).toEqual(initialState)
      })
      it('should render posts', async () => {
        render(      
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path ='/' element={<Root/>}/>
                        <Route path ='/' element={<HomePage/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>

        )
     
      })
    //   it('should render card actions', async () => {
    //     render(      
    //         <Provider store={store}>
    //             <MemoryRouter initialEntries={['/']}>
    //                 <Routes>
    //                     <Route path ='/' element={<Root/>}/>
    //                     <Route path ='/' element={<HomePage/>}/>
    //                 </Routes>
    //             </MemoryRouter>
    //         </Provider>

    //     )
    //     await waitFor(() => {
    //         const actual = postSliceReducer(initialState, fetchPosts(redditPosts))
    //         if(actual.status ==='fulfilled') {
    //             expect(screen.getByAriaLabel(/upvote/i)).toBeInTheDocument();
    //             expect(screen.getByAriaLabel(/downvote/i)).toBeInTheDocument();
    //             expect(screen.getByAriaLabel(/comments/i)).toBeInTheDocument();
    //         }
    //     })
    //   })
})