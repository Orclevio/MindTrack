import React from 'react';
import "./Financeiro.css"; 
import Menu from "../../Menu";
import Header from '../../Header';

const Financeiro = () => {

  return (
    <div className="container">
          
          <div className="item item1-1"><Menu /> </div>
          <div className="item item1-2"><Header/></div>
        </div>
  );
};

export default Financeiro;