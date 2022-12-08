import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../app/store"
import { Post } from "../../components/Post"
import { redditPosts } from "../../mocks/responseData"

describe('Reddit Post', () => {
    it('should render post', () => {
        render(
        <Provider store={store}>
            <Post data={redditPosts[0]}/>
        </Provider>)
        expect(screen.getByText(/i am the post/i)).toBeInTheDocument();
    })
    it('should display loading state', () => {})
})