import { Link } from "react-router-dom";

const Sobrenos = () => {
  return (
    <div className="mt-7 bg-cover min-h-screen">
      {/* Container principal */}
      <div className="mx-auto p-6 bg-white/80 rounded-lg max-w-5xl w-full">
        
        {/* Título */}
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Sobre Nós</h1>
        <p className="text-lg text-gray-600 mb-8">Conhecer a doença celíaca é o primeiro passo para viver melhor</p>

        {/* Imagem destaque */}
        <img
          src="https://blog.ingredientesonline.com.br/wp-content/uploads/2020/07/Unveiling-gluten-free-misperceptions-Don-t-assume-gluten-free-products-are-healthy-by-default_wrbm_large.jpg"
          alt="Comida saudável"
          className="w-full h-64 object-cover rounded-lg mb-10 shadow-md"
        />

        {/* Missão */}
        <div className="mb-10 pb-8 border-b-2 border-red-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nossa Missão</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-3">
            Somos um site onde queremos ajudar as pessoas a encontrarem <strong>receitas e locais seguros para celíacos</strong>. 
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-3">
            Nosso objetivo é fornecer <strong>informações confiáveis e práticas</strong> para que os celíacos possam desfrutar de uma alimentação saborosa e segura, 
            sem abrir mão do prazer de comer. 
          </p>
          <p className="text-base text-gray-700 leading-relaxed font-medium text-red-600">
            Acreditamos que a vida com doença celíaca pode ser plena e deliciosa! 💙
          </p>
        </div>

        {/* O que é a Doença Celíaca */}
        <div className="mb-10 pb-8 border-b-2 border-red-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">O que é a Doença Celíaca?</h2>
          <div className="space-y-4">
            <p className="text-base text-gray-700 leading-relaxed">
              Trata-se de uma <strong>doença autoimune</strong> em que o sistema imunológico
              reage ao glúten, uma proteína encontrada no trigo, na cevada e no
              centeio. A aveia, apesar de não conter glúten, pode ser
              contaminada durante o processo produtivo.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Essa reação causa danos no revestimento do intestino delgado, o
              que pode levar a <strong>sintomas como diarreia, dores abdominais,
              inchaço, perda de peso e fadiga</strong>.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Por ser uma doença autoimune, <strong>não tem cura</strong>, mas pode ser
              controlada com acompanhamento adequado. O <strong>diagnóstico precoce</strong> é
              essencial para garantir uma dieta apropriada, reduzir sintomas e
              prevenir complicações.
            </p>
          </div>
        </div>

        {/* Sintomas */}
        <div className="mb-10 pb-8 border-b-2 border-red-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sintomas da Doença Celíaca</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["Fraqueza", "Emagrecimento e falta de apetite", "Anemia", "Vômitos", "Dores de estômago", "Tontura", "Dores de cabeça"].map((sintoma) => (
              <div key={sintoma} className="flex items-center p-2">
                <span className="text-red-600 mr-3 text-lg">→</span>
                <span className="text-gray-700">{sintoma}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tratamento */}
        <div className="mb-10 pb-8 border-b-2 border-red-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tratamento para Doença Celíaca</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            A doença celíaca <strong>não tem cura</strong>, e o tratamento consiste na <strong>exclusão
            total do glúten da alimentação</strong>. Mesmo pequenas quantidades,
            consumidas ocasionalmente, podem desencadear reações.
          </p>
          <p className="text-base text-gray-700 leading-relaxed font-medium bg-red-50 p-4 rounded-lg">
            Por isso, é essencial que o celíaco mantenha uma <strong>dieta rigorosa</strong> e faça <strong>acompanhamento médico contínuo</strong>, 
            garantindo a saúde do intestino e qualidade de vida.
          </p>
        </div>

       

      </div>
    </div>
  );
};

export default Sobrenos;
