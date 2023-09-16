import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home.jsx"
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperarsenha" element={<RecuperarSenha />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
