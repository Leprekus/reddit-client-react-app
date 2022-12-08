import { Box, Button, Paper } from "@mui/material"
import { useDispatch } from "react-redux"

export const Post = () => {
  const dispatch = useDispatch()
    return (
        <>
        <h1>I am the post</h1>
        <Paper
      sx={{
        width: 300,
        height: 300,
      }}
    >
    
        <Button>Some text</Button>
    </Paper>
        </>
    )
}