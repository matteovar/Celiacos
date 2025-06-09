import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [nome, setName] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate(); // <-- import e uso do useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(
        "http://124.81.96.70:9090/api/usuarios/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMensagem("Usuário criado com sucesso!");
        setTimeout(() => {
          navigate("/login");
        }, 3000); // 3000 ms = 3 segundos
        setEmail("");
        setName("");
        setSenha("");
        setConfirmarSenha("");
      } else {
        setMensagem(data.msg || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-xl space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Faça o seu cadastro
        </h1>

        <div className="flex flex-col">
          <label htmlFor="nome" className="mb-2 text-gray-700 font-medium">
            Seu nome*
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Digite seu nome"
            required
          />
        </div>

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
          <label htmlFor="senha" className="mb-2 text-gray-700 font-medium">
            Sua senha*
          </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="confirmarSenha"
            className="mb-2 text-gray-700 font-medium"
          >
            Confirme sua senha*
          </label>
          <input
            type="password"
            id="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Confirme sua senha"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#8B0000] via-[#C0392B] to-[#E74C3C] text-white font-semibold py-3 rounded-md shadow-md transition hover:opacity-90"
        >
          Cadastrar
        </button>

        {mensagem && (
          <p
            className={`text-center font-medium ${
              mensagem.includes("sucesso") ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensagem}
          </p>
        )}

        <div>
          <p className="text-center text-gray-600">
            Já tem uma conta?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Register;
