import React, { useContext, createContext, useState } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // STATES
  const [selectedIncident, setSelectedIncident] = useState();
  const [selected, setSelected] = useState("Dashboard");
  const [properties, setProperties] = useState(null);
  const [docId, setDocId] = useState(null);

  return (
    <StateContext.Provider
      value={{
        selectedIncident,
        setSelectedIncident,
        selected,
        setSelected,
        properties,
        setProperties,
        docId,
        setDocId,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
