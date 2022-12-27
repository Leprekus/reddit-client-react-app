import { Post } from "../../components/Post";
import { Unstable_Grid2 as Grid2 } from "@mui/material";
import { CommentSection } from  '../../components/CommentSection'
import { useState } from "react";

export const RedditPostsList = ({ list }) => {
    //get object keys
    const [listKeys, setListKeys] = useState(Object.keys(list))
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
    const resetKeys = () => {
        const defaultKeys = Object.keys(list)
        setListKeys(defaultKeys)
    }
    const handleSelectFilter = ({ target }) => {
        if(target.style.color === 'rgb(255, 255, 255)') {
            //unselected filter
            target.style.color = target.style.borderColor
            target.style.backgroundColor = 'transparent'
            return false
            } 
        else {
            //selected filter
            target.style.backgroundColor = target.style.borderColor
            target.style.color = '#FFF'
            return true
            }
        }
    const handleSelectNewest = (e) => {
        handleSelectFilter(e)
        const newestKeys = listKeys.sort((a, b) => 
        list[a].postData.created - 
        list[b].postData.created
        )
        setListKeys(newestKeys)
    } 
    const handleSelectMostLiked = (e) => {
        handleSelectFilter(e)

    }
    const handleSelectAward = (e) => {
        handleSelectFilter(e)

    }
    const handleSelectFlaired = (e) => {
        handleSelectFilter(e)

    }
    const handleSelectVideos = (e) => {
        handleSelectFilter(e)

    }
    const handleSelectImages = (e) => {
        handleSelectFilter(e)

    }
    const selectTextPosts = () => {
        const textKeys = listKeys
        .filter(key => list[key].postData.selftext)
        
        return textKeys
    }
    const handleApplyFilter = (e, filter) => {
        const isSelected = handleSelectFilter(e)
        if(isSelected) {
            const newKeys = filter()
            setListKeys(newKeys)
        }
        else {
            resetKeys()
        }
    }
    return (
        <>
            <Grid2
            container
            alignContent={'center'}
            direction='column'
            padding='1.245rem'
            spacing={10}
            >
            <Grid2 container item wrap='wrap' margin='auto'>
                <span onClick={handleSelectNewest} className="hover" style={filterStyle('#05d7a0')}>newest</span>
                <span onClick={handleSelectMostLiked} className="hover" style={filterStyle('#f0466e')}>most liked</span>
                <span onClick={handleSelectAward} className="hover" style={filterStyle('#ffd264')}>awards</span>
                <span onClick={handleSelectFlaired} className="hover" style={filterStyle('#0f8cb4')}>flaired</span>
                <span onClick={handleSelectVideos} className="hover" style={filterStyle('#f5a05f')}>videos</span>
                <span onClick={handleSelectImages} className="hover" style={filterStyle('#6e5a7d')}>images</span>
                <span onClick={(e) => handleApplyFilter(e, selectTextPosts)} className="hover" style={filterStyle('#053c4b')}>text</span>
            </Grid2>
                {
                //iterate each key to get post object
                listKeys.map((id, index) => {
                    const data = list[id]
                    return (
                        <Grid2 key={index} item 
                        xs={12}
                        md={8} 
                        lg={6} 
                        xl={4}
                        margin='auto'
                        >
                        <Post
                        key={data.id}
                        data={data.postData}
                        />
                        {data.displayComments && 
                        <CommentSection
                        postId={data.id}
                        key={`${data.id}_comment-section`}/>
                        }
                        </Grid2>
        
                    )
                })
                }
            </Grid2>
        </>
    )
}
