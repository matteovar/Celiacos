import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Body from './components/Body'
import Receitas from './components/Receitas'
import Locais from './components/Locais'
import ReceitaDetalhe from './components/ReceitaDetalhe' 
import Formulario from './components/Formulario'
import { ReceitasProvider } from './components/ReceitasContext' // <-- adicione isto

function App() {
  return (
    <ReceitasProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/receitas" element={<Receitas />} />
          <Route path="/locais" element={<Locais />} />
          <Route path="/receitas/:slug" element={<ReceitaDetalhe />} /> 
          <Route path="/formulario" element={<Formulario />} /> 
        </Routes>
      </Router>
    </ReceitasProvider>
  )
}

export default App