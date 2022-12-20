import { useSelector } from "react-redux"
import { selectCommentsLists, selectCommentsListsStatus, selectPostsLists } from "../features/post/postSlice"

export const Comments = ({ postId }) => {
    const commentsList = useSelector(selectPostsLists)[postId].comments
    console.log(commentsList)
    const commentStatus = useSelector(selectCommentsListsStatus)
    return (
    <div>
        {
            commentStatus === 'loading' && 
            <p>Loading...</p>
        }
        {
            commentStatus === 'fulfilled' &&
            commentsList.map(data => 
                console.log(data)
                )
        }
    </div>
    )
}
