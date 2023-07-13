import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login/Login";
import Inicio from "./Pages/Inicio/Inicio";
import Formularios from './Pages/Formularios/Formularios';
import Financeiro from './Pages/Financeiro/Financeiro';
import Pacientes from './Pages/Pacientes/Pacientes';
import Interessados from './Pages/Interessados/Interessados';
import CriarConta from './Pages/CriarConta/CriarConta';
import Widget from './Pages/widgets/widget-2/Widget';
import CriarPac from './Pages/Pacientes/CadPaciente';
import ConfigLogin from './ConfigLogin';
import { UserProvider } from './UserContext';

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<UserProvider><Login /></UserProvider>} />
      <Route path="/CriarConta" element={<CriarConta />} />
      <Route path="/Inicio" element={<UserProvider><Inicio /></UserProvider>} />
      <Route path="/Formularios" element={<UserProvider><Formularios /></UserProvider>} />
      <Route path="/Financeiro" element={<UserProvider><Financeiro /></UserProvider>} />
      <Route path="/Pacientes" element={<UserProvider><Pacientes /></UserProvider>} />
      <Route path="/Interessados" element={<UserProvider><Interessados /></UserProvider>} />
      <Route path="/Widget" element={<UserProvider><Widget /></UserProvider>} />
      <Route path="/CriarPac" element={<UserProvider><CriarPac /></UserProvider>} />
      <Route path="/ConfigLogin" element={<UserProvider><ConfigLogin /></UserProvider>} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  );
}

export default App;
