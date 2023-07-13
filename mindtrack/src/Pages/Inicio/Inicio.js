import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext";
import "./Inicio.css";
import Menu from "../../Menu";
import Header from "../../Header";
import Calendar from "./Calendar";
import axios from "axios";
import "../../Fonts.css";

const Inicio = () => {
  const colorCode = 0;
  const [appointments, setAppointments] = useState([]);
  const [profissional, setProfissional] = useState([]);
  const { email, nome, setNome, setCrp } = useContext(UserContext);
  const storedEmail = localStorage.getItem("email"); // Recupera o valor de email do localStorage
   
  useEffect(() => {
    if (storedEmail) {
      axios
        .get(`http://192.168.0.9:8080/professional/${storedEmail}`)
        .then((response) => {
          setProfissional(response.data.object);
          if (response.data.object && response.data.object.name) {
            setNome(response.data.object.name);
            localStorage.setItem("nome", nome);            
            setCrp(response.data.object.crp);
          }
        })
        .catch((error) => {
          console.log(storedEmail);
          console.error(error);
        });
    }
  }, [storedEmail, setNome, setCrp, nome]);

  useEffect(() => {
    axios
      .get(`http://192.168.0.9:8080/appointment/${profissional.crp}`) //Alterar pro local em que o servidor está rodando
      .then((response) => {
        setAppointments(response.data.object);
        localStorage.setItem("CrpUs", profissional.crp);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [profissional.crp]);

  if (!profissional) {
    // Data is still loading, show a loading spinner or message
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="item item1-1" style={{ width: "93%" }}>
        <Menu />
      </div>
      <div className="item item1-2">
        <Header nome={nome} setNome={setNome} />
      </div>
      <div className="item item2-1">
        <Calendar colorCode={colorCode} appointments={appointments} />
      </div>
    </div>
  );
};

export default Inicio;
