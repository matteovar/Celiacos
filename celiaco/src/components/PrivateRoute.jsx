import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Tempo para verificar o token
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>; // Ou um spinner de carregamento
  }

  return user ? children : <Navigate to="/login" replace />;
};
export default PrivateRoute;
