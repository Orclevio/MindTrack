import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import "./Menu.css"; 
import consulta from "./Imagens/consulta.png";
import financeiro from "./Imagens/Financeiro.png";
import formulario from "./Imagens/Formulario.png";
import paciente from "./Imagens/pacientes.png";
import interessado from "./Imagens/Paciente.png";
import Hamb from "./Imagens/hamb.png";

const Menu = () => {
  const [menuVisivel, setMenuVisivel] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    const isMobile = window.innerWidth <= 768;
    setIsMobile(isMobile);
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);
  const toggleMenu = () => {
    setMenuVisivel(!menuVisivel);
  };



  return (
    <>
    {isMobile && (
            <>
              <div className="bottom-navigation" >
                <Link to="/Inicio" className={`menu-button ${location.pathname === '/Inicio' ? 'active' : ''}`}>
                  <img src={consulta} alt="Descrição da imagem" />
                  
                </Link>

                <Link to="/Formularios" className={`menu-button ${location.pathname === '/Formularios' ? 'active' : ''}`}>
                  <img src={formulario} alt="Descrição da imagem" />
                  
                </Link>

                 <Link to="/Financeiro" className={`menu-button ${ location.pathname === '/Financeiro' ? 'active' : ''}`}>
                  <img src={financeiro} alt="Descrição da imagem" />
                  
                </Link>
                <Link to="/Pacientes" className={`menu-button ${location.pathname === '/Pacientes' ? 'active' : ''}`}>
                  <img src={paciente} alt="Descrição da imagem" />
                  
                </Link>
                <Link to="/Interessados" className={`menu-button ${ location.pathname === '/Interessados' ? 'active' : ''}`}>
                  <img src={interessado} alt="Descrição da imagem" />
                  
                </Link>
              </div>
            </>
    )
    }
    {!isMobile &&(
          <>
            <div className={`menu-lateral ${menuVisivel ? 'visivel' : 'oculto'}`}>
              <button className="toggle-button" onClick={toggleMenu}>
              <img src={Hamb} alt="Descrição da imagem" className='imgHamb'/>
              </button>
              <h1 className="sidebar-title">MIND TRACK</h1>

              <Link to="/Inicio" className={`menu-button ${location.pathname === '/Inicio' ? 'active' : ''}`}>
                <img src={consulta} alt="Descrição da imagem" style={{ maxWidth: '15%', verticalAlign: 'middle' }}/>Consultas
              </Link>

              <Link to="/Formularios" className={`menu-button ${location.pathname === '/Formularios' ? 'active' : ''}`}>
                <img src={formulario} alt="Descrição da imagem" style={{ maxWidth: '15%', verticalAlign: 'middle' }}/>Formulários
              </Link>

              <Link to="/Financeiro" className={`menu-button ${ location.pathname === '/Financeiro' ? 'active' : ''}`}>
                <img src={financeiro} alt="Descrição da imagem" style={{ maxWidth: '15%', verticalAlign: 'middle' }}/>Financeiro
              </Link> 

              <Link to="/Pacientes" className={`menu-button ${location.pathname === '/Pacientes' ? 'active' : ''}`}>
                <img src={paciente} alt="Descrição da imagem" style={{ maxWidth: '15%', verticalAlign: 'middle' }}/>Pacientes
              </Link> 

              <Link to="/Interessados" className={`menu-button ${location.pathname === '/Interessados' ? 'active' : ''}`}>
                <img src={interessado} alt="Descrição da imagem" style={{ maxWidth: '15%', verticalAlign: 'middle' }}/>Interessados
              </Link> 
            </div>
          </>
        )}
    </>
  );
};

export default Menu;