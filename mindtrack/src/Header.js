import React, { useState, useEffect, useContext } from "react";
import "./Header.css"; 
import ConfigLogin from "./ConfigLogin";
import imagem1 from "./Imagens/Logado.png";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { UserContext } from "./UserContext";
import axios from "axios";
const Header = () => {
    
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [showWidget2, setShowWidget2] = useState(false);
    const checkIsMobile = () => {
    const isMobile = window.innerWidth <= 768;
    setIsMobile(isMobile);
    };
    const { email, nome, setNome } = useContext(UserContext);
    const storedEmail = localStorage.getItem("email"); // Recupera o valor de email do localStorage
     
    useEffect(() => {
      if (storedEmail) {
        axios
          .get(`http://192.168.0.9:8080/professional/${storedEmail}`)
          .then((response) => {            
            if (response.data.object && response.data.object.name) {
              setNome(response.data.object.name);
              localStorage.setItem("nome", nome);              
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [storedEmail, setNome, nome]);
    useEffect(() => {
      checkIsMobile();
      window.addEventListener("resize", checkIsMobile);
      return () => {
        window.removeEventListener("resize", checkIsMobile);
      };
    }, []);

    function toggleWidget() {
      setShowWidget2((prevState) => !prevState);
    }
  
    function handleLogin() {
toggleWidget();
    }
  
    const agora = moment();
    const hora = agora.hour();
    let saudacao = '';
  
    if (hora >= 5 && hora < 12) {
      saudacao = 'Bom dia';
    } else if (hora >= 12 && hora < 18) {
      saudacao = 'Boa tarde';
    } else {
      saudacao = 'Boa noite';
    }

    return (
      <>
      {isMobile && (
              <>
<div className="grid-container">

<div className="MenuDireito2">
  
  <div className="Titulos2">        
    <h1 className="title1">{saudacao}</h1>
    <h1 className="title2">{nome.toUpperCase()}</h1>
  </div>
  <button className="img-button2" onClick={handleLogin}>
    <img src={imagem1} alt="Descrição da imagem" />
  </button>
  </div>
</div>
              </>
      )
      }
      {!isMobile &&(
    <>
    
     <div className="grid-container">
     
        <div className="MenuDireito">
          <div className="Titulos">        
            <h1 className="title1">{saudacao}</h1>
            <h1 className="title2">{nome.toUpperCase()}</h1>
          </div>
        <button className="img-button" onClick={handleLogin}>
            <img src={imagem1} alt="Descrição da imagem" />
          </button> 
          </div>
        </div>
            </>
          )}
          {showWidget2 && <div className="widget2-container"><ConfigLogin /></div>}
      </>
    );

}

export default Header;
