import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CadPaciente() {
  const { crp } = useContext(UserContext);
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [responsible, setResponsible] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTouchMove = (event) => {
      if (event.touches.length > 1) {
        event.preventDefault(); // Impede o comportamento padrão do gesto de zoom
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  async function fetchAddress() {
    const cep = postalCode.replace(/\D/g, ''); // Remove caracteres não numéricos do CEP
  
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const addressData = response.data;
  
      setState(addressData.uf); // Atualiza o campo "Estado" com a UF retornada pela API
      setCountry('Brasil'); // Define o país como "Brasil"
      setCity(addressData.localidade); // Atualiza o campo "Cidade" com a cidade retornada pela API
  
    } catch (error) {
      console.error('Error:', error);
      setCity("");
      setState("");
      setCountry("");
    }
  }

  function handleCriarConta() {
    const requestBody = {
      cpf: cpf,
      name: name,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      emailAddress: emailAddress,
      city: city,
      state: state,
      country: country,
      street: street,
      postalCode: postalCode,          
      responsible: responsible,
    };

    axios
    .post(
        `http://192.168.0.9:8080/patient/${crp}`,
        requestBody
      )
      .then((response) => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(true);
          console.log("Consulta enviada com sucesso:", response.data);
          console.log(response.status);
          console.log(requestBody);
          navigate("/Pacientes");
        }, 2000);  
        
      })
      .catch((error) => {
        console.error('Error:', error);
        console.log(crp);
        console.log(requestBody);
        setError("Erro ao criar paciente");
      });
  }

  return (
    <div className="criar-conta-container">
      <h1 className="titC">Criar Novo Paciente</h1>
      <div className="campo-form">
        <input className="input-c"
          type="text"
          value={cpf}
          placeholder="CPF:"
          onChange={(e) => setCpf(e.target.value)}
        />
      </div>
      <div className="campo-form">
        <input className="input-c"
          type="text"
          value={name}
          placeholder="Nome:"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="campo-form">
        <input className="input-c"
          type="text"
          value={phoneNumber}
          placeholder="Telefone:"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="campo-form">
        <input className="input-c"
          type="text"
          value={dateOfBirth}
          placeholder="Data de Nascimento (dd/mm/aaaa):"
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>
      <div className="campo-form">
        <input className="input-c"
          type="email"
          value={emailAddress}
          placeholder="Endereço de Email:"
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>
      <div className="campo-form">
        <input className="input-c"
          type="text"
          value={postalCode}
          placeholder="CEP:"
          onChange={(e) => setPostalCode(e.target.value)}
          onBlur={fetchAddress}
      />

      </div>
 
      <div className="campo-form">
        <input className="input-c"
          type="text"
          value={street}
          placeholder="Rua, número e complemento (se houver):"
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>

      <div className="campo-form">
        <input className="input-c"
          type="text"
          value={city}
          placeholder="Cidade:"
          onChange={(e) => setCity(e.target.value)}          
        />
      </div>
      <div className="campo-form">
        <input className="input-c"
          type="text"
          value={state}
          placeholder="Estado:"
          onChange={(e) => setState(e.target.value)}          
        />
      </div>
      <div className="campo-form">
        <input className="input-c"
          type="text"
          value={country}
          placeholder="País:"
          onChange={(e) => setCountry(e.target.value)}          
        />
      </div>
      
      
      <div className="campo-form">
        <input className="input-c"
          type="text"
          value={responsible}
          placeholder="Responsável:"
          onChange={(e) => setResponsible(e.target.value)}
        />
      </div>
      <button className="criar-conta-button" onClick={handleCriarConta}>
        Criar Paciente
      </button>
      {isLoading && (
              <>
                <div className="loading-bar4">
                  <div className="loading-bar4-fill" />
                </div>
                <p style={{ fontSize: "12px" }}>Criando Paciente...</p>
              </>
            )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CadPaciente;
