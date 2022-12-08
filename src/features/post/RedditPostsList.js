import { Post } from "../../components/Post";
export const RedditPostsList = () => {
    
    const postsList = [];
    return (
        <>
        {
            postsList.length > 0 ? postsList.map(data => {
                return <Post data={data}/>
            }) :
            <p>Couldn't fetch posts</p>
        }
        </>
    )
}
