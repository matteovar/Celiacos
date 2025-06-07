import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditarReceita = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [receita, setReceita] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [imagemPreview, setImagemPreview] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/receitas/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setReceita(data);
        setImagemPreview(data.image || "");
      })
      .catch(() => setMensagem("Erro ao carregar receita."));
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceita((prev) => ({ ...prev, [name]: value }));
  };

  const handleListChange = (e, campo) => {
    const lista = e.target.value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    setReceita((prev) => ({ ...prev, [campo]: lista }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:5000/api/receitas/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      setImagemPreview(data.url);
      setReceita((prev) => ({ ...prev, image: data.url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch(`http://127.0.0.1:5000/api/receitas/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(receita),
    });

    const data = await res.json();
    if (res.ok) {
      setMensagem("Receita atualizada com sucesso!");
      setTimeout(() => navigate(`/receitas/${slug}`), 1500);
    } else {
      setMensagem(data.msg || "Erro ao atualizar receita.");
    }
  };

  if (!receita)
    return <p className="text-center mt-10">Carregando receita...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-3xl font-bold text-center">Editar Receita</h2>

      <div>
        <label className="block font-medium">Nome/Título:</label>
        <input
          type="text"
          name="nome"
          value={receita.nome || ""}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Descrição:</label>
        <textarea
          name="descricao"
          value={receita.descricao || ""}
          onChange={handleChange}
          rows="3"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Categoria:</label>
        <input
          type="text"
          name="categoria"
          value={receita.categoria || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Ingredientes (1 por linha):</label>
        <textarea
          name="ingredientes"
          value={(receita.ingredientes || []).join("\n")}
          onChange={(e) => handleListChange(e, "ingredientes")}
          rows="5"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">
          Preparo (1 passo por linha):
        </label>
        <textarea
          name="preparo"
          value={(receita.preparo || []).join("\n")}
          onChange={(e) => handleListChange(e, "preparo")}
          rows="5"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Utensílios (1 por linha):</label>
        <textarea
          name="utensilios"
          value={(receita.utensilios || []).join("\n")}
          onChange={(e) => handleListChange(e, "utensilios")}
          rows="3"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Imagem:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full"
        />
        {imagemPreview && (
          <img
            src={imagemPreview}
            alt="Pré-visualização"
            className="mt-2 max-h-60 rounded"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-600 text-white font-semibold py-3 rounded-md hover:bg-yellow-700"
      >
        Salvar Alterações
      </button>

      {mensagem && (
        <p className="text-center text-sm font-medium mt-2">{mensagem}</p>
      )}
    </form>
  );
};

export default EditarReceita;
