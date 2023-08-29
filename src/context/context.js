import React, {useState} from 'react';

export const AppContext = React.createContext();

export const AppProvider = (props) => {
  const [appData, setAppData] = useState([]);
  return (
    <AppContext.Provider value={[appData, setAppData]}>
      {props.children}
    </AppContext.Provider>
  )
}