import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CriarConta.css";
import "../../Fonts.css";
import { useNavigate } from "react-router-dom";






function CriarConta() {
  const [crp, setCrp] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
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
      crp: crp,
      name: name,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      emailAddress: emailAddress,
      postalCode: postalCode,
      street: street,
      city: city,
      state: state,
      country: country,     
      password: password
    };

    const url = 'http://192.168.0.9:8080/professional';

    axios.post(url, requestBody)
      .then(response => {
        console.log('Status code:', response.status);
        console.log('Response body:', response.data);
        // Limpar os campos após o sucesso do cadastro
        setCrp("");
        setName("");
        setPhoneNumber("");
        setDateOfBirth("");
        setEmailAddress("");
        setPostalCode("");
        setStreet("");
        setCity("");
        setState("");
        setCountry("");       
        setPassword("");        
        navigate("/");
      })
      .catch(error => {
        console.error('Error:', error);
        setError("Erro ao criar nova conta");
      });
  }

  return (
    <div className="criar-conta-container">
      <h1 className="titC">Criar Nova Conta</h1>
      <div className="campo-form">
        <input className="input-c"
          type="text"
          value={crp}
          placeholder="CRP:"
          onChange={(e) => setCrp(e.target.value)}
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
          type="password"
          value={password}
          placeholder="Senha:"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="criar-conta-button" onClick={handleCriarConta}>
        Criar Conta
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CriarConta;
