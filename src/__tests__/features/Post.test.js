import { render, screen } from "@testing-library/react"
import { Post } from "../../components/Post"

describe('Reddit Post', () => {
    it('should render post', () => {
        render(<Post/>)
        expect(screen.getByText(/i am the post/i)).toBeInTheDocument();
    })
    it('should display loading state', () => {})
})