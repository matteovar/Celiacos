import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const receitasDetalhes = {
  "pao-de-queijo": {
    titulo: "Pão de queijo",
    image: "/assets/pao_de_queijo.png",
    descricao:
      "Deliciosos pães de queijo tradicionais, crocantes por fora e macios por dentro.",
    ingredientes: [
      "500 g de polvilho doce",
      "250 ml de leite integral",
      "1 colher/sopa rasa de sal",
      "1 ou 2 ovos",
      "1 prato cheio (350 g) de queijo meia cura e/ou mussarela ralado",
      "1/2 copo de óleo",
    ],
    utensilhos: ["Assadeira", "Pote", "Panela", "Medidor"],
    preparo: [
      "Preaqueça o forno a 180ºC.",
      "Aqueça o leite e a manteiga em uma panelina até levantar fervura",
      "Jogue a mistura fervente no polvilho e mexa para fazer uma pasta",
      "Junte o queijo ralado e misture. Coloque o ovo e misture novamente. Ajuste o sal",
      "Modele os pães e coloque os na assadeira",
      "Deixe no forno ate dourar",
    ],
  },
  "panqueca-de-aveia": {
    titulo: "Panqueca de aveia",
    image: "/assets/panqueca_aveia.png",
    descricao:
      "Panquecas saudáveis feitas com aveia, perfeitas para um café da manhã leve.",
    ingredientes: [
      "1 xícara (chá) de leite desnatado",
      "1 colher (café) de salsa desidratada",
      "2 ovo",
      "1 xícara (chá) de farinha de aveia",
      "1/2 colher (café) de sal",
    ],
    utensilhos: ["Liquidificador", "Espátula", "Frigideira untada", "Prato"],
    preparo: [
      "Bata todos os ingredientes no liquidificador por 3 minutos.",
      "Unte uma frigideira com azeite e, em fogo baixo, adicione 1 concha da mistura para panquecas",
      "Quando estiver dourado em baixo, vire a panqueca para dourar o outro lado.",
      "Adicione o recheio de sua preferência à panqueca",
    ],
  },
  coxinha: {
    titulo: "Coxinha",
    image: "/assets/coxinha.png",
    descricao:
      "Coxinhas crocantes por fora e recheadas com frango desfiado, uma delícia sem glúten.",
    ingredientes: {
      massa: [
        "450 g de Farinha de Arroz",
        "1 litro de caldo de frango",
        "1 colher (sopa) margarina",
        "Tempero pronto e sal a gosto",
        "½ kg de batata cozida e amassada",
        "Fubá mimoso (isento de glúten)",
      ],
      recheio: [
        "400 g frango (peito, coxa e sobrecoxa sem pele)",
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
    utensilhos: ["Panela", "Colher de pau", "Prato", "Faca"],
    preparo: {
      recheio: [
        "Cozinhe o frango na água com sal a gosto. Depois de esfriar, desfie.",
        "Refogue a cebola, o alho, o tomate e os temperos no óleo. Junte o frango, deixe mais um pouco e desligue.",
        "Despeje a farinha de arroz aos poucos, mexendo sempre até formar uma massa homogênea.",
      ],
      massa: [
        "Ferva o caldo de frango com a margarina, o tempero pronto, o sal e a batata",
        "Acrescente a farinha de arroz aos poucos, mexendo até desgrudar da panela",
        "Deixe esfriar em uma vasilha e sove.",
        "Abra a massa na mão em pequenos círculos.",
        "Recheie e modele as coxinhas",
        "Depois, molhe levemente em água, passe no fubá e frite em óleo bem quente, deixando-as douradas.",
      ],
    },
  },
  "bolo-de-fuba": {
    titulo: "Bolo de fubá",
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
    utensilhos: ["Batedeira", "Assadeira", "Espátula", "Peneira"],
    preparo: [
      "Preaqueça o forno a 180ºC.",
      "Bata os ovos, o açúcar e o óleo na batedeira até obter um creme claro.",
      "Adicione o fubá, o leite e o fermento, misturando bem.",
      "Despeje a massa em uma assadeira untada e leve ao forno por cerca de 40 minutos.",
    ],
  },
  "brownie-sem-gluten": {
    titulo: "Brownie sem glúten",
    image: "/assets/brownie.png",
    descricao:
      "Brownie delicioso, sem glúten, com textura úmida e sabor intenso.",
    ingredientes: [
      "200g de manteiga",
      "200g de chocolate 70% cacau",
      "1 xícara de gotas de chocolate",
      "3 ovos inteiros",
      "1 xícara de açúcar",
      "2/3 de xícara de farinha de arroz",
      "1/2 colher de chá de sal",
    ],
    utensilhos: ["Tigela", "Panela", "Espátula", "Assadeira", "Papel manteiga"],
    preparo: [
      "Pré-aqueça o forno a 180 graus.",
      "Unte e enfarinhe a assadeira com manteiga e farinha de arroz.",
      "Derreta o chocolate 70%.",
      "Acrescente a manteiga ao chocolate derretido e mexa bem.",
      "Acrescente a farinha de arroz e misture bem.",
      "Acrescente o açúcar e misture bem.",
      "Acrescente os ovos e misture bem.",
      "Despeje a massa na forma untada e enfarinhada e leve ao forno por 20 minutos.",
      "Espere esfriar para desenformar e partir.",
    ],
  },
  "bolo-de-cenoura": {
    titulo: "Bolo de cenoura",
    image: "/assets/bolo_cenoura.png",
    descricao:
      "Bolo de cenoura fofinho com cobertura de chocolate, uma combinação perfeita.",
    ingredientes: [
      "2 xícaras farinha de arroz",
      "2 xícaras açúcar",
      "1 xícara de óleo",
      "3 ovos",
      "3 cenouras médias e picadas ou raladas",
      "1 colher de sopa fermento em pó sem glúten",
      "2 colheres de sopa óleo para untar",
      "2 colheres de sopa farinha de arroz para enfarinhar",
    ],
    utensilhos: ["Liquidificador", "Tigela", "Forma"],
    preparo: [
      "Preaqueça o forno a 180ºC.",
      "Junte o óleo, o açúcar, as cenouras picadas ou raladas no liquidificador e bata bem.",
      "Coloque a farinha de arroz em uma tigela e misture a pitada de sal.",
      "Despeje a mistura do liquidificador por cima e misture com uma colher até ficar homogêneo e misture com o fermento.",
      "Espalhe bem as duas colheres de sopa de óleo na forma para untar e enfarinhe com as duas colheres de sopa de farinha de arroz.",
      "Despeje a massa na forma e leve ao forno para assar por 30 minutos.",
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
    utensilhos: ["Caneca", "Colher", "Micro-ondas"],
    preparo: [
      "Quebre o ovo, coloque na caneca e vá batendo com o garfo.",
      "Adicione o óleo, o açúcar, o leite e o chocolate e bata mais um pouco.",
      "Acrescente a farinha de arroz, o fermento e mexa até ficar homogêneo.",
      "Leve ao micro-ondas por cerca de três minutos.",
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
  const [receita, setReceita] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/receitas")
      .then((res) => res.json())
      .then((data) => {
        const encontrada = data.find((r) => r.slug === slug);
        if (encontrada) {
          setReceita(encontrada);
        } else if (receitasDetalhes[slug]) {
          setReceita(receitasDetalhes[slug]);
        } else {
          setReceita(null);
        }
      });
  }, [slug]);

  if (!receita)
    return <div className="p-4 text-red-600">Receita não encontrada!</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg mt-6">
      <button
        className="mb-4 px-4 py-2 bg-gradient-to-r from-red-400 via-red-500 to-red-700 text-white font-semibold rounded-full shadow-lg transition hover:brightness-110 hover:scale-105 duration-200"
        onClick={() => navigate(-1)}
      >
        ← Voltar
      </button>
      <h1 className="text-2xl font-bold mb-2">{receita.titulo}</h1>
      {receita.image && (
        <img
          src={receita.image}
          alt={receita.titulo}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <p className="mb-4">{receita.descricao}</p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Ingredientes</h2>
      <ul className="list-disc pl-6 mb-4">
        {Array.isArray(receita.ingredientes) ? (
          receita.ingredientes.map((item, idx) => <li key={idx}>{item}</li>)
        ) : (
          <>
            {receita.ingredientes.massa && (
              <>
                <li className="font-semibold">Massa:</li>
                {receita.ingredientes.massa.map((item, idx) => (
                  <li key={"massa" + idx} className="ml-4">
                    {item}
                  </li>
                ))}
              </>
            )}
            {receita.ingredientes.recheio && (
              <>
                <li className="font-semibold">Recheio:</li>
                {receita.ingredientes.recheio.map((item, idx) => (
                  <li key={"recheio" + idx} className="ml-4">
                    {item}
                  </li>
                ))}
              </>
            )}
            {receita.ingredientes.gerais && (
              <>
                {receita.ingredientes.gerais.map((item, idx) => (
                  <li key={"geral" + idx}>{item}</li>
                ))}
              </>
            )}
          </>
        )}
      </ul>
      <h2 className="text-lg font-semibold mt-4 mb-2">Utensílios</h2>
      <ul className="list-disc pl-6 mb-4">
        {(receita.utensilhos || receita.utensilios || []).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold mt-4 mb-2">Modo de Preparo</h2>
      <ol className="list-decimal pl-6">
        {Array.isArray(receita.preparo) ? (
          receita.preparo.map((item, idx) => (
            <div
              key={idx}
              className="shadow-md bg-white rounded p-2 mb-2 flex items-start gap-2"
            >
              <span className="font-bold">{idx + 1}.</span>
              <span>{item}</span>
            </div>
          ))
        ) : (
          <>
            {receita.preparo.massa && (
              <>
                <div className="shadow-md bg-white rounded p-2 mb-2">
                  <span className="font-semibold">Massa:</span>
                </div>
                {receita.preparo.massa.map((item, idx) => (
                  <div
                    key={"pmassa" + idx}
                    className="shadow-md bg-white rounded p-2 mb-2 ml-4 flex items-start gap-2"
                  >
                    <span className="font-bold">{idx + 1}.</span>
                    <span>{item}</span>
                  </div>
                ))}
              </>
            )}
            {receita.preparo.recheio && (
              <>
                <div className="shadow-md bg-white rounded p-2 mb-2">
                  <span className="font-semibold">Recheio:</span>
                </div>
                {receita.preparo.recheio.map((item, idx) => (
                  <div
                    key={"precheio" + idx}
                    className="shadow-md bg-white rounded p-2 mb-2 ml-4 flex items-start gap-2"
                  >
                    <span className="font-bold">{idx + 1}.</span>
                    <span>{item}</span>
                  </div>
                ))}
              </>
            )}
            {receita.preparo.geral && (
              <>
                {receita.preparo.geral.map((item, idx) => (
                  <div
                    key={"pgeral" + idx}
                    className="shadow-md bg-white rounded p-2 mb-2 flex items-start gap-2"
                  >
                    <span className="font-bold">{idx + 1}.</span>
                    <span>{item}</span>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </ol>
    </div>
  );
};

export default ReceitaDetalhe;
