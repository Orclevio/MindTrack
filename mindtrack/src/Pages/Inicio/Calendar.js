import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Calendar.css";
import Widget from "../widgets/widget-2/Widget";
import Widget2 from "../widgets/widget-2/Widget2";
import "moment/locale/pt-br";
import img1 from "../../Imagens/prox.png";
import img2 from "../../Imagens/ant.png";
import editar from "../../Imagens/setting.png";

moment.locale("pt-br");

function getDaysInMonth(month, year) {
  const date = moment(`${year}-${month}-01`);
  const weeks = [];

  while (date.month() === month - 1) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(date.clone());
      date.add(1, "day");
    }
    weeks.push(week);
  }

  return weeks;
}

function getWeekDays(startOfWeek) {
  const days = [];
  const date = moment(startOfWeek);

  for (let i = 0; i < 7; i++) {
    days.push(date.clone());
    date.add(1, "day");
  }

  return days;
}

const Calendar = ({ colorCode, appointments }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const weeks = getDaysInMonth(currentMonth.month() + 1, currentMonth.year());
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("week"));
  const [showWidget, setShowWidget] = useState(false);
  const [showWidget2, setShowWidget2] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [nomePac, setNomePac] = useState("");
  const checkIsMobile = () => {
    const isMobile = window.innerWidth <= 768;
    setIsMobile(isMobile);
  };



  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  function previousWeek() {
    setCurrentWeek((prevWeek) => prevWeek.clone().subtract(1, "week"));
  }

  function nextWeek() {
    setCurrentWeek((prevWeek) => prevWeek.clone().add(1, "week"));
  }

  function toggleWidget() {    
    setShowWidget((prevState) => !prevState);
    setShowWidget2(false);
  }
  function toggleWidget2(text) {
    setShowWidget2((prevState) => !prevState);
    setShowWidget(false);
    setNomePac(text);
  }



  const weekDays = getWeekDays(currentWeek);

  function previousMonth() {
    setCurrentMonth((prevMonth) => prevMonth.clone().subtract(1, "month"));
  }

  function nextMonth() {
    setCurrentMonth((prevMonth) => prevMonth.clone().add(1, "month"));
  }

  const button1Classes = `button1 ${
    colorCode === 0 ? "green" : colorCode === 1 ? "gray" : "pink"
  }`;

  const filterAppointmentsByDate = (date) => {
    if (appointments) {
      const filteredAppointments = appointments.filter((appointment) =>
        moment(appointment.date, "DD/MM/YYYY HH:mm").isSame(date, "day")
      );

      return filteredAppointments.sort((a, b) =>
        moment(a.date, "DD/MM/YYYY HH:mm").diff(
          moment(b.date, "DD/MM/YYYY HH:mm")
        )
      );
    }
    return [];
  };

  return (
    <>
      <h1 className="tituloprinc">Gerenciamento de Consultas</h1>
      <div className="calendar-header">
        {isMobile && (
          <>
            <button className="circle-button2" onClick={toggleWidget}>
              Nova Consulta
            </button>
            <button className="botMes" onClick={previousWeek}>
              <img src={img2} alt="proximo" />
            </button>
            <h1 className="titMes2">{`${weekDays[0]
              .format("DD")
              .toUpperCase()} a ${weekDays[6]
              .format("DD")
              .toUpperCase()} de ${weekDays[6]
              .format("MMMM")
              .toUpperCase()} ${weekDays[6].format("YYYY")}`}</h1>
            <button className="botMes" onClick={nextWeek}>
              <img src={img1} alt="proximo" />
            </button>
            {showWidget && (
              <div className="widget-container2">
                <Widget/>                
              </div>              
            )}
            {showWidget2 && (
              <div className="widget-container2">
                <Widget2 nome={nomePac}/>
              </div>              
            )}
          </>
        )}
        {!isMobile && (
          <>
            <div className="quadrado1"></div>
            <p>Consulta Virtual</p>
            <div className="quadrado2"></div>
            <p>Consulta Presencial</p>
            <button className="circle-button" onClick={toggleWidget}>
              Nova Consulta
            </button>
            <button className="botMes" onClick={previousMonth}>
              <img src={img2} alt="proximo" />
            </button>
            <h1 className="titMes">
              {currentMonth.format("MMMM YYYY").toUpperCase()}
            </h1>
            <button className="botMes" onClick={nextMonth}>
              <img src={img1} alt="proximo" />
            </button>
            {showWidget && (
              <div className="widget-container">
                <Widget/>
              </div>              
            )}
            {showWidget2 && (
              <div className="widget-container">
                <Widget2 nome={nomePac}/>
              </div>              
            )}
          </>
        )}
      </div>

      {!isMobile ? (
        <table className="calendar-table">
          <tbody>
            {weeks.map((week, index) => (
              <tr key={index}>
                {week.map((day) => {
                  const isCurrentDay = day.isSame(moment(), "day");
                  const isNextMonth = day.month() !== currentMonth.month();
                  const dayClasses = isCurrentDay
                    ? "BlocoDia current-day"
                    : isNextMonth
                    ? "BlocoDia cinza"
                    : "BlocoDia";

                  const appointmentsOfDay = filterAppointmentsByDate(day);

                  return (
                    <td className={dayClasses} key={day.format("D MMMM YYYY")}>
                      <div>
                        <div className="DataDia2">{day.format("DD")}</div>
                        <div className="DataDia">
                          {day.format("ddd").toUpperCase()}
                        </div>
                      </div>
                      <div className="inputC-container">
                        {appointmentsOfDay.map((appointment, index) => (
                          <button                          
                          key={`${appointment.patient.name}-${index}`}
                          className={`button1 ${
                            !appointment.inPerson ? "pink" : "green"
                          }`}
                        >
                          <div style={{ display: "flex", alignItems: "center" }}>
                          <h1 className="Titulo2bnt">{`${moment(
                            appointment.date,
                            "DD/MM/YYYY HH:mm"
                          ).format("HH:mm")}: ${appointment.patient.name}`}</h1>
                        <button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer"}} onClick={() => toggleWidget2(appointment.patient.name)}>
                          <img
                            src={editar}
                            style={{ width: "60%" }}
                            alt="Descrição da imagem"
                          />
                          </button >                          
                          </div>
                        </button>
                        
                        ))}
                        
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="calendar-days-container">
          {weekDays.map((day, index) => {
            const appointmentsOfDay = filterAppointmentsByDate(day);

            return (
              <div className="calendar-day" key={index}>
                <div className="DataDia2">{day.format("DD")}</div>
                <div className="DataDia">{day.format("ddd").toUpperCase()}</div>

                <div>
                  {appointmentsOfDay.map((appointment, index) => (
                    <button style={{ display: "flex", alignItems: "center" }} onClick={() => toggleWidget2(appointment.patient.name)}
                    // Chame a função toggleWidget e passe o texto do botão como parâmetro
                      key={`${appointment.patient.name}-${index}`}
                      className={`button1 ${
                        !appointment.inPerson ? "pink" : "green"
                      }`}
                    >
                      
                      <h1 className="Titulo2bnt2">{`${moment(
                        appointment.date,
                        "DD/MM/YYYY HH:mm"
                      ).format("HH:mm")}: ${appointment.patient.name} `}</h1>
                      <button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer"}} onClick={() => toggleWidget2(appointment.patient.name)}>
                          <img
                            src={editar}
                            style={{ width: "80%" }}
                            alt="Descrição da imagem"
                          />
                          </button >  
                    
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Calendar;
