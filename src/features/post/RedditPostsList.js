import { Post } from "../../components/Post";
import { Unstable_Grid2 as Grid2 } from "@mui/material";
import { useSelector } from "react-redux";
import { selectPostsLists, selectPostsListStatus } from "./postSlice";


export const RedditPostsList = () => {
    const postsListStatus = useSelector(selectPostsListStatus)
    const postsLists = useSelector(selectPostsLists) || []


    const filterStyle = (color) => {
        return {
            ':hover': {
                cursor: 'pointer'
            },
            border: `${color} 2.5px solid`,
            color: `${color}`,
            fontWeight: 'bold',
            borderRadius: '15px',
            margin: '0.345rem ',
            padding: '0 0.8rem 0.2rem 0.8rem',
            
          }
    }
    const handleSelectFilter = ({ target }) => {
        if(target.style.color === 'rgb(255, 255, 255)') {
            return (
                target.style.color = target.style.borderColor,
                target.style.backgroundColor = 'transparent'
            )
        }
        return (
            target.style.backgroundColor = target.style.borderColor, 
            target.style.color = '#FFF'
        )
    }
    return (
        <>
        {
            postsListStatus === 'loading' &&
            <p>Loading...</p>
        }
         
        {
            postsListStatus === 'fulfilled' && 
            <Grid2
            container
            alignContent={'center'}
            direction='column'
            padding='1.245rem'
            spacing={10}
            >
            <Grid2 container item wrap='wrap' margin='auto'>
                <span onClick={handleSelectFilter} className="hover" style={filterStyle('#05d7a0')}>newest</span>
                <span onClick={handleSelectFilter} className="hover" style={filterStyle('#f0466e')}>most liked</span>
                <span onClick={handleSelectFilter} className="hover" style={filterStyle('#ffd264')}>awards</span>
                <span onClick={handleSelectFilter} className="hover" style={filterStyle('#0f8cb4')}>flaired</span>
                <span onClick={handleSelectFilter} className="hover" style={filterStyle('#f5a05f')}>videos</span>
                <span onClick={handleSelectFilter} className="hover" style={filterStyle('#6e5a7d')}>images</span>
                <span onClick={handleSelectFilter} className="hover" style={filterStyle('#053c4b')}>text</span>
            </Grid2>
                {
                postsLists.map((data, index) =>
                <Grid2 key={index} item 
                xs={12}
                md={8} 
                lg={6} 
                xl={4}
                margin='auto'
                >
                <Post
                key={data.id}
                data={data}/>
                {/* {displayComments && 
                <Comments
                key={`${data.id}_comment-section`}/>
                } */}
                </Grid2>
                )
                }
            </Grid2>
        }
        
        {
            postsListStatus === 'rejected' && 
            <p>Error</p>
        }

        </>
    )
}
