import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//styles
import './App.css'

//pages & components
import Login from './pages/login/Login.js'
import Registrar from './pages/registrar/Registrar.js'
import Home from './pages/home/Home.js'
import Atendimentos from './components/atendimentos/Atendimentos.js';
import Exames from './components/exames/Exames.js';
import Relatorios from './pages/relatorios/Relatorios.js';
import CadastrarAtendimento from './pages/cadastrarAtendimento/CadastrarAtendimento.js'
import CadastrarExame from './pages/cadastrarExame/CadastrarExame.js';
import ErrorPage from './components/error/ErrorPage.js';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/home" element={<Home />} />
            <Route path="/atendimentos" element={<Atendimentos />} />
            <Route path="/exames" element={<Exames />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/cadastraratendimento" element={<CadastrarAtendimento />} />
            <Route path="/cadastrarexame" element={<CadastrarExame />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;