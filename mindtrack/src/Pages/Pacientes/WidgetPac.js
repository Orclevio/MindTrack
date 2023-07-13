import React, { useState, useContext } from "react";
import { UserContext } from "./../../UserContext";
import axios from "axios";
import "./WidgetPac.css";
import { useNavigate } from "react-router-dom";
import Pacientes from "./Pacientes";

const WidgetPac = ({ paciente, onSave, onClose }) => {
  const [cpf, setCpf] = useState(paciente?.cpf || "");
  const [nome, setNome] = useState(paciente?.name || "");
  const [telefone, setTelefone] = useState(paciente?.phoneNumber || "");
  const [email, setEmail] = useState(paciente?.emailAddress || "");
  const [nasc, setNasc] = useState(paciente?.dateOfBirth || "");
  const [cidade, setCidade] = useState(paciente?.city || "");
  const [estado, setEstado] = useState(paciente?.state || "");
  const [pais, setPais] = useState(paciente?.country || "");
  const [rua, setRua] = useState(paciente?.street || "");
  const [cep, setCep] = useState(paciente?.postalCode || "");
  const [responsavel, setResponsavel] = useState(paciente?.responsible || "");
  const navigate = useNavigate();
  const { crp } = useContext(UserContext);
  const handleSave = async () => {
    const updatedPaciente = {
      ...paciente,
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
      await axios.put(`http://192.168.0.9:8080/patient/${cpf}`, updatedPaciente);
      onSave(updatedPaciente);      
      onClose(); 
      console.log(crp);  
      window.location.reload();   
    } catch (error) {
      console.error("Error updating paciente:", error);
      
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://192.168.0.9:8080/patient/${crp}/${cpf}`);
      onClose();
      window.location.reload();  
    } catch (error) {
      console.error("Error deleting paciente:", error);
    }
  };

  return (
    <div className="widgetPac-container">
      <div className="widget-content">
        <h2>Editar Paciente</h2>
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
         
          <button className="circle-button2" style={{backgroundColor: "red", border: "none", cursor: "pointer", marginTop: "1%", marginRight: "15%", fontSize:"12px"}} onClick={handleDelete}>Excluir Paciente</button>
          <button className="circle-button2" style={{backgroundColor: "blue", border: "none", cursor: "pointer", marginTop: "1%", marginRight: "1%",}} onClick={handleSave}>Salvar</button>
          <button className="circle-button2" style={{backgroundColor: "transparent", color:"black", border: "none", cursor: "pointer", marginTop: "1%", marginRight: "1%",}} onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default WidgetPac;
