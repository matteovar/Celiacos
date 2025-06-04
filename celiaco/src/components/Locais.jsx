import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Locais = () => {
  const [locais, setLocais] = useState([]);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [filtroBusca, setFiltroBusca] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // controla visibilidade do formulário

  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapRef.current) return;
    const map = L.map("map").setView([-23.55052, -46.633308], 12);
    mapRef.current = map;
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map);
  }, []);

  useEffect(() => {
    fetch("https://celiaco-backend.onrender.com/api/locais")
      .then((res) => res.json())
      .then((data) => {
        setLocais(data);
        atualizarMarcadores(data, "");
      })
      .catch((err) => {
        console.error("Erro ao buscar locais:", err);
        alert("Erro ao buscar locais do servidor");
      });
  }, []);

  const atualizarMarcadores = (locaisAtuais, termoBusca) => {
    if (!mapRef.current) return;
    markersRef.current.forEach((m) => mapRef.current.removeLayer(m));
    markersRef.current = [];

    const termo = termoBusca.toLowerCase();

    const locaisFiltrados = locaisAtuais.filter((local) =>
      local.nome.toLowerCase().includes(termo)
    );

    locaisFiltrados.forEach((local) => {
      const marker = L.marker([local.lat, local.lng])
        .addTo(mapRef.current)
        .on("click", () => setSelectedLocal(local));
      markersRef.current.push(marker);
    });
  };

  const handleAddLocal = async () => {
    if (!nome || !endereco) {
      alert("Preencha o nome e o endereço!");
      return;
    }
    if (
      !endereco.toLowerCase().includes("guarulhos") &&
      !endereco.toLowerCase().includes("são paulo") &&
      !endereco.toLowerCase().includes("sp")
    ) {
      alert(
        "Endereço muito genérico. Inclua cidade e estado. Ex: 'Av. Esperança, 600, Guarulhos, SP, Brasil'"
      );
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          endereco
        )}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (celiaco-maps-app)",
          },
        }
      );

      const data = await response.json();
      if (!data || data.length === 0) {
        alert(
          "Endereço não encontrado! Tente incluir cidade, número e estado."
        );
        return;
      }

      const { lat, lon } = data[0];
      const novoLocal = {
        nome,
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        descricao,
        endereco,
      };

      const res = await fetch("https://celiaco-backend.onrender.com/api/locais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoLocal),
      });

      if (res.ok) {
        const locaisAtualizados = [...locais, novoLocal];
        setLocais(locaisAtualizados);
        atualizarMarcadores(locaisAtualizados, filtroBusca);
        setNome("");
        setEndereco("");
        setDescricao("");
        setMostrarFormulario(false); // fecha o formulário ao adicionar com sucesso
        alert("Local adicionado com sucesso!");
      } else {
        console.error("Erro ao salvar no backend:", await res.text());
        alert("Erro ao salvar no servidor");
      }
    } catch (error) {
      console.error("Erro ao adicionar local:", error);
      alert("Erro ao buscar coordenadas do endereço");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4 overflow-auto ">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={filtroBusca}
            onChange={(e) => {
              const valor = e.target.value;
              setFiltroBusca(valor);
              atualizarMarcadores(locais, valor);
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex items-center justify-between mb-2">
          {!mostrarFormulario && (
            <button
              onClick={() => setMostrarFormulario(true)}
              className=" bg-gradient-to-r from-[#8B0000] via-[#C0392B] to-[#E74C3C] text-white p-2 rounded"
            >
              Adicionar Local
            </button>
          )}

          {mostrarFormulario && (
            <>
              <h3 className="text-lg font-medium">Adicionar Novo Local</h3>
              <button
                onClick={() => setMostrarFormulario(false)}
                className="text-gray-700 bg-gray-200 px-3 py-1 rounded font-bold hover:bg-gray-300"
                aria-label="Fechar formulário"
              >
                X
              </button>
            </>
          )}
        </div>

        {mostrarFormulario && (
          <div className="border-t pt-4 mb-10">
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
            <button
              onClick={handleAddLocal}
              className="w-full  bg-gradient-to-r from-[#8B0000] via-[#C0392B] to-[#E74C3C] text-white p-2 rounded"
            >
              Enviar Local
            </button>
          </div>
        )}


        {selectedLocal && (
          <>
            <h2 className="text-xl font-semibold mb-2">Detalhes do Local</h2>
            <p>
              <strong>Nome:</strong> {selectedLocal.nome}
            </p>
            <p className="mt-2">
              <strong>Endereço:</strong> {selectedLocal.endereco || "—"}
            </p>
            {selectedLocal.descricao && (
              <p className="mt-2">
                <strong>Descrição:</strong> {selectedLocal.descricao}
              </p>
            )}
            <button
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => setSelectedLocal(null)}
            >
              Fechar
            </button>
          </>
        )}
      </div>

      <div id="map" className="flex-1" style={{ height: "100%" }}></div>
    </div>
  );
};

export default Locais;
