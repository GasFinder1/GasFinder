import {createContext, useState} from 'react'

export const LocationContext = createContext();

export const LocationContextProvider = ({children}) => {

    const [location, setLocation] = useState({
        latitude: -23.5554093,
        longitude:-46.7381878,
    })

    return (
        <LocationContext.Provider value={{location, setLocation}}>
            {children}
        </LocationContext.Provider>
    )

}