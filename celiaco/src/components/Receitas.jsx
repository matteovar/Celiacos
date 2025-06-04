import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReceitas } from "./ReceitasContext";
import { Link } from "react-router-dom";

const categorias = ["Salgados", "Doces", "Sobremesas"];

const Receitas = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Salgados");
  const [receitas, setReceitas] = useState({
    Salgados: [],
    Doces: [],
    Sobremesas: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/receitas")
      .then((res) => res.json())
      .then((data) => {

        // Agrupa receitas por categoria
        const agrupadas = { Salgados: [], Doces: [], Sobremesas: [] };
        data.forEach((r) => {
          const cat = r.categoria || "Salgados";
          agrupadas[cat] = agrupadas[cat] || [];
          agrupadas[cat].unshift({
            titulo: r.nome || r.titulo,
            slug: r.slug,
            image: r.image,
            descricao: r.descricao,
          });
        });
        setReceitas(agrupadas);
      })
      
  }, []);

  return (
    <div className="p-6 max-w-4xl w-full mx-auto bg-white rounded-lg mt-6">
      <div className="mx-auto p-6 bg-white/80 rounded-lg max-w-5xl w-full ">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/formulario")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Adicionar Receita
          </button>
        </div>
        <h2 className="text-3xl font-bold mb-4">Receitas sem glúten</h2>

        <div className="mb-6 space-x-4">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaSelecionada(categoria)}
              className={`px-4 py-1 rounded-full border ${
                categoria === categoriaSelecionada
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 border-blue-500"
              } hover:bg-blue-600 hover:text-white transition`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Cards das receitas */}
        <div className="grid grid-cols-1 gap-4">
          {(receitas[categoriaSelecionada] || []).map(
            ({ titulo, slug, image, descricao }) => (
              <Link
                to={`/receitas/${slug}`}
                key={slug}
                className="flex border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <img
                  src={image}
                  alt={titulo}
                  className="w-32 h-32 object-cover"
                />
                <div className="p-4 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold mb-2">{titulo}</h3>
                  <p className="text-gray-600">{descricao}</p>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Receitas;
