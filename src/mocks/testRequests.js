import { Cookie } from '@mui/icons-material'
import { Button } from '@mui/material'
import { response } from 'msw'
import randomstring from 'randomstring'
import { useState, useEffect } from 'react'
export const TestComponent = ({ isDisplayed, searchTerm }) => {
    // var authorizationBasic = window.btoa(process.env.REACT_APP_REDDIT_ID + ':' + process.env.REACT_APP_REDDIT_SECRET);
    // const body = `grant_type=client_credentials`
    // var request = new XMLHttpRequest();
    // request.open('POST', 'https://www.reddit.com/api/v1/access_token', true);
    // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    // request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
    // request.setRequestHeader('Accept', 'application/json');
    // request.send(body);
    // request.onreadystatechange = function () {
    //     if (request.readyState === 4) {
    //         const response = JSON.parse(request.responseText)
    //         console.log(response)
    //         }
    //     };

    //-xNPzsaUWVD_hJAcT_wDVG1Yr851Law
    const fetchData = async () => {
        const homepage = '.json?sort=new'
        const response = await fetch(`https://oauth.reddit.com/${homepage}`, {
          method: 'GET',
          headers: {
              Authorization: `bearer -xNPzsaUWVD_hJAcT_wDVG1Yr851Law` ,
          },
      })
        const responseJSON = await response.json()
        const postsList = responseJSON.data.children.map(post => post.data)
        console.log(postsList)

    }
    fetchData()
    return (
        <main>
            <h1>Test Component</h1>
        </main>
    )
}
