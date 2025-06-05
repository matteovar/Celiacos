// ...imports
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "./AuthContext";


const categorias = [
  "Pratos Únicos",
  "Sopas",
  "Carnes",
  "Massas",
  "Lanches",
  "Saladas",
  "Bolos e Tortas",
  "Doce e Sobremesas",
];

const Receitas = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("Pratos Únicos");
  const [receitas, setReceitas] = useState({});
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { user } = useAuth();


  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/receitas")
      .then((res) => res.json())
      .then((data) => {
        const agrupadas = {};
        categorias.forEach((cat) => (agrupadas[cat] = []));

        data.forEach((r) => {
          const cat = r.categoria || "Pratos Únicos";
          if (!agrupadas[cat]) agrupadas[cat] = [];
          agrupadas[cat].unshift({
            titulo: r.nome || r.titulo,
            slug: r.slug,
            image: r.image,
            descricao: r.descricao,
          });
        });

        setReceitas(agrupadas);
      });
  }, []);

  return (
    <div className="p-6 max-w-4xl w-full mx-auto bg-white rounded-lg mt-6">
      <div className="mx-auto p-6 bg-white/80 rounded-lg max-w-5xl w-full">
        {user && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate("/formulario")}
              className="px-4 py-2 bg-gradient-to-r from-[#8B0000] via-[#C0392B] to-[#E74C3C] text-white rounded transition"
            >
              Adicionar Receita
            </button>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-4">Receitas sem glúten</h2>

        {/* BARRA DE CATEGORIAS COM SETAS */}
        <div className="relative mb-6">
          <button
            onClick={() => scroll(-200)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-1 hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide whitespace-nowrap px-8"
          >
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaSelecionada(categoria)}
                className={`inline-block px-4 py-1 mx-1 my-1 rounded-full border whitespace-nowrap transition ${
                  categoria === categoriaSelecionada
                    ? "bg-gradient-to-r from-[#4a2f14] via-[#5f2a12] to-[#8b0000] text-white"
                    : "bg-white text-blue-500 border-blue-500"
                } hover:bg-red-900 hover:text-white`}
              >
                {categoria}
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll(200)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-1 hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* LISTA DE RECEITAS */}
        <div className="grid grid-cols-1 gap-4">
          {(receitas[categoriaSelecionada] || []).map(
            ({ titulo, slug, image, descricao }) => {
              const maxLength = 100;
              const descricaoCurta =
                descricao.length > maxLength
                  ? descricao.slice(0, maxLength) + "… "
                  : descricao;

              return (
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
                    <p className="text-gray-600">
                      {descricaoCurta}
                      {descricao.length > maxLength && (
                        <Link
                          to={`/receitas/${slug}`}
                          className="text-red-700 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          ver mais
                        </Link>
                      )}
                    </p>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Receitas;
