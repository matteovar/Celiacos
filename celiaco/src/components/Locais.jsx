import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAuth } from "./AuthContext";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Locais = () => {
  const [locais, setLocais] = useState([]);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("restaurante");
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [filtroBusca, setFiltroBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const { user } = useAuth();

  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map").setView([-23.55052, -46.633308], 12);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    mapRef.current = map;
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/locais")
      .then((res) => res.json())
      .then((data) => {
        setLocais(data);
        atualizarMarcadores(data, filtroBusca, filtroCategoria);
      })
      .catch((err) => {
        console.error("Erro ao buscar locais:", err);
        alert("Erro ao buscar locais do servidor");
      });
  }, [filtroBusca, filtroCategoria]);

  const atualizarMarcadores = (locaisAtuais, termoBusca, categoriaSelecionada = "todos") => {
    if (!mapRef.current) return;

    markersRef.current.forEach((m) => mapRef.current.removeLayer(m));
    markersRef.current = [];

    const termo = termoBusca.toLowerCase();

    const locaisFiltrados = locaisAtuais.filter((local) => {
      const nomeMatch = local.nome.toLowerCase().includes(termo);
      const categoriaMatch =
        categoriaSelecionada === "todos" || local.categoria === categoriaSelecionada;
      return nomeMatch && categoriaMatch;
    });

    locaisFiltrados.forEach((local) => {
      const marker = L.marker([local.lat, local.lng])
        .addTo(mapRef.current)
        .on("click", () => setSelectedLocal(local));
      markersRef.current.push(marker);
    });
  };

  const handleAddLocal = async () => {
    if (!nome.trim() || !endereco.trim()) {
      alert("Preencha o nome e o endereço!");
      return;
    }

    const enderecoLower = endereco.toLowerCase();
    if (
      !enderecoLower.includes("guarulhos") &&
      !enderecoLower.includes("são paulo") &&
      !enderecoLower.includes("sp")
    ) {
      alert("Inclua cidade e estado no endereço. Ex: 'Guarulhos, SP'");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`,
        {
          headers: { "User-Agent": "Mozilla/5.0 (celiaco-maps-app)" },
        }
      );

      const data = await response.json();
      if (!data || data.length === 0) {
        alert("Endereço não encontrado. Tente incluir cidade, número e estado.");
        return;
      }

      const { lat, lon } = data[0];

      const novoLocal = {
        nome,
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        descricao,
        endereco,
        categoria,
      };

      const res = await fetch("http://127.0.0.1:5000/api/locais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoLocal),
      });

      if (res.ok) {
        const locaisAtualizados = [...locais, novoLocal];
        setLocais(locaisAtualizados);
        atualizarMarcadores(locaisAtualizados, filtroBusca, filtroCategoria);
        setNome("");
        setEndereco("");
        setDescricao("");
        setCategoria("restaurante");
        setMostrarFormulario(false);
        alert("Local adicionado com sucesso!");
      } else {
        const erroTexto = await res.text();
        console.error("Erro ao salvar no backend:", erroTexto);
        alert("Erro ao salvar no servidor");
      }
    } catch (error) {
      console.error("Erro ao adicionar local:", error);
      alert("Erro ao buscar coordenadas do endereço");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-white border-r p-4 overflow-auto shadow-lg">
        <h2 className="text-2xl font-bold text-[#8B0000] mb-4">Locais Mapeados</h2>

        <input
          type="text"
          placeholder="🔍 Buscar por nome..."
          value={filtroBusca}
          onChange={(e) => {
            const valor = e.target.value;
            setFiltroBusca(valor);
          }}
          className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#C0392B]"
        />

        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="w-full mb-4 border px-3 py-2 rounded"
        >
          <option value="todos">Todas as categorias</option>
          <option value="restaurante">Restaurantes</option>
          <option value="padaria">Padarias</option>
          <option value="hamburgueria">Hamburgueria</option>
          <option value="pizzaria">Pizzaria</option>
          <option value="mercado">Mercados</option>
          <option value="outro">Outros</option>
        </select>

        {user && !mostrarFormulario && (
          <button
            onClick={() => setMostrarFormulario(true)}
            className="w-full mb-4 bg-gradient-to-r from-[#8B0000] via-[#C0392B] to-[#E74C3C] text-white py-2 px-4 rounded shadow hover:opacity-90 transition"
          >
            ➕ Adicionar Local
          </button>
        )}

        {mostrarFormulario && (
          <div className="border rounded-md p-4 mb-6 bg-gray-50 shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-[#C0392B]">Novo Local</h3>
              <button
                onClick={() => setMostrarFormulario(false)}
                className="text-gray-500 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              placeholder="Nome do local"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full mb-2 border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Endereço completo"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full mb-2 border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Descrição (opcional)"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full mb-2 border p-2 rounded"
            />
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full mb-2 border p-2 rounded"
            >
              <option value="restaurante">Restaurante</option>
              <option value="padaria">Padaria</option>
              <option value="hamburgueria">Hamburgueria</option>
              <option value="pizzaria">Pizzaria</option>
              <option value="mercado">Mercado</option>
              <option value="outro">Outro</option>
            </select>

            <button
              onClick={handleAddLocal}
              className="w-full bg-[#C0392B] text-white py-2 rounded hover:bg-[#A93226] transition"
            >
              Enviar Local
            </button>
          </div>
        )}

        {selectedLocal && (
          <div className="bg-gray-100 p-4 border rounded shadow-inner">
            <h3 className="text-lg font-bold text-[#8B0000] mb-2">📍 {selectedLocal.nome}</h3>
            <p className="mb-1">
              <span className="font-medium">📬 Endereço:</span><br /> {selectedLocal.endereco}
            </p>
            {selectedLocal.descricao && (
              <p className="mb-2">
                <span className="font-medium">📝 Descrição:</span><br /> {selectedLocal.descricao}
              </p>
            )}
            {selectedLocal.categoria && (
              <p className="mb-2">
                <span className="font-medium">🏷️ Categoria:</span><br /> {selectedLocal.categoria}
              </p>
            )}
            <button
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => setSelectedLocal(null)}
            >
              Fechar
            </button>
          </div>
        )}
      </div>

      <div id="map" className="flex-1" style={{ height: "100vh" }}></div>
    </div>
  );
};

export default Locais;
