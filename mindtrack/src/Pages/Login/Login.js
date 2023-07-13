// Login.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../Imagens/Log.png";
import ou from "../../Imagens/ou.png";
import "../../Fonts.css";
import axios from 'axios';
import { UserContext } from '../../UserContext';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // New state variable
  const navigate = useNavigate();
  const { email, setEmail } = useContext(UserContext);

  function handleCriarConta() {
    navigate("/CriarConta");
  }

  function handleForgotPassword() {
    // Lógica para recuperar a senha
  }

  function handleLogin() {
    if(username, password){
      console.log("Fazendo login...");
      setIsLoading(true); // Ativar o estado de carregamento
  
      // Lógica de login
      const requestBody = {
        email: username,
        password: password
      };
  
      const url = 'http://192.168.0.9:8080/professional/authentication';
  
      axios.post(url, requestBody)
        .then(response => {
          console.log('Status code:', response.status);
          console.log('Response body:', response.data);
          console.log(requestBody);
          if (response.status === 200) {
            // Autenticação bem-sucedida
            setAuthenticated(true);
            setError("");
            localStorage.setItem("email", username); // Armazena o valor de email no localStorage  
            setTimeout(() => {
              setIsLoading(true);
              navigate("/Inicio");
            }, 1000);
          } else {            
            setIsLoading(false);
            setError("Credenciais inválidas");
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.error('Error:', error);
        })
    }
    else{
            setError("Preencha os campos Usuário e Senha!");
            setIsLoading(false);
    }
    
  }

  return (
    <>
    <div className="login-container">
      <div className="login-form">
        <h1 className="titlog">LOGIN</h1>
        <img className="ImagemLogin" src={logo} alt="Imagem de Login" />
        <div className="campos1-form">
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Usuário:"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="campos2-form">
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Senha:"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isLoading && (
         <> 
          <div className="loading-bar">
            <div className="loading-bar-fill" />
          </div>
          <p>Efetuando Login...</p>
          </>
        )}
        <button className="login-button" onClick={handleLogin}>
          ENTRAR
        </button>
        <button className="link-button" onClick={handleForgotPassword}>
          Esqueci minha senha
        </button>
        
        {error && <p className="error-message">{error}</p>}
        <img src={ou} alt="ou" style={{ width: '290px', marginBottom: '2%' }} />

        <button className="Criar-button" onClick={handleCriarConta}>
          Criar uma nova conta
        </button>

        
      </div>
    </div>
    </>
  );
}

export default Login;
