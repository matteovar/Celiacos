import React, { useState, useEffect } from "react";
import { useReceitas } from "./ReceitasContext";
import { useNavigate } from "react-router-dom";

const uploadToBackend = async (file) => {
  const data = new FormData();
  data.append("file", file);
  const res = await fetch("http://124.81.96.70/api/upload", {
    method: "POST",
    body: data,
  });
  const json = await res.json();
  // Retorna a URL completa
  return "http://124.81.96.70" + json.url;
};

const Formulario = () => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    tipo: "geral",
    ingredientes: [""],
    preparo: [""],
    utensilios: [""],
    massaIngredientes: [""],
    recheioIngredientes: [""],
    massaPreparo: [""],
    recheioPreparo: [""],
    foto: "",
    fotoFile: null,
  });

  const [preview, setPreview] = useState("");
  const { addReceita } = useReceitas();
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.fotoFile) {
      const url = URL.createObjectURL(formData.fotoFile);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (formData.foto) {
      setPreview(formData.foto);
    } else {
      setPreview("");
    }
  }, [formData.fotoFile, formData.foto]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Para campos dinâmicos (array)
  const handleArrayChange = (e, field, idx) => {
    const newArr = [...formData[field]];
    newArr[idx] = e.target.value;
    setFormData({ ...formData, [field]: newArr });
  };

  const handleAddField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleRemoveField = (field, idx) => {
    const newArr = formData[field].filter((_, i) => i !== idx);
    setFormData({ ...formData, [field]: newArr.length ? newArr : [""] });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, fotoFile: e.target.files[0], foto: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.foto && !formData.fotoFile) {
      alert("Por favor, envie uma foto ou insira o link da foto.");
      return;
    }

    // Cria um slug para a URL
    const slug = formData.nome
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    let imageUrl = formData.foto;
    if (formData.fotoFile) {
      imageUrl = await uploadToBackend(formData.fotoFile); // Usa a URL real que será servida pelo Flask
    }
    let receitaFinal;
    if (formData.tipo === "geral") {
      receitaFinal = {
        nome: formData.nome,
        slug,
        descricao: formData.descricao,
        categoria: formData.categoria,
        ingredientes: formData.ingredientes.filter((i) => i.trim() !== ""),
        preparo: formData.preparo.filter((i) => i.trim() !== ""),
        utensilios: formData.utensilios.filter((i) => i.trim() !== ""),
        image: imageUrl,
        tipo: formData.tipo,
      };
    } else {
      receitaFinal = {
        nome: formData.nome,
        slug,
        descricao: formData.descricao,
        categoria: formData.categoria,
        ingredientes: {
          massa: formData.massaIngredientes.filter((i) => i.trim() !== ""),
          recheio: formData.recheioIngredientes.filter((i) => i.trim() !== ""),
        },
        preparo: {
          massa: formData.massaPreparo.filter((i) => i.trim() !== ""),
          recheio: formData.recheioPreparo.filter((i) => i.trim() !== ""),
        },
        utensilios: formData.utensilios.filter((i) => i.trim() !== ""),
        image: imageUrl,
        tipo: formData.tipo,
      };
    }

    await fetch("http://124.81.96.70/api/receitas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(receitaFinal),
    });

    navigate(`/receitas/${slug}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-700">
        Adicionar Receita
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Nome da Receita:
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Ex: Coxinha"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Foto da Receita:
          </label>
          <div className="flex items-center gap-3">
            <label
              htmlFor="fotoFile"
              className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 border border-green-400 transition"
              title="Enviar imagem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-green-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16.24 7.76a5 5 0 00-7.07 0l-4.24 4.24a5 5 0 007.07 7.07l6.36-6.36a3 3 0 00-4.24-4.24l-6.36 6.36"
                />
              </svg>
            </label>
            <input
              id="fotoFile"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {formData.fotoFile && (
              <span className="text-green-700 text-sm">
                {formData.fotoFile.name}
              </span>
            )}
            <input
              type="url"
              name="foto"
              value={formData.foto}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  foto: e.target.value,
                  fotoFile: null,
                })
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Cole o link da foto (https://...)"
            />
          </div>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 rounded shadow max-h-40"
              style={{ maxWidth: 200 }}
            />
          )}
          <span className="block text-gray-500 my-2 text-sm">
            Escolha uma imagem ou cole o link
          </span>
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Descricao:
          </label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Ex: Receita feita para um almoco ...."
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Categoria:
          </label>
          <select
            name="categoria"
            value={formData.categoria || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="" disabled>
              Selecione a categoria
            </option>
            <option value="Pratos Únicos">Pratos Únicos</option>
            <option value="Sopas">Sopas</option>
            <option value="Carnes">Carnes</option>
            <option value="Massas">Massas</option>
            <option value="Lanches">Lanches</option>
            <option value="Saladas">Saladas</option>
            <option value="Bolos e Tortas">Bolos e Tortas</option>
            <option value="Doce e Sobremesas">Doce e Sobremesas</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Tipo de Receita:
          </label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="geral">Geral</option>
            <option value="massa-recheio">Massa e Recheio</option>
          </select>
        </div>

        {formData.tipo === "geral" ? (
          <>
            {/* Ingredientes */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Ingredientes:
              </label>
              {formData.ingredientes.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(e, "ingredientes", idx)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder={`Ingrediente ${idx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField("ingredientes", idx)}
                    className="text-red-500 font-bold px-2"
                    title="Remover"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("ingredientes")}
                className="text-green-700 font-semibold hover:underline"
              >
                + Adicionar ingrediente
              </button>
            </div>
            {/* Utensílios */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Utensílios:
              </label>
              {formData.utensilios.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(e, "utensilios", idx)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder={`Utensílio ${idx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField("utensilios", idx)}
                    className="text-red-500 font-bold px-2"
                    title="Remover"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("utensilios")}
                className="text-green-700 font-semibold hover:underline"
              >
                + Adicionar utensílio
              </button>
            </div>
            {/* Modo de Preparo */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Modo de Preparo:
              </label>
              {formData.preparo.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(e, "preparo", idx)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder={`Passo ${idx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField("preparo", idx)}
                    className="text-red-500 font-bold px-2"
                    title="Remover"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("preparo")}
                className="text-green-700 font-semibold hover:underline"
              >
                + Adicionar passo
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Massa e recheio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Ingredientes da Massa:
                </label>
                {formData.massaIngredientes.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(e, "massaIngredientes", idx)
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder={`Ingrediente da massa ${idx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveField("massaIngredientes", idx)
                      }
                      className="text-red-500 font-bold px-2"
                      title="Remover"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField("massaIngredientes")}
                  className="text-green-700 font-semibold hover:underline"
                >
                  + Adicionar ingrediente da massa
                </button>
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Ingredientes do Recheio:
                </label>
                {formData.recheioIngredientes.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(e, "recheioIngredientes", idx)
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder={`Ingrediente do recheio ${idx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveField("recheioIngredientes", idx)
                      }
                      className="text-red-500 font-bold px-2"
                      title="Remover"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField("recheioIngredientes")}
                  className="text-green-700 font-semibold hover:underline"
                >
                  + Adicionar ingrediente do recheio
                </button>
              </div>
            </div>
            {/* Utensílios */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Utensílios:
              </label>
              {formData.utensilios.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(e, "utensilios", idx)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder={`Utensílio ${idx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField("utensilios", idx)}
                    className="text-red-500 font-bold px-2"
                    title="Remover"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("utensilios")}
                className="text-green-700 font-semibold hover:underline"
              >
                + Adicionar utensílio
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Preparo da Massa:
                </label>
                {formData.massaPreparo.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(e, "massaPreparo", idx)
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder={`Passo da massa ${idx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField("massaPreparo", idx)}
                      className="text-red-500 font-bold px-2"
                      title="Remover"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField("massaPreparo")}
                  className="text-green-700 font-semibold hover:underline"
                >
                  + Adicionar passo da massa
                </button>
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Preparo do Recheio:
                </label>
                {formData.recheioPreparo.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(e, "recheioPreparo", idx)
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder={`Passo do recheio ${idx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField("recheioPreparo", idx)}
                      className="text-red-500 font-bold px-2"
                      title="Remover"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddField("recheioPreparo")}
                  className="text-green-700 font-semibold hover:underline"
                >
                  + Adicionar passo do recheio
                </button>
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#8B0000] via-[#C0392B] to-[#E74C3C] text-white font-semibold py-2 px-4 rounded transition"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
