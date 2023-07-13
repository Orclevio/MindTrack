import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import "../Pacientes/WidgetPac.css";
import { useNavigate } from "react-router-dom";
import Interessados from "./Interessados";

const WidgetInt = ({ interessado, onSave, onClose }) => {
  const [cpf, setCpf] = useState(interessado?.cpf || "");
  const [nome, setNome] = useState(interessado?.name || "");
  const [telefone, setTelefone] = useState(interessado?.phoneNumber || "");
  const [email, setEmail] = useState(interessado?.emailAddress || "");
  const [nasc, setNasc] = useState(interessado?.dateOfBirth || "");
  const [cidade, setCidade] = useState(interessado?.city || "");
  const [estado, setEstado] = useState(interessado?.state || "");
  const [pais, setPais] = useState(interessado?.country || "");
  const [rua, setRua] = useState(interessado?.street || "");
  const [cep, setCep] = useState(interessado?.postalCode || "");
  const [responsavel, setResponsavel] = useState(interessado?.responsible || "");
  const navigate = useNavigate();
  const { crp } = useContext(UserContext);
  const handleSave = async () => {
    const updatedInteressado = {
      ...interessado,
      cpf: cpf,
      name: nome,
      phoneNumber: telefone,
      dateOfBirth: nasc,
      emailAddress: email,
      city: cidade,
      state: estado,
      country: pais,
      street: rua,
      postalCode: cep,
      responsible: responsavel,
    };

    try {
      await axios.put(`http://192.168.0.9:8080/interested/${cpf}`, updatedInteressado);
      onSave(updatedInteressado);      
      onClose(); 
      console.log(crp);  
      window.location.reload();   
    } catch (error) {
      console.error("Error updating paciente:", error);
      
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://192.168.0.9:8080/interested/${crp}/${cpf}`);
      onClose();
      window.location.reload();  
    } catch (error) {
      console.error("Error deleting interessado:", error);
    }
  };

  return (
    <div className="widgetPac-container">
      <div className="widget-content">
        <h2>Editar Interessado</h2>
        <label>Nome:</label>
        <input className="campo-form3" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        <label>Telefone:</label>
        <input className="campo-form3" type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <label>Data de Nascimento:</label>
        <input className="campo-form3" type="text" value={nasc} onChange={(e) => setNasc(e.target.value)} />
        <label>E-mail:</label>
        <input className="campo-form3" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />        
        <label>Cidade:</label>
        <input className="campo-form3" type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
        <label>Estado:</label>
        <input className="campo-form3" type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
        <label>Pais:</label>
        <input className="campo-form3" type="text" value={pais} onChange={(e) => setPais(e.target.value)} />
        <label>Rua:</label>
        <input className="campo-form3" type="text" value={rua} onChange={(e) => setRua(e.target.value)} />
        <label>CEP:</label>
        <input className="campo-form3" type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
        <label>Responsável:</label>
        <input className="campo-form3" type="text" value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />
        <div className="button-container">
         
          <button className="circle-button2" style={{backgroundColor: "red", border: "none", cursor: "pointer", marginTop: "1%", marginRight: "15%", fontSize:"12px"}} onClick={handleDelete}>Excluir Interessado</button>
          <button className="circle-button2" style={{backgroundColor: "blue", border: "none", cursor: "pointer", marginTop: "1%", marginRight: "1%",}} onClick={handleSave}>Salvar</button>
          <button className="circle-button2" style={{backgroundColor: "transparent", color:"black", border: "none", cursor: "pointer", marginTop: "1%", marginRight: "1%",}} onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default WidgetInt;
