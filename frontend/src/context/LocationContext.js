import {createContext, useState} from 'react'

export const LocationContext = createContext();

export const LocationContextProvider = ({children}) => {

    const [location, setLocation] = useState('valor do context')

    return (
        <LocationContext.Provider value={{location, setLocation}}>
            {children}
        </LocationContext.Provider>
    )

}