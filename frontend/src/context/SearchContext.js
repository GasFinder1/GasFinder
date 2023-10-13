import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {

    const [search, setSearch] = useState(5)

    return (
        <SearchContextProvider.Provider value={{ search, setSearch }}>
            {children}
        </SearchContextProvider.Provider>
    )

}