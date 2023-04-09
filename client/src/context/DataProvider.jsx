
import { useState } from 'react'
import {createContext} from 'react'

export const DataContext = createContext(null)
function DataProvider({children}) {
    const [account,setAccount]=useState({username:'',name:''})
  return (
    <DataContext.Provider value={{account,setAccount}}>
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider

