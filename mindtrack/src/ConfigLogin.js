import { useState } from "react";
import "./ConfigLogin.css";
import { useNavigate } from "react-router-dom";
import exit from "./Imagens/exit.png";

function ConfigLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(true);


  function encerrarSessao() {
    setIsLoading(true);

    // Simulando o carregamento com um setTimeout
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 2000);
  }

  function alterarSenha() {
    // Lógica para alterar a senha aqui
  }
  function closeConfig() {
    setIsConfigOpen(false);
  }
  if (isConfigOpen===false) {
    return null;
  }

  return (
    <div className="blocoLogin">
      <div className="titleContainer">
      <h2 className="titulot">Configurações de Login</h2>
      <button className="bntfechar" onClick={closeConfig}><img src={exit} alt="Imagem de Login" /></button>
      </div>
      
      <button className="bntprincipais" onClick={alterarSenha}>
        Alterar senha
      </button>

      
      <button className="bntprincipais" onClick={encerrarSessao}>
        Encerrar sessão
      </button>
      {isLoading && (
        <>
          <div className="loading-bar2">
            <div className="loading-bar2-fill" />
          </div>
          <p style={{ fontSize: "12px" }}>Fazendo Logoff...</p>
        </>
      )}

    </div>
  );
}

export default ConfigLogin;
