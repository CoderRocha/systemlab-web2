import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//styles
import './App.css'

//pages & components
import Login from './pages/login/Login.js'
import Home from './pages/home/Home.js'
import Atendimentos from './components/atendimentos/Atendimentos.js';
import Exames from './components/exames/Exames.js';
import Relatorios from './pages/relatorios/Relatorios.js';
import CadastrarAtendimento from './pages/cadastrarAtendimento/CadastrarAtendimento.js'
import CadastrarExame from './pages/cadastrarExame/CadastrarExame.js';

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/atendimentos" element={<Atendimentos />} />
            <Route path="/exames" element={<Exames />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/cadastraratendimento" element={<CadastrarAtendimento />} />
            <Route path="/cadastrarexame" element={<CadastrarExame />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;