import { Post } from "../../components/Post";
import { Unstable_Grid2 as Grid2 } from "@mui/material";
import { CommentSection } from  '../../components/CommentSection'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./postSlice";

export const RedditPostsList = ({ list }) => {
    const dispatch = useDispatch()
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
    console.log(list)
    const resetKeys = () => {
        const defaultKeys = Object.keys(list)
        setListKeys(defaultKeys)
    }
    const toggleFilter = ({ target }) => {
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
    const selectMostLikedPosts = (e) => {
        const ups = listKeys.map(key => list[key].postData.ups)
        //spread operator creates shallow copy to trigger rerender, otherwise component does not update
        const mostLikedPosts = [...listKeys].sort((a, b) => ups[listKeys.indexOf(a)] > ups[listKeys.indexOf(b)] ? -1 : 1);
        return mostLikedPosts
    }
    const selectLinkPosts = (e) => {
        const linkPosts = listKeys
        .filter(key => list[key].postData.post_hint === 'link')
        return linkPosts

    } 
    const selectAwardedPosts = (e) => {
        const awardedPosts = listKeys
        .filter(key => list[key].postData.all_awardings.length > 0)
                       
        return awardedPosts

    }
    const selectFlairedPosts = (e) => {
        
    }
    const selectVideoPosts = (e) => {
        const videoPosts = listKeys
        .filter(key => list[key].postData.is_video)
        return videoPosts

    }
    const selectImagePosts = (e) => {
        const imageKeys = listKeys
        .filter(key => list[key].postData.post_hint === 'image' ||
                       list[key].postData.media_metadata)
                       
        return imageKeys

    }
    const selectTextPosts = () => {
        const textKeys = listKeys
        .filter(key => list[key].postData.selftext)
        return textKeys
    }
    const handleApplyFilter = (e, filter) => {
        const filterIsSelected = toggleFilter(e)
        if(filterIsSelected) {
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
                <span test-label-id='most-liked-filter' onClick={(e) => handleApplyFilter(e, selectMostLikedPosts)} className="hover" style={filterStyle('#f0466e')}>most liked</span>
                <span test-label-id='awards-filter' onClick={(e) => handleApplyFilter(e, selectAwardedPosts)} className="hover" style={filterStyle('#ffd264')}>awards</span>
                <span test-label-id='flaired-filter' onClick={(e) => handleApplyFilter(e, selectFlairedPosts)} className="hover" style={filterStyle('#0f8cb4')}>flaired</span>
                <span test-label-id='links-filter' onClick={(e) => handleApplyFilter(e, selectLinkPosts)} className="hover" style={filterStyle('#05d7a0')}>links</span>
                <span test-label-id='videos-filter' onClick={(e) => handleApplyFilter(e, selectVideoPosts)} className="hover" style={filterStyle('#f5a05f')}>videos</span>
                <span test-label-id='images-filter' onClick={(e) => handleApplyFilter(e, selectImagePosts)} className="hover" style={filterStyle('#6e5a7d')}>images</span>
                <span test-label-id='text-filter' onClick={(e) => handleApplyFilter(e, selectTextPosts)} className="hover" style={filterStyle('#053c4b')}>text</span>
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
