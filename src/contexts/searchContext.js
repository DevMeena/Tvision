import React, { createContext, useContext, useState } from "react";
export const SearchContext = createContext("yo");

// const SearchContext = React.createContext()

// export function useSearch() {
//     return useContext(SearchContext)
// }

// export function SearchProvider({children}) {
//     const [searchText, setSearchText] = useState('')

//     return (
//         <SearchContext.Provider value={searchText}>
//             {children}
//         </SearchContext.Provider>
//     )

// }