import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    // Validação antes de enviar
    if (novaSenha !== confirmarNovaSenha) {
      setMensagem("As senhas novas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/usuarios/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senhaAtual, novaSenha }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Senha alterada com sucesso! Redirecionando para login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMensagem(data.msg || "Erro ao alterar a senha.");
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <form onSubmit={handleReset} className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow-xl space-y-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800">Alterar Senha</h1>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 text-gray-700 font-medium">Seu e-mail*</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          required
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="senhaAtual" className="mb-2 text-gray-700 font-medium">Senha atual*</label>
        <input
          type="password"
          id="senhaAtual"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
          placeholder="Digite sua senha atual"
          required
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="novaSenha" className="mb-2 text-gray-700 font-medium">Nova senha*</label>
        <input
          type="password"
          id="novaSenha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          placeholder="Digite a nova senha"
          required
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="confirmarNovaSenha" className="mb-2 text-gray-700 font-medium">Confirmar nova senha*</label>
        <input
          type="password"
          id="confirmarNovaSenha"
          value={confirmarNovaSenha}
          onChange={(e) => setConfirmarNovaSenha(e.target.value)}
          placeholder="Confirme a nova senha"
          required
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md"
      >
        Alterar senha
      </button>

      {mensagem && (
        <p className={`text-center mt-4 ${mensagem.includes("sucesso") ? "text-green-600" : "text-red-600"}`}>
          {mensagem}
        </p>
      )}
    </form>
  );
}

export default ResetPassword;
