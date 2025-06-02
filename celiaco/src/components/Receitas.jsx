const Receitas = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Receitas sem glúten</h2>
      <ul className="space-y-2">
        <li>Pão de queijo</li>
        <li>Bolo de fubá sem glúten</li>
        <li>Panqueca de aveia sem trigo</li>
        {/* Você pode adicionar cards depois se quiser estilizar */}
      </ul>
    </div>
  )
}

export default Receitas
