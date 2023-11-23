import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import React from 'react';


//Pages
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha';
import Home from "./pages/Home/Home.jsx"
import Perfil from './pages/Perfil/Perfil.jsx';
import Favoritos from './pages/Favoritos/Favoritos';
import CalcRendimento from './pages/CalcRendimento/CalcRendimento';
import Sobre from './pages/Sobre/Sobre';
import Suporte from './pages/Suporte/Suporte';
import { SearchContextProvider } from './context/SearchContext';
import FavoritesProvider from './context/Favorites.js';
import InfoPosto from './pages/InfoPosto/InfoPosto.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/resetpassword" element={<RecuperarSenha />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/calcRend" element={<CalcRendimento />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/suporte" element={<Suporte />} />
            <Route path="/infoPosto/:postoId" element={<InfoPosto />} />

            <Route path="/infoPosto" element={<InfoPosto />} />
            <Route path="*" element={<Home />} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
