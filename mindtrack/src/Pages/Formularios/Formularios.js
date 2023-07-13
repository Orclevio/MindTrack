import React from 'react';
import "./Formularios.css"; 
import Menu from "../../Menu";
import Header from '../../Header';
import Arquivos from './Arquivos';
const Formularios = () => {

  return (
    <div className="container">
      
    <div className="item item1-1" style={{ width: '93%' }}><Menu /> </div>
    <div className="item item1-2"><Header/></div>
    <div className="item itemC2-1"><Arquivos/></div>
  </div>
  );
};

export default Formularios;

