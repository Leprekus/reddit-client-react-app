import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { TestRequests } from "./TestRequests"

test('should find test endpoint button', () => {
    render(<TestRequests/>)
    expect(screen.getByText(/test endpoint/i)).toBeInTheDocument();
})
test('it makes a get request', async () => {
    render(<TestRequests/>)
    fireEvent.click(screen.getByText(/test endpoint/i))
    await waitFor(() => {
        expect(screen.getByText('http://localhost:3000')).toBeInTheDocument();
    })
})