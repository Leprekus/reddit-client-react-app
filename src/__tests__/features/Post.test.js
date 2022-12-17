import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { store } from "../../app/store"
import { Post } from "../../components/Post"
import { redditPosts } from "../../mocks/responseData"

describe('Reddit Post', () => {
    it('should render post', () => {
        render(
        <MemoryRouter>
            <Provider store={store}>
                <Post data={redditPosts[0]}/>
            </Provider>
        </MemoryRouter>
        )
        expect(screen.getByText(/I made it out of the other level….Please tell me I’m safe now./i)).toBeInTheDocument();
    })
    it('should render post buttons', () => {
        render(
        <MemoryRouter>
            <Provider store={store}>
                <Post data={redditPosts[7]}/>
            </Provider>
        </MemoryRouter>
        )
        expect(screen.getByLabelText(/upvote/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/downvote/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/comments/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/show more/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/subreddit/i)).toBeInTheDocument();
    })
    it('should display comments', () => {
        render (
        <MemoryRouter>
            <Provider store={store}>
                <Post data={redditPosts[7]}/>
            </Provider>
        </MemoryRouter>

        )
        fireEvent.click(screen.getByLabelText(/comments/i));
        expect(screen.getByText(/comments component/i)).toBeInTheDocument();
    })
    it('should display loading state', () => {})
})