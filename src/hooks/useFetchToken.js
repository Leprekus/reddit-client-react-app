import { useEffect, useMemo, useState } from "react"

export const useFetchToken = (params) => {
    const options = {}
    params.forEach(param => ({
        [param]: new URL(window.location.href).searchParams.get(param.toString())
    }))
    const itemIsUndfined = Object.values(options).some(item => {
        if(!item) return true
    })
    function fetchToken() {
        const code = '' 
    }
    useMemo(() => {
        fetchToken()

        //if no item is undefined fetchToken() is invoked
    }, [!itemIsUndfined])
}