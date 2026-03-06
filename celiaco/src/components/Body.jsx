import { Link } from "react-router-dom";
import ReceitaSection from "./ReceitaSection";
import pao from "/assets/image.png";

const Body = () => {
  return (
    <div className="mt-7 bg-cover min-h-screen">
      {/* Container principal */}
      <div className="mx-auto p-6 bg-white/80 rounded-lg max-w-5xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Bem-vindo(a) ao Celicando
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Um cantinho feito com carinho para quem busca receitas e locais
            seguros para celíacos!
          </p>
          <img
            src={pao}
            alt="Pão sem glúten"
            className="mx-auto rounded-lg object-cover mb-8 shadow-lg"
            style={{ width: "100%", height: "300px" }}
          />
        </div>

        {/* Cards Informativos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-l-4 border-red-600 shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-xl text-red-700 mb-2">🍰 Receitas</h3>
            <p className="text-gray-700">Centenas de receitas deliciosas sem glúten para todos os momentos</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-l-4 border-red-600 shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-xl text-red-700 mb-2">📍 Locais Seguros</h3>
            <p className="text-gray-700">Encontre restaurantes e comércios onde você pode comer com segurança</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-l-4 border-red-600 shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-xl text-red-700 mb-2">ℹ️ Informações</h3>
            <p className="text-gray-700">Saiba mais sobre a doença celíaca e como viver melhor</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 text-center bg-white p-6 rounded-lg border border-gray-200">
          <div>
            <h3 className="text-4xl font-bold text-red-600 mb-2">150+</h3>
            <p className="text-gray-600 font-medium">Receitas Deliciosas</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-red-600 mb-2">50+</h3>
            <p className="text-gray-600 font-medium">Locais Seguros</p>
          </div>
         
        </div>

        {/* Seção de Receitas Destaque */}
        <div className="mt-12 pb-10">
          <h2 className="text-3xl text-center font-bold mb-8 text-gray-800">
            Receitas em Destaque
          </h2>
          <ReceitaSection />
        </div>

        
      </div>
    </div>
  );
};

export default Body;
