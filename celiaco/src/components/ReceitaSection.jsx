import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RecipeCard from "./RecipeCard";

const ReceitaSection = () => {
  const receitas = [
    {
      title: "Bolo de Cenoura sem Glúten",
      description: "Uma receita deliciosa, fofinha e perfeita para o café da tarde!",
      imageUrl: "https://recipesblob.oetker.com.br/assets/11ed1b54a18b427ea8e7f7d141f0a34d/1272x764/bolo_cenoura_horizontal.jpg",
    },
    {
      title: "Pão de Queijo",
      description: "Clássico brasileiro, crocante por fora e macio por dentro!",
      imageUrl:"https://amopaocaseiro.com.br/wp-content/uploads/2022/08/yt-069_pao-de-queijo_receita-840x560.jpg",
    },
    {
      title: "Pizza com Massa de Batata Doce",
      description: "Feita com batata doce!",
      imageUrl: "https://viagem.cnnbrasil.com.br/wp-content/uploads/sites/5/2025/07/Pizzaria-Ostia-sem-Gluten.jpg?w=1024",
    },
    {
      title: "Panqueca de Aveia com Banana",
      description: "Uma opção saudável e saborosa para o café da manhã.",
      imageUrl: "https://cdn0.tudoreceitas.com/pt/posts/2/2/0/panqueca_de_aveia_light_1022_orig.jpg",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 3;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - cardsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + cardsPerPage, receitas.length - cardsPerPage)
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 justify-center">
        <button 
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`p-2 rounded-full ${startIndex === 0 ? 'text-gray-400' : 'text-black hover:bg-gray-100'}`}
        >
          <ChevronLeft size={32} />
        </button>

        <div className="flex gap-4">
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
      
      <div className="text-center mt-4">
        <a href="/receitas" className="text-red-700 hover:underline font-medium">
          Ver todas as receitas
        </a>
      </div>
              
    </div>
  );
};

export default ReceitaSection;
