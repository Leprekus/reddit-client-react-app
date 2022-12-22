import { useSelector } from "react-redux"
import { Post } from "../components/Post"
import { selectSearchResultStatus, selectSearchResults } from "../features/post/postSlice"

export const Search = () => {
    const searchResultStatus = useSelector(selectSearchResultStatus)
    const searchResults = useSelector(selectSearchResults)
    console.log(searchResults)
    return (
        <>
        {
            searchResultStatus === 'loading' && 
            <p>Loading...</p>
        }
        {
            searchResultStatus === 'fulfilled' &&
            searchResults.map(result => (
                <Post id={result.id} data={result}/>
            ))
        }
        </>
    )
}