import { useMemo, useState } from "react"

export const useFetchToken = (params) => {
    const [dependency, setDependency] = useState(params)
    const value = useMemo(() => {
        const output = {}
        //array of params
        dependency.forEach(param => (
            output[param] = new URL(window.location.href).searchParams.get(param.toString())
        ))
        return output
    }, [])


    return [value, setDependency]
}