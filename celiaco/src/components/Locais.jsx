const Locais = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Locais seguros para celíacos</h2>
      <ul className="space-y-2">
        <li>Padaria Sem Glúten - Av. Paulista, SP</li>
        <li>Restaurante Vida Leve - Moema, SP</li>
        <li>Grão Sabor - Pinheiros, SP</li>
        {/* Pode usar mapa depois também! */}
      </ul>
    </div>
  )
}

export default Locais
