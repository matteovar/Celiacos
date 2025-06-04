import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReceitas } from "./ReceitasContext";

const ReceitaDetalhe = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { receitas } = useReceitas();

  const [receita, setReceita] = useState(null);

  useEffect(() => {
    // Procura nas receitas do contexto
    let encontrada = receitas.find((r) => r.slug === slug);

    if (encontrada) {
      setReceita(encontrada);
    } else {
      // Busca do backend
      fetch(`http://localhost:5000/api/receitas/${slug}`)
        .then((res) => res.json())
        .then((data) => setReceita(data))
        .catch(() => setReceita({ error: true }));
    }
  }, [slug, receitas]);

  if (!receita) return <div>Carregando...</div>;
  if (receita.error) return <div>Receita não encontrada!</div>;

  // Corrige utensilios/utensilhos
  const utensilios = receita.utensilios || receita.utensilhos || [];

  const renderIngredientes = () => {
    if (Array.isArray(receita.ingredientes)) {
      return (
        <ul className="list-disc pl-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          {receita.ingredientes.map((item, idx) => (
            <li key={idx} className="break-words">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    // Massa e recheio
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(receita.ingredientes).map(([tipo, lista]) => (
          <div key={tipo}>
            <h4 className="font-semibold capitalize mb-1">
              {tipo === "massa"
                ? "Ingredientes da Massa"
                : tipo === "recheio"
                ? "Ingredientes do Recheio"
                : tipo}
            </h4>
            <ul className="list-disc pl-6 mb-4">
              {lista.map((item, idx) => (
                <li key={idx} className="break-words">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  // Preparo pode ser array ou objeto (massa/recheio)
  const renderUtensilios = () => {
    if (!receita.utensilios || receita.utensilios.length === 0) return null;
    return (
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Utensílios:</h3>
        <ul className="list-disc pl-6 mb-4 grid grid-cols-2 gap-2">
          {receita.utensilios.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  // Preparo pode ser array ou objeto (massa/recheio)
  const renderPreparo = () => {
    if (Array.isArray(receita.preparo)) {
      return (
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          {receita.preparo.map((passo, index) => (
            <li
              key={index}
              className="border bg-white p-3 rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition"
            >
              {passo}
            </li>
          ))}
        </ol>
      );
    }
    // Massa e recheio
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(receita.preparo).map(([tipo, lista]) => (
          <div key={tipo}>
            <h4 className="font-semibold capitalize mb-1">
              {tipo === "massa"
                ? "Preparo da Massa"
                : tipo === "recheio"
                ? "Preparo do Recheio"
                : tipo}
            </h4>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              {lista.map((passo, idx) => (
                <li
                  key={idx}
                  className="border bg-white p-3 rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition"
                >
                  {passo}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-4xl w-full mx-auto bg-white rounded-lg mt-6 ">
      <button
        onClick={() => navigate("/receitas")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        ← Voltar para receitas
      </button>
      <h2 className="text-3xl font-bold mb-4">
        {receita.nome || receita.titulo}
      </h2>
      <img
        src={receita.image}
        alt={`Imagem de ${receita.nome || receita.titulo}`}
        className="mx-auto rounded-lg object-contain mb-8"
        style={{ width: "782px", height: "458px" }}
      />

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Ingredientes:</h3>
        {renderIngredientes()}
      </div>

      {renderUtensilios()}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Modo de preparo:</h3>
        {renderPreparo()}
      </div>
    </div>
  );
};

export default ReceitaDetalhe;
