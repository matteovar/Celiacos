import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Receitas from "./components/Receitas";
import Locais from "./components/Locais";
import ReceitaDetalhe from "./components/ReceitaDetalhe";
import Formulario from "./components/Formulario";
import Login from "./components/Login";
import Register from "./components/Register";
import { ReceitasProvider } from "./components/ReceitasContext";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import EditarReceita from "./components/EditarReceita";
import Conta_usuario from "./components/Conta_usuario";
import EditarConta from "./components/EditarConta";
import ResetPassword from "./components/ResetPassword";


function App() {
  return (
    <ReceitasProvider>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            {/* Páginas públicas */}
            <Route path="/" element={<Body />} />
            <Route path="/receitas" element={<Receitas />} />
            <Route path="/receitas/:slug" element={<ReceitaDetalhe />} />
            <Route path="/locais" element={<Locais />} />

            {/* Autenticação */}
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/editar/:slug"
              element={
                <PrivateRoute>
                  <EditarReceita />
                </PrivateRoute>
              }
            />

            {/* Apenas usuários logados podem acessar */}
            <Route
              path="/formulario"
              element={
                <PrivateRoute>
                  <Formulario />
                </PrivateRoute>
              }
            />

            <Route
              path="/conta_usuario"
              element={
                <PrivateRoute>
                  <Conta_usuario />
                </PrivateRoute>
              }
            />
            <Route
              path="/editar-conta"
              element={
                <PrivateRoute>
                  <EditarConta />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ReceitasProvider>
  );
}

export default App;
