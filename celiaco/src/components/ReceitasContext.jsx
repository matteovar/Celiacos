import React, { createContext, useContext, useState } from "react";

const ReceitasContext = createContext();

export const useReceitas = () => useContext(ReceitasContext);

export const ReceitasProvider = ({ children }) => {
  const [receitas, setReceitas] = useState([]);

  const addReceita = (receita) => setReceitas((prev) => [receita, ...prev]);

  return (
    <ReceitasContext.Provider value={{ receitas, addReceita }}>
      {children}
    </ReceitasContext.Provider>
  );
};