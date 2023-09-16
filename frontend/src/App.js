import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home.jsx"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
