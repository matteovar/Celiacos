import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const receitasIniciais = {
  Salgados: [
    {
      titulo: "Pão de queijo",
      slug: "pao-de-queijo",
      image: "/assets/pao_de_queijo.png",
      descricao:
        "Deliciosos pães de queijo tradicionais, crocantes por fora e macios por dentro.",
    },
    {
      titulo: "Panqueca de aveia",
      slug: "panqueca-de-aveia",
      image: "/assets/panqueca_aveia.png",
      descricao:
        "Panquecas saudáveis feitas com aveia, perfeitas para um café da manhã leve.",
    },
    {
      titulo: "Coxinha",
      slug: "coxinha",
      image: "/assets/coxinha.png",
      descricao:
        "Coxinhas crocantes por fora e recheadas com frango desfiado, uma delícia sem glúten.",
    },
  ],
  Doces: [
    {
      titulo: "Bolo de fubá",
      slug: "bolo-de-fuba",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
      descricao:
        "Bolo de fubá fofinho e sem glúten, perfeito para acompanhar um café.",
    },
    {
      titulo: "Brownie sem glúten",
      slug: "brownie-sem-gluten",
      image: "/assets/brownie.png",
      descricao:
        "Brownie delicioso, sem glúten, com textura úmida e sabor intenso.",
    },
    {
      titulo: "Bolo de cenoura",
      slug: "bolo-de-cenoura",
      image: "/assets/bolo_cenoura.png",
      descricao:
        "Bolo de cenoura fofinho com cobertura de chocolate, uma combinação perfeita.",
    },
    {
      titulo: "Bolo de Caneca",
      slug: "bolo-de-caneca",
      image: "/assets/bolo_caneca.png",
      descricao:
        "Bolo de caneca rápido e fácil, perfeito para uma sobremesa individual.",
    },
    {
      titulo: "Sonho",
      slug: "sonho",
      image: "/assets/sonho.png",
      descricao:
        "Sonho recheado com creme de baunilha, uma delícia que derrete na boca.",
    },
  ],
  Sobremesas: [
    {
      titulo: "Mousse de maracujá",
      slug: "mousse-maracuja",
      image:
        "https://images.unsplash.com/photo-1562440499-7264a3a76b04?auto=format&fit=crop&w=400&q=80",
      descricao: "Mousse refrescante de maracujá, leve e cremosa.",
    },
    {
      titulo: "Pavê de chocolate",
      slug: "pave-chocolate",
      image:
        "https://images.unsplash.com/photo-1558021212-51b6ecfa0a90?auto=format&fit=crop&w=400&q=80",
      descricao:
        "Sobremesa clássica de pavê com camadas de chocolate irresistíveis.",
    },
  ],
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

const categorias = ["Salgados", "Doces", "Sobremesas"];

const Receitas = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Salgados");
  const [showModal, setShowModal] = useState(false);
  const [receitas, setReceitas] = useState(receitasIniciais);

  // Campos do formulário
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Salgados");
  const [image, setImage] = useState("");
  const [descricao, setDescricao] = useState("");
  const [temMassaRecheio, setTemMassaRecheio] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Ingredientes e preparo
  const [ingredientesMassa, setIngredientesMassa] = useState([""]);
  const [ingredientesRecheio, setIngredientesRecheio] = useState([""]);
  const [ingredientesGerais, setIngredientesGerais] = useState([""]);
  const [utensilhos, setUtensilhos] = useState([""]);
  const [preparoMassa, setPreparoMassa] = useState([""]);
  const [preparoRecheio, setPreparoRecheio] = useState([""]);
  const [preparoGeral, setPreparoGeral] = useState([""]);

  // Carrega receitas do backend ao iniciar
  useEffect(() => {
    fetch("http://localhost:3001/receitas")
      .then((res) => res.json())
      .then((data) => {
        const novasReceitas = { ...receitasIniciais };
        data.forEach((r) => {
          if (!novasReceitas[r.categoria]) novasReceitas[r.categoria] = [];
          // Só adiciona se não existir slug igual
          if (
            !novasReceitas[r.categoria].some((item) => item.slug === r.slug)
          ) {
            novasReceitas[r.categoria].push(r);
          }
        });
        setReceitas(novasReceitas);
      });
  }, []);

  // Helpers para campos dinâmicos
  const handleArrayChange = (setter, arr, idx, value) => {
    const novo = [...arr];
    novo[idx] = value;
    setter(novo);
  };
  const handleAddField = (setter, arr) => setter([...arr, ""]);
  const handleRemoveField = (setter, arr, idx) => {
    if (arr.length === 1) return;
    setter(arr.filter((_, i) => i !== idx));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target.result);
        setImage(""); // Limpa o campo de URL se o usuário fizer upload
      };
      reader.readAsDataURL(file);
    }
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaReceita = {
      titulo,
      slug: slugify(titulo),
      image: uploadedImage || image || "/assets/receita_default.png", // Prioriza imagem enviada
      descricao,
      categoria,
      ingredientes: temMassaRecheio
        ? {
            massa: ingredientesMassa.filter((i) => i.trim()),
            recheio: ingredientesRecheio.filter((i) => i.trim()),
          }
        : ingredientesGerais.filter((i) => i.trim()),
      utensilhos: utensilhos.filter((u) => u.trim()),
      preparo: temMassaRecheio
        ? {
            massa: preparoMassa.filter((p) => p.trim()),
            recheio: preparoRecheio.filter((p) => p.trim()),
          }
        : preparoGeral.filter((p) => p.trim()),
    };

    // Salva no backend
    await fetch("http://localhost:3001/receitas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaReceita),
    });

    setReceitas((prev) => ({
      ...prev,
      [categoria]: [...(prev[categoria] || []), novaReceita],
    }));

    setShowModal(false);
    setTitulo("");
    setImage("");
    setDescricao("");
    setTemMassaRecheio(false);
    setIngredientesMassa([""]);
    setIngredientesRecheio([""]);
    setIngredientesGerais([""]);
    setUtensilhos([""]);
    setPreparoMassa([""]);
    setPreparoRecheio([""]);
    setPreparoGeral([""]);

    setUploadedImage(null); // Limpa imagem enviada após salvar
  };

  return (
    <div className="p-6 max-w-4xl w-full mx-auto bg-white rounded-lg mt-6">
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        Colocar minhas receitas
      </button>

      {/* Modal de cadastro */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Cadastrar Receita</h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-3 max-h-[80vh] overflow-y-auto"
            >
              <input
                type="text"
                placeholder="Nome da receita"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="URL da foto (opcional)"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setUploadedImage(null); // Limpa upload se digitar URL
                }}
                className="border p-2 w-full"
              />
              {/* Campo para upload de imagem */}
              <div>
                <label className="block mb-1">Ou envie uma foto:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="border p-2 w-full"
                />
              </div>
              {/* Preview da imagem escolhida */}
              {(uploadedImage || image) && (
                <div className="mb-2">
                  <img
                    src={uploadedImage || image}
                    alt="Pré-visualização"
                    className="w-full h-40 object-cover rounded border"
                  />
                </div>
              )}
              <textarea
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="border p-2 w-full"
                required
              />
              <div>
                <label className="block mb-1">Categoria:</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="border p-2 w-full"
                >
                  {categorias.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={temMassaRecheio}
                    onChange={(e) => setTemMassaRecheio(e.target.checked)}
                  />
                  Tem massa e recheio?
                </label>
              </div>
              {/* Ingredientes */}
              {temMassaRecheio ? (
                <>
                  <div>
                    <label>Ingredientes da Massa:</label>
                    {ingredientesMassa.map((ing, idx) => (
                      <div key={idx} className="flex gap-2 mb-1">
                        <input
                          type="text"
                          value={ing}
                          onChange={(e) =>
                            handleArrayChange(
                              setIngredientesMassa,
                              ingredientesMassa,
                              idx,
                              e.target.value
                            )
                          }
                          className="border p-2 flex-1"
                          required={idx === 0}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveField(
                              setIngredientesMassa,
                              ingredientesMassa,
                              idx
                            )
                          }
                        >
                          -
                        </button>
                        {idx === ingredientesMassa.length - 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleAddField(
                                setIngredientesMassa,
                                ingredientesMassa
                              )
                            }
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <label>Ingredientes do Recheio:</label>
                    {ingredientesRecheio.map((ing, idx) => (
                      <div key={idx} className="flex gap-2 mb-1">
                        <input
                          type="text"
                          value={ing}
                          onChange={(e) =>
                            handleArrayChange(
                              setIngredientesRecheio,
                              ingredientesRecheio,
                              idx,
                              e.target.value
                            )
                          }
                          className="border p-2 flex-1"
                          required={idx === 0}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveField(
                              setIngredientesRecheio,
                              ingredientesRecheio,
                              idx
                            )
                          }
                        >
                          -
                        </button>
                        {idx === ingredientesRecheio.length - 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleAddField(
                                setIngredientesRecheio,
                                ingredientesRecheio
                              )
                            }
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div>
                  <label>Ingredientes:</label>
                  {ingredientesGerais.map((ing, idx) => (
                    <div key={idx} className="flex gap-2 mb-1">
                      <input
                        type="text"
                        value={ing}
                        onChange={(e) =>
                          handleArrayChange(
                            setIngredientesGerais,
                            ingredientesGerais,
                            idx,
                            e.target.value
                          )
                        }
                        className="border p-2 flex-1"
                        required={idx === 0}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveField(
                            setIngredientesGerais,
                            ingredientesGerais,
                            idx
                          )
                        }
                      >
                        -
                      </button>
                      {idx === ingredientesGerais.length - 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleAddField(
                              setIngredientesGerais,
                              ingredientesGerais
                            )
                          }
                        >
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* Utensílios */}
              <div>
                <label>Utensílios:</label>
                {utensilhos.map((ut, idx) => (
                  <div key={idx} className="flex gap-2 mb-1">
                    <input
                      type="text"
                      value={ut}
                      onChange={(e) =>
                        handleArrayChange(
                          setUtensilhos,
                          utensilhos,
                          idx,
                          e.target.value
                        )
                      }
                      className="border p-2 flex-1"
                      required={idx === 0}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveField(setUtensilhos, utensilhos, idx)
                      }
                    >
                      -
                    </button>
                    {idx === utensilhos.length - 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          handleAddField(setUtensilhos, utensilhos)
                        }
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {/* Modo de preparo */}
              {temMassaRecheio ? (
                <>
                  <div>
                    <label>Modo de Preparo da Massa:</label>
                    {preparoMassa.map((prep, idx) => (
                      <div key={idx} className="flex gap-2 mb-1">
                        <input
                          type="text"
                          value={prep}
                          onChange={(e) =>
                            handleArrayChange(
                              setPreparoMassa,
                              preparoMassa,
                              idx,
                              e.target.value
                            )
                          }
                          className="border p-2 flex-1"
                          required={idx === 0}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveField(
                              setPreparoMassa,
                              preparoMassa,
                              idx
                            )
                          }
                        >
                          -
                        </button>
                        {idx === preparoMassa.length - 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleAddField(setPreparoMassa, preparoMassa)
                            }
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div>
                    <label>Modo de Preparo do Recheio:</label>
                    {preparoRecheio.map((prep, idx) => (
                      <div key={idx} className="flex gap-2 mb-1">
                        <input
                          type="text"
                          value={prep}
                          onChange={(e) =>
                            handleArrayChange(
                              setPreparoRecheio,
                              preparoRecheio,
                              idx,
                              e.target.value
                            )
                          }
                          className="border p-2 flex-1"
                          required={idx === 0}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveField(
                              setPreparoRecheio,
                              preparoRecheio,
                              idx
                            )
                          }
                        >
                          -
                        </button>
                        {idx === preparoRecheio.length - 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleAddField(setPreparoRecheio, preparoRecheio)
                            }
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div>
                  <label>Modo de Preparo:</label>
                  {preparoGeral.map((prep, idx) => (
                    <div key={idx} className="flex gap-2 mb-1">
                      <input
                        type="text"
                        value={prep}
                        onChange={(e) =>
                          handleArrayChange(
                            setPreparoGeral,
                            preparoGeral,
                            idx,
                            e.target.value
                          )
                        }
                        className="border p-2 flex-1"
                        required={idx === 0}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveField(setPreparoGeral, preparoGeral, idx)
                        }
                      >
                        -
                      </button>
                      {idx === preparoGeral.length - 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleAddField(setPreparoGeral, preparoGeral)
                          }
                        >
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
              >
                Salvar Receita
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mx-auto p-6 bg-white/80 rounded-lg max-w-5xl w-full ">
        <h2 className="text-2xl font-bold mb-4">Receitas sem glúten</h2>

        {/* Menu de categorias */}
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
