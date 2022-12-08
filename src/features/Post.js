import { Box, Button } from "@mui/material"

export const Post = () => {
    return (
        <>
        <h1>I am the post</h1>
        <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
    
        <Button>Some text</Button>
    </Box>
        </>
    )
}