import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Hook personalizado para acessar o contexto
export const useAuth = () => useContext(AuthContext);

// Componente Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // enquanto busca /me

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://124.81.96.70:9090/api/usuarios/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.email) {
            setUser(data);
          } else {
            localStorage.removeItem("token");
            setUser(null);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  // Exibe uma tela simples enquanto está verificando o login
  if (loading) return <div className="text-center mt-10">Carregando...</div>;

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
