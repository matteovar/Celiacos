import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import ReceitaSection from "./ReceitaSection";
import pao from "/assets/image.png";

const Body = () => {
  return (
    <div className="mt-7 bg-cover min-h-screen">
      {/* Container principal */}
      <div className="mx-auto p-6 bg-white/80 rounded-lg max-w-5xl w-full ">
        <h1 className="text-3xl font-bold text-center mb-6">
          Bem-vindo(a) ao Celicando
        </h1>
        <p className="text-lg text-center mb-4">
          Um cantinho feito com carinho para quem busca receitas e locais
          seguros para celíacos!
        </p>

        <img
          src={pao}
          alt="Imagem de fundo"
          className="mx-auto rounded-lg object-cover mb-8"
          style={{ width: "782px", height: "458px" }}
        />

        {/* O que é a Doença Celíaca */}
        <div className="mt-10">
          <h2 className="text-2xl text-left pl-6 font-bold mb-2">
            O que é a Doença Celíaca?
          </h2>
          <div className="text-base pl-6 mb-4 space-y-3">
            <p>
              Trata-se de uma doença autoimune em que o sistema imunológico
              reage ao glúten, uma proteína encontrada no trigo, na cevada e no
              centeio. A aveia, apesar de não conter glúten, pode ser
              contaminada durante o processo produtivo.
            </p>
            <p>
              Essa reação causa danos no revestimento do intestino delgado, o
              que pode levar a sintomas como diarreia, dores abdominais,
              inchaço, perda de peso e fadiga.
            </p>
            <p>
              Por ser uma doença autoimune, não tem cura, mas pode ser
              controlada com acompanhamento adequado. O diagnóstico precoce é
              essencial para garantir uma dieta apropriada, reduzir sintomas e
              prevenir complicações.
            </p>
          </div>
        </div>

        {/* Sintomas */}
        <div className="mt-10">
          <h2 className="text-2xl text-left pl-6 font-bold mb-2">
            Sintomas da Doença Celíaca
          </h2>
          <ul className="list-disc text-base pl-10 mb-4 space-y-1">
            <li>Diarreia crônica</li>
            <li>Excesso de gases</li>
            <li>Fraqueza</li>
            <li>Emagrecimento e falta de apetite</li>
            <li>Anemia</li>
            <li>Vômitos</li>
            <li>Dores de estômago</li>
            <li>Tontura</li>
            <li>Dores de cabeça</li>
          </ul>
        </div>

        {/* Tratamento */}
        <div className="mt-10">
          <h2 className="text-2xl text-left pl-6 font-bold mb-2">
            Tratamento para Doença Celíaca
          </h2>
          <p className="text-base pl-6 mb-4">
            A doença celíaca não tem cura, e o tratamento consiste na exclusão
            total do glúten da alimentação. Mesmo pequenas quantidades,
            consumidas ocasionalmente, podem desencadear reações e ativar a
            doença. Por isso, é essencial que o celíaco mantenha uma dieta
            rigorosa e faça acompanhamento médico contínuo, garantindo a saúde
            do intestino e a qualidade de vida ao longo dos anos.
          </p>
        </div>

        {/* Seção de Receitas */}
        <div className="mt-10 pb-10">
          <h2 className="text-2xl text-lecenterft pl-6 font-bold mb-2">
            Receitas sem Glúten
          </h2>
          <ReceitaSection />
        </div>

        <div className="flex justify-center mt-4 mb-10">
          <Link
            to="/receitas"
            className="text-xl text-left px-4 py-2 text-white bg-gradient-to-r from-[#b31717] via-[#C0392B] to-[#E74C3C]"
          >
            Ver todas as receitas aqui!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Body;
