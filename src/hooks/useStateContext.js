import React, { createContext, useContext, useState, useEffect } from 'react'

export const stateContext = createContext();

const getFreshContext = () => {
    if (localStorage.getItem('context') === null)
        //Convert JavaScript value into JavaScript Object Notation (JSON) string.
        localStorage.setItem('context', JSON.stringify({
            participantId: 0,
            timeTaken: 0,
            selectedOptions: []
        }))
    //Convert JavaScript Object Notation (JSON) string into an Object.
    return JSON.parse(localStorage.getItem('context'))
}

export default function useStateContext() {
    const { context, setContext } = useContext(stateContext)
    return {
        context,
        setContext: obj => { 
            setContext({ ...context, ...obj }) },
        resetContext: ()=>{
            localStorage.removeItem('context')
            setContext(getFreshContext())
        }
    };
}

export function ContextProvider({ children }) {
    const [context, setContext] = useState(getFreshContext())

    useEffect(() => {
        localStorage.setItem('context', JSON.stringify(context))
    }, [context])

    return (
        <stateContext.Provider value={{ context, setContext }}>
            {children}
        </stateContext.Provider>
    )
}