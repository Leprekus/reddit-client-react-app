import { ArrowDownward, ArrowUpward, OpenInNew } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import { useSelector } from "react-redux"
import { selectCommentsListsStatus } from "../features/post/postSlice"

export const Comment = ({ data }) => {
    return (
        <Card aria-label='comment'>   
            <CardHeader
            title={data.author}
            titleTypographyProps={{ variant: 'p'}}
            />         
            <CardContent>
                <Typography>{ data.body }</Typography>
            </CardContent> 
            <CardActions>
                <IconButton><ArrowUpward/></IconButton>
                <IconButton><ArrowDownward/></IconButton>
            </CardActions>
        </Card>
    )
}