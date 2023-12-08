import { createContext, useState } from 'react'

export const ControlContext = createContext()

export const ControlContextProvider = ({ children }) => {

    const [control, setControl] = useState(true)

    return (
        <ControlContext.Provider value={{ control, setControl }}>
            {children}
        </ControlContext.Provider>
    )

}