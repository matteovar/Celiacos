import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Body from './components/Body'
import Receitas from './components/Receitas'
import Locais from './components/Locais'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/receitas" element={<Receitas />} />
        <Route path="/locais" element={<Locais />} />
      </Routes>
    </Router>
  )
}

export default App
