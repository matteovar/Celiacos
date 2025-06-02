import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";

const locaisIniciais = [
  { 
    nome: "DeliBurguer - Alto da Lapa", 
    lat: -23.537601, 
    lng: -46.718949,
    descricao: "Hamburgueria 100% sem glúten no Alto da Lapa."
  },
  { 
    nome: "DeliBurguer - Brooklin", 
    lat: -23.600442, 
    lng: -46.688575,
    descricao: "Unidade Brooklin da DeliBurguer, especializada em opções sem glúten."
  },
  { 
    nome: "Pandan", 
    lat: -23.560928, 
    lng: -46.697898,
    descricao: "Padaria artesanal sem glúten."
  },
  { 
    nome: "Cantinho Nina’s", 
    lat: -23.561669, 
    lng: -46.596198,
    descricao: "Doces e salgados sem glúten."
  },
  { 
    nome: "Colher de Mel", 
    lat: -23.607912, 
    lng: -46.687939,
    descricao: "Padaria e confeitaria sem glúten, com opções veganas."
  },
  { 
    nome: "Grão Fino", 
    lat: -23.581445, 
    lng: -46.676937,
    descricao: "Padaria e restaurante funcional sem glúten, sem lácteos e sem conservantes com receitas saudáveis."
  },
  { 
    nome: "Grão Fino", 
    lat: -23.610090, 
    lng: -46.681847,
    descricao: "Padaria e restaurante funcional sem glúten, sem lácteos e sem conservantes com receitas saudáveis."
  },
  { 
    nome: "Pizza ForFun", 
    lat: -23.496445, 
    lng: -46.637238,
    descricao: "A Pizza ForFun é uma pizzaria que oferece opções de pizzas sem glúten, com uma variedade de sabores e ingredientes frescos. (Somente Drive-Thru)."
  },
  { 
    nome: "Pizza ForFun", 
    lat: -23.527325, 
    lng: -46.566771,
    descricao: "A Pizza ForFun é uma pizzaria que oferece opções de pizzas sem glúten, com uma variedade de sabores e ingredientes frescos. (Somente Drive-Thru)."
  },
  { 
    nome: "Pizza ForFun", 
    lat: -23.561066, 
    lng: -46.689315,
    descricao: "A Pizza ForFun é uma pizzaria que oferece opções de pizzas sem glúten, com uma variedade de sabores e ingredientes frescos. (Somente Drive-Thru)."
  },
  { 
    nome: "Pizza ForFun", 
    lat: -23.5649, 
    lng: -46.6485,
    descricao: "A Pizza ForFun é uma pizzaria que oferece opções de pizzas sem glúten, com uma variedade de sabores e ingredientes frescos. (Somente Drive-Thru)."
  },
  { 
    nome: "Tapioca do Ju", 
    lat: -23.5515, 
    lng: -46.7211,
    descricao: "Tapioca do Ju é uma tapiocaria que oferece opções de tapiocas sem glúten, com uma variedade de recheios doces e salgados."
  },
  { 
    nome: "Tapioca do Ju", 
    lat: -23.44949980761494, 
    lng: -46.555685693252784,
    descricao: "Tapioca do Ju é uma tapiocaria que oferece opções de tapiocas sem glúten, com uma variedade de recheios doces e salgados."
  },
];

const Locais = () => {
  const [locais, setLocais] = useState(locaisIniciais);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;
    const map = L.map("map").setView([-23.55052, -46.633308], 12);
    mapRef.current = map;

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map);

    locais.forEach((local) => {
      L.marker([local.lat, local.lng])
        .addTo(map)
        .bindPopup(`<b>${local.nome}</b><br/>${local.descricao || ""}`);
    });
  }, []);

  // Atualiza marcadores quando locais mudam
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) mapRef.current.removeLayer(layer);
    });
    locais.forEach((local) => {
      L.marker([local.lat, local.lng])
        .addTo(mapRef.current)
        .bindPopup(`<b>${local.nome}</b><br/>${local.descricao || ""}`);
    });
  }, [locais]);

  const handleAddLocal = async () => {
    if (!nome || !endereco) return;
    // Busca coordenadas do endereço usando Nominatim
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      setLocais([
        ...locais,
        { nome, lat: parseFloat(lat), lng: parseFloat(lon), descricao },
      ]);
      setNome("");
      setEndereco("");
      setDescricao("");
    } else {
      alert("Endereço não encontrado!");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Nome do local"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Descrição (opcional)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border p-2"
        />
        <button onClick={handleAddLocal} className="bg-blue-500 text-white p-2 rounded">
          Adicionar Local
        </button>
      </div>
      <div id="map" style={{ height: "750px" }}></div>
    </div>
  );
};

export default Locais;