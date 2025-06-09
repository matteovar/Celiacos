import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  // Se já estiver logado, redireciona
  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://124.81.96.70/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setMensagem("Login feito com sucesso!");
        localStorage.setItem("token", data.token);

        // Buscar os dados do usuário após login
        const userRes = await fetch("http://124.81.96.70/api/usuarios/me", {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        });

        const userData = await userRes.json();

        if (userRes.ok && userData.nome) {
          setUser(userData); // atualiza o contexto
          navigate("/", { replace: true }); // redireciona
        } else {
          setMensagem("Erro ao buscar dados do usuário.");
        }
      } else {
        setMensagem(data.msg || "Erro ao fazer login.");
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-xl space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Faça o seu login
        </h1>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-gray-700 font-medium">
            Seu e-mail*
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Digite seu e-mail"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-gray-700 font-medium">
            Sua senha*
          </label>
          <input
            type="password"
            id="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Digite sua senha"
            required
          />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/reset-password");
            }}
            className="text-indigo-600 hover:underline mt-2 text-sm self-end"
          >
            Esqueci minha senha
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#8B0000] via-[#C0392B] to-[#E74C3C] text-white font-semibold py-3 rounded-md shadow-md transition hover:opacity-90"
        >
          Entrar
        </button>

        {mensagem && (
          <p
            className={`text-center font-medium ${mensagem.includes("sucesso") ? "text-green-600" : "text-red-600"
              }`}
          >
            {mensagem}
          </p>
        )}

        <div>
          <p className="text-center text-gray-600">
            Não tem uma conta?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Registre-se
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Login;
