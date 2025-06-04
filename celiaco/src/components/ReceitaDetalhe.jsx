import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReceitas } from "./ReceitasContext";

const receitasDetalhes = {
  "pao-de-queijo": {
    titulo: "Pão de Queijo",
    image: "/assets/pao_de_queijo.png",
    descricao:
      "Deliciosos pães de queijo tradicionais, crocantes por fora e macios por dentro.",
    ingredientes: [
      "500 g de polvilho doce",
      "250 ml de leite integral",
      "1 colher (sopa) rasa de sal",
      "1 ou 2 ovos",
      "1 prato cheio (350 g) de queijo meia cura e/ou mussarela ralado",
      "1/2 copo de óleo",
    ],
    utensilios: ["Assadeira", "Pote", "Panela", "Medidor"],
    preparo: [
      "Preaqueça o forno a 180ºC.",
      "Aqueça o leite e a manteiga em uma panela até levantar fervura.",
      "Jogue a mistura fervente no polvilho e mexa para fazer uma pasta.",
      "Junte o queijo ralado e misture. Coloque o ovo e misture novamente. Ajuste o sal.",
      "Modele os pães e coloque-os na assadeira.",
      "Deixe no forno até dourar.",
    ],
  },
  "panqueca-de-aveia": {
    titulo: "Panqueca de Aveia",
    image: "/assets/panqueca_aveia.png",
    descricao:
      "Panquecas saudáveis feitas com aveia, perfeitas para um café da manhã leve.",
    ingredientes: [
      "1 xícara (chá) de leite desnatado",
      "1 colher (café) de salsa desidratada",
      "2 ovos",
      "1 xícara (chá) de farinha de aveia",
      "1/2 colher (café) de sal",
    ],
    utensilios: ["Liquidificador", "Espátula", "Frigideira untada", "Prato"],
    preparo: [
      "Bata todos os ingredientes no liquidificador por 3 minutos.",
      "Unte uma frigideira com azeite e, em fogo baixo, adicione 1 concha da mistura.",
      "Quando estiver dourado embaixo, vire a panqueca para dourar o outro lado.",
      "Adicione o recheio de sua preferência.",
    ],
  },
  coxinha: {
    titulo: "Coxinha",
    image: "/assets/coxinha.png",
    descricao:
      "Coxinhas crocantes por fora e recheadas com frango desfiado, uma delícia sem glúten.",
    ingredientes: {
      massa: [
        "450 g de farinha de arroz",
        "1 litro de caldo de frango",
        "1 colher (sopa) de margarina",
        "Tempero pronto e sal a gosto",
        "½ kg de batata cozida e amassada",
        "Fubá mimoso (isento de glúten)",
      ],
      recheio: [
        "400 g de frango (peito, coxa e sobrecoxa sem pele)",
        "2 litros de água para cozinhar",
        "Sal a gosto",
        "Óleo a gosto",
        "1 cebola picada",
        "1 dente de alho socado",
        "1 tomate sem pele e sem sementes",
        "1 tablete ou saquinho de tempero pronto",
        "1 colher (sopa) de salsa picada",
      ],
    },
    utensilios: ["Panela", "Colher de pau", "Prato", "Faca"],
    preparo: {
      recheio: [
        "Cozinhe o frango na água com sal. Depois de esfriar, desfie.",
        "Refogue a cebola, o alho, o tomate e os temperos no óleo. Junte o frango, misture bem e desligue.",
      ],
      massa: [
        "Ferva o caldo de frango com a margarina, o tempero pronto, o sal e a batata.",
        "Acrescente a farinha de arroz aos poucos, mexendo até desgrudar da panela.",
        "Deixe esfriar em uma vasilha e sove.",
        "Abra a massa na mão em pequenos círculos.",
        "Recheie e modele as coxinhas.",
        "Molhe levemente em água, passe no fubá e frite em óleo bem quente até dourar.",
      ],
    },
  },
  "bolo-de-fuba": {
    titulo: "Bolo de Fubá",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
    descricao:
      "Bolo de fubá fofinho e sem glúten, perfeito para acompanhar um café.",
    ingredientes: [
      "2 xícaras (chá) de fubá",
      "1 xícara (chá) de açúcar",
      "1/2 xícara (chá) de óleo",
      "3 ovos",
      "1 xícara (chá) de leite",
      "1 colher (sopa) de fermento em pó",
    ],
    utensilios: ["Batedeira", "Assadeira", "Espátula", "Peneira"],
    preparo: [
      "Preaqueça o forno a 180ºC.",
      "Bata os ovos, o açúcar e o óleo na batedeira até obter um creme claro.",
      "Adicione o fubá, o leite e o fermento, misturando bem.",
      "Despeje a massa em uma assadeira untada e leve ao forno por cerca de 40 minutos.",
    ],
  },
  "brownie-sem-gluten": {
    titulo: "Brownie sem Glúten",
    image: "/assets/brownie.png",
    descricao:
      "Brownie delicioso, sem glúten, com textura úmida e sabor intenso.",
    ingredientes: [
      "200 g de manteiga",
      "200 g de chocolate 70% cacau",
      "1 xícara de gotas de chocolate",
      "3 ovos inteiros",
      "1 xícara de açúcar",
      "2/3 de xícara de farinha de arroz",
      "1/2 colher de chá de sal",
    ],
    utensilios: ["Tigela", "Panela", "Espátula", "Assadeira", "Papel manteiga"],
    preparo: [
      "Preaqueça o forno a 180ºC.",
      "Unte e enfarinhe a assadeira com manteiga e farinha de arroz.",
      "Derreta o chocolate 70% e misture a manteiga.",
      "Acrescente a farinha, depois o açúcar, e por fim os ovos, misturando bem a cada etapa.",
      "Despeje a massa na forma preparada e leve ao forno por 20 minutos.",
      "Espere esfriar antes de desenformar e servir.",
    ],
  },
  "bolo-de-cenoura": {
    titulo: "Bolo de Cenoura",
    image: "/assets/bolo_cenoura.png",
    descricao:
      "Bolo de cenoura fofinho com cobertura de chocolate, uma combinação perfeita.",
    ingredientes: [
      "2 xícaras de farinha de arroz",
      "2 xícaras de açúcar",
      "1 xícara de óleo",
      "3 ovos",
      "3 cenouras médias picadas ou raladas",
      "1 colher (sopa) de fermento em pó sem glúten",
      "2 colheres (sopa) de óleo para untar",
      "2 colheres (sopa) de farinha de arroz para enfarinhar",
    ],
    utensilios: ["Liquidificador", "Tigela", "Forma"],
    preparo: [
      "Preaqueça o forno a 180ºC.",
      "No liquidificador, bata o óleo, o açúcar e as cenouras até obter um creme.",
      "Em uma tigela, misture a farinha com o fermento.",
      "Adicione o conteúdo do liquidificador à tigela e misture bem.",
      "Unte e enfarinhe a forma com óleo e farinha de arroz.",
      "Despeje a massa na forma e asse por 30 minutos.",
    ],
  },
  "bolo-de-caneca": {
    titulo: "Bolo de Caneca",
    image: "/assets/bolo_caneca.png",
    descricao:
      "Bolo de caneca rápido e fácil, perfeito para uma sobremesa individual.",
    ingredientes: [
      "4 colheres (sopa) de farinha de arroz",
      "1 ovo",
      "3 colheres (sopa) de óleo",
      "2 colheres (sopa) de açúcar",
      "4 colheres (sopa) de leite",
      "2 colheres (sopa) de chocolate em pó",
      "1 colher (café) de fermento em pó",
    ],
    utensilios: ["Caneca", "Colher", "Micro-ondas"],
    preparo: [
      "Coloque o ovo na caneca e bata com um garfo.",
      "Adicione o óleo, o açúcar, o leite e o chocolate, misturando bem.",
      "Acrescente a farinha de arroz e o fermento, mexendo até a massa ficar homogênea.",
      "Leve ao micro-ondas por cerca de 3 minutos.",
      "Deixe esfriar um pouco antes de servir.",
    ],
  },
  sonho: {
    titulo: "Sonho",
    image: "/assets/sonho.png",
    descricao:
      "Sonho recheado com creme de baunilha, uma delícia que derrete na boca.",
    ingredientes: [
      "200 g de Farinha de Arroz",
      "½ copo de água",
      "10 g de fermento biológico seco",
      "2 ovos",
      "1 gema",
      "2 colheres (sopa) de margarina",
      "1 lata de leite condensado",
      "200 g de polvilho doce",
      "1 colher (chá) de goma xantana",
      "Óleo para fritar",
    ],
    utensilhos: ["Tigela", "Forma", "Liquidificador", "Batedeira"],
    preparo: [
      "Misture o fermento biológico na água morna e misture bem para hidratar o fermento.",
      "Reserve por 5 minutos.",
      "No liquidificador, coloque os ingredientes úmidos: os ovos, o leite condensado, a margarina e o fermento com a água já hidratado. Bata por 1 minuto.",
      "Junte a mistura, mexendo bem, às farinhas.",
      "Transfira para uma batedeira e, à velocidade média, bata até obter uma massa lisa.",
      "Polvilhe uma superfície com medidas iguais de Farinha de Arroz Urbano e de polvilho doce e uma pitadinha de goma xantana.",
      "Coloque a massa e amasse delicadamente.",
      "Em seguida, divida em pequenas porções e, enrolando, modele os sonhos.",
      "Deixe-os descansar por 45 minutos numa forma também polvilhada com a mistura de farinhas.",
      "Após, frite em óleo quente.",
      "Ao retirar, coloque sobre papel-toalha e, para servir, polvilhe com açúcar e recheie de acordo com a sua preferência.",
    ],
  },
  "mousse-maracuja": {
    titulo: "Mousse de maracujá",
    image:
      "https://images.unsplash.com/photo-1562440499-7264a3a76b04?auto=format&fit=crop&w=400&q=80",
    descricao: "Mousse refrescante de maracujá, leve e cremosa.",
    ingredientes: [
      "1 lata de leite condensado",
      "1 lata de creme de leite",
      "1 xícara de suco de maracujá concentrado",
    ],
    utensilhos: ["Liquidificador", "Tigela", "Colher"],
    preparo: [
      "Bata todos os ingredientes no liquidificador.",
      "Despeje em uma tigela e leve à geladeira por 4 horas.",
    ],
  },
  "pave-chocolate": {
    titulo: "Pavê de chocolate",
    image:
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0a90?auto=format&fit=crop&w=400&q=80",
    descricao:
      "Sobremesa clássica de pavê com camadas de chocolate irresistíveis.",
    ingredientes: [
      "1 pacote de biscoito sem glúten",
      "2 xícaras de leite",
      "1 lata de leite condensado",
      "1 colher (sopa) de amido de milho",
      "4 colheres (sopa) de chocolate em pó",
      "1 colher (sopa) de manteiga",
      "1 caixa de creme de leite",
    ],
    utensilhos: ["Panela", "Tigela", "Colher", "Travessa"],
    preparo: [
      "Misture o leite, leite condensado, amido de milho, chocolate em pó e manteiga em uma panela.",
      "Leve ao fogo médio, mexendo sempre, até engrossar.",
      "Desligue o fogo e misture o creme de leite.",
      "Em uma travessa, alterne camadas de biscoito e creme.",
      "Leve à geladeira por pelo menos 3 horas antes de servir.",
    ],
  },
};

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
    } else if (receitasDetalhes[slug]) {
      // Procura nas receitas fixas
      setReceita(receitasDetalhes[slug]);
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
            <h4 className="font-semibold capitalize mb-1">{tipo}</h4>
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
            <h4 className="font-semibold capitalize mb-1">{tipo}</h4>
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
        className="mx-auto rounded-lg object-cover mb-8"
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
