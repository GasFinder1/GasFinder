import { createContext, useState } from 'react'

export const DistanceContext = createContext()

export const DistanceContextProvider = ({ children }) => {

    const [distance, setDistance] = useState(5)

    return (
        <DistanceContext.Provider value={{ distance, setDistance }}>
            {children}
        </DistanceContext.Provider>
    )

}