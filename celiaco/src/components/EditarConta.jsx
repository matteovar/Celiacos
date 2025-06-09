import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const EditarConta = () => {
  const { user } = useAuth();
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/usuarios/atualizar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ nome, email }),
    });

    const data = await res.json();
    if (res.ok) {
      setMensagem("Conta atualizada com sucesso.");
    } else {
      setMensagem(data.msg || "Erro ao atualizar.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-6 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold">Editar Conta</h2>

      <div>
        <label>Nome:</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Salvar Alterações
      </button>

      {mensagem && <p className="mt-2 text-center">{mensagem}</p>}
    </form>
  );
};

export default EditarConta;
