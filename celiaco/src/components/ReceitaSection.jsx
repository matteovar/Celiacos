import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RecipeCard from "./RecipeCard";
// Importe as imagens
import boloCenoura from "../assets/bolo_cenoura.png";
import paoDeQueijo from "../assets/pao_de_queijo.png";
import pizza from "../assets/pizza.png";
import panquecaAveia from "../assets/panqueca_aveia.png";

const ReceitaSection = () => {
  const receitas = [
    {
      title: "Bolo de Cenoura sem Glúten",
      description: "Uma receita deliciosa, fofinha e perfeita para o café da tarde!",
      imageUrl: boloCenoura,
    },
    {
      title: "Pão de Queijo",
      description: "Clássico brasileiro, crocante por fora e macio por dentro!",
      imageUrl: paoDeQueijo,
    },
    {
      title: "Pizza com Massa de Batata Doce",
      description: "Feita com batata doce!",
      imageUrl: pizza,
    },
    {
      title: "Panqueca de Aveia com Banana",
      description: "Uma opção saudável e saborosa para o café da manhã.",
      imageUrl: panquecaAveia,
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 2;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - cardsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + cardsPerPage, receitas.length - cardsPerPage)
    );
  };

  return (
    <div className="pl-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`p-2 rounded-full ${startIndex === 0 ? 'text-gray-400' : 'text-black hover:bg-gray-100'}`}
        >
          <ChevronLeft size={32} />
        </button>

        <div className="flex gap-6">
          {receitas.slice(startIndex, startIndex + cardsPerPage).map((receita, index) => (
            <RecipeCard
              key={index}
              title={receita.title}
              description={receita.description}
              imageUrl={receita.imageUrl}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          disabled={startIndex >= receitas.length - cardsPerPage}
          className={`p-2 rounded-full ${startIndex >= receitas.length - cardsPerPage ? 'text-gray-400' : 'text-black hover:bg-gray-100'}`}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default ReceitaSection;
