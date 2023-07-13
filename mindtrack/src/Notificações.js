import React from 'react';
import "./Notificações.css"; 
import Menu from "./Menu";
import Header from './Header';

const Notificações = () => {
return(
    <>
    <div className="toast">
        <div className="toast-content">
            <i className="fas fa-solid da-check check"></i>
            <div className="message">
                <span className="text text-1">Sucesso</span>
                <span className="text text-2">Suas alterações foram salvas</span>
            </div>
        </div>
        <i className="fa-solid fa-xmark close">X</i>
        <div className="progress"></div>
    </div>
    </>
)
}
export default Notificações;