import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Widget.css";
import { UserContext } from "../../../UserContext";
import excluir from "../../../Imagens/trash.png";
import sair from "../../../Imagens/sair.png";



const menuHeight = getComputedStyle(document.documentElement).getPropertyValue(
  "--menu-height"
);

const buttons = [
  "Paciente",
  "Consulta",
  "Observações",
  "Finalizar",
  "Excluir Consulta",
];

function Widget2(props) {
  const [activeBlock, setActiveBlock] = useState(0);
  const [isWidgetOpen2, setIsWidgetOpen2] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState();
  const [consultas, setConsultas] = useState();
  const [consulta, setConsulta] = useState();
  const { crp } = useContext(UserContext);
  const [formValues, setFormValues] = useState({
    nome: props.nome ? props.nome : "",
    cpf: "",
    email: "",
    local: "",
    recorrencia: "",
    dataInicio: "",
    horario: "",
    preco: "",
    pago: "",
  });
  const toggleMenuBlock = (index) => {
    if (index === activeBlock || canSwitchBlock()) {
      setActiveBlock(index);
    }
  };

  const closeWidget = (event) => {
    setIsWidgetOpen2(false);
  };

  const canSwitchBlock = () => {
    switch (activeBlock) {
      case 0:
        return (
          formValues.nome !== "" &&
          formValues.cpf !== "" &&
          formValues.email !== ""
        );
      case 1:
        return (
          formValues.local !== "" &&
          formValues.recorrencia !== "" &&
          formValues.dataInicio !== "" &&
          formValues.horario !== "" &&
          formValues.preco !== "" &&
          formValues.pago !== ""
        );
      case 2:
        return true;
      default:
        return false;
    }
  };

  // ...

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const formatData = (data) => {
    // Verifique se a data possui o formato esperado (yyyy-mm-dd)
    if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      const [ano, mes, dia] = data.split("-");
      return `${dia}/${mes}/${ano}`;
    }
    return data; // Caso a data não esteja no formato esperado, retorne o valor original
  };

  // ...

  const handleRecorrenciaChange = (event) => {
    const { value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      recorrencia: value,
    }));
  };
  const handlePagoChange = (event) => {
    const { value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      pago: value,
    }));
  };

  function handleEnviarConsulta2() {
    // Verifique se paciente possui um valor definido antes de acessar sua propriedade id
    if (paciente) {
      const requestBody = {
        date: formatData(formValues.dataInicio) + " " + formValues.horario,
        recurrence: formValues.recorrencia,
        local: formValues.local,
        inPerson: formValues.local === "Virtual" ? true : false,
        price: parseFloat(formValues.preco),
        paid: formValues.pago === "Sim" ? true : false,
      };

      const id = consulta.id;

      axios
        .put(`http://192.168.0.9:8080/appointment/${id}`, requestBody)
        .then((response) => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(true);
            console.log("Consulta atualizada com sucesso:", response.data);
            console.log(response.status);
            console.log(requestBody);
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.error("Erro ao atualizar a consulta:", error);
          console.log(id);
        });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await axios.get(
          `http://192.168.0.9:8080/appointment/${crp}`
        );
        const consultasData = response2.data.object;
        setConsultas(consultasData); // Atualiza o estado das consultas
      } catch (error) {
        console.error("Erro ao obter as consultas da base de dados:", error);
      }
    };

    fetchData(); // Chama a função fetchData para buscar as consultas
  }, [crp]);

  useEffect(() => {
    if (formValues.nome && consultas) {
      const consultaData = consultas.find(
        (item) => item.patient.name === formValues.nome
      );
      setConsulta(consultaData);
    }
  }, [consultas, formValues.nome]);

  // ...

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.9:8080/professional/patients/${crp}`
        );
        const pacientesA = response.data.object; // Atualiza o estado dos pacientes
        setPacientes(pacientesA); // Define o estado dos pacientes antes de buscar os nomes
        //console.log(response);
        // Find the paciente object with the selected name
        setPaciente(pacientesA.find((item) => item.name === formValues.nome));

        if (paciente) {
          setFormValues((prevValues) => ({
            ...prevValues,
            cpf: paciente.cpf,
            email: paciente.email,
          }));
        }
      } catch (error) {
        console.error("Erro ao obter os nomes da base de dados:", error);
      }
    };

    fetchData(); // Chama a função fetchData para buscar os nomes
  }, [crp, formValues.nome, paciente]);

  // ...

  const handleNomeChange = (event) => {
    const { value } = event.target;

    // Find the paciente object with the selected name
    const paciente = pacientes.find((item) => item.name === value);
    if (paciente) {
      setFormValues((prevValues) => ({
        ...prevValues,
        nome: value,
        cpf: paciente.cpf,
      }));
    }
  };

  if (!isWidgetOpen2) {
    return null;
  }

  const validateCurrency = (value) => {
    // Remove qualquer caractere não numérico, exceto ponto decimal
    const cleanedValue = value.replace(/[^0-9.]/g, "");
    // Verifica se o valor possui apenas um ponto decimal
    const decimalCount = cleanedValue.split(".").length - 1;
    if (decimalCount > 1) {
      return false;
    }
    // Outras validações, se necessário
    // Por exemplo, verificar se o valor está dentro de um determinado intervalo
    // ou se possui um número mínimo de casas decimais, etc.
    return true;
  };
  function handleExcluirConsulta() {
    if (consulta) {
      const id = consulta.id;

      axios
        .delete(`http://192.168.0.9:8080/appointment/${id}`)
        .then((response) => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(true);
            console.log("Consulta excluída com sucesso:", response.data);
            console.log(response.status);
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.error("Erro ao excluir a consulta:", error);
          console.log(id);
        });
    }
  }

  return (
    <article className={`card ${activeBlock === 0 ? "open" : ""}`}>
      <div className="buttons">
        {buttons.map((button, index) => (
          <button
            className={index === activeBlock ? "active" : ""}
            onClick={() => toggleMenuBlock(index)}
            key={index}
          >
            {button}
          </button>
        ))}

        <button className="close-button2" onClick={closeWidget}>
        FECHAR
        </button>
      </div>

      <div className="wrapper">
        <div
          className="content"
          style={{
            transform: `translate(0, calc(0px - ${menuHeight} * ${activeBlock}))`,
          }}
        >
          <div className="block">
            <h2>Dados do Paciente</h2>

            <input
              className="campo-form2"
              defaultValue={formValues.nome}
              name="nome"
              required
              readOnly
            />
            <input
              className="campo-form2"
              type="text"
              maxLength="11"
              placeholder="CPF:"
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              title="Digite um CPF válido no formato XXXXXXXXXXX"
              name="cpf"
              value={formValues.cpf}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (
                  !(
                    (e.key >= "0" && e.key <= "9") ||
                    e.key === "Backspace" ||
                    e.key === "Delete" ||
                    e.key === "Tab" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === "-"
                  )
                ) {
                  e.preventDefault();
                }
              }}
              required
              readOnly
            />

            <input
              className="campo-form2"
              type="text"
              placeholder="E-mail:"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              required
              list="emailOptions"
            />
          </div>
          <div className="block">
            <h2>Dados da Consulta</h2>
            <div className="input-container">
              <select
                className="campo-form2"
                name="local"
                value={formValues.local}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Tipo de consulta:
                </option>
                <option value="Virtual">Virtual</option>
                <option value="Presencial">Presencial</option>
              </select>

              <select
                className="campo-form2"
                value={formValues.recorrencia}
                onChange={handleRecorrenciaChange}
                required
              >
                <option value="" disabled>
                  Recorrência:
                </option>
                <option value="Virtual">Semanal</option>
                <option value="Presencial">Quinzenal</option>
                <option value="Presencial">Mensal</option>
              </select>
            </div>

            <div className="input-container">
              <input
                className="campo-form2"
                type="date"
                placeholder="Data início:"
                data-tip="Formato DD/MM/AAAA"
                name="dataInicio"
                value={formValues.dataInicio}
                onChange={handleInputChange}
              />
              <input
                className="campo-form2"
                type="time"
                placeholder="Horário:"
                name="horario"
                step="01:00"
                value={formValues.horario}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-container">
              <select
                style={{ width: "50%" }}
                className="campo-form2"
                value={formValues.pago}
                onChange={handlePagoChange}
                required
              >
                <option value="" disabled>
                  Pagamento efetuado:
                </option>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>

              <input
                className="campo-form2"
                type="text"
                placeholder="Valor da consulta: R$"
                name="preco"
                value={formValues.preco}
                onChange={handleInputChange}
                required
                pattern="[0-9]*"
                inputMode="numeric"
                onBlur={(e) => {
                  if (!validateCurrency(e.target.value)) {
                    // Limpa o valor do campo se a validação falhar
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      preco: "",
                    }));
                  }
                }}
              />
            </div>
          </div>
          <div className="block">
            <h2>Observações da Consulta</h2>
            <textarea
              className="observacoes"
              placeholder="Observações:"
              name="observacoes"
              value={formValues.observacoes}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="block">
            <h2>Criar consulta:</h2>
            <button className="circle4-button" onClick={handleEnviarConsulta2}>
              &gt;
            </button>
            {isLoading && (
              <>
                <div className="loading-bar3">
                  <div className="loading-bar3-fill" />
                </div>
                <p style={{ fontSize: "12px" }}>Agendando consulta...</p>
              </>
            )}
          </div>
          <div className="block">
            <h2>Tem certeza que deseja excluir consulta?</h2>
            <button
              className="circle-button2"
              style={{
                backgroundColor: "red",
                border: "none",
                cursor: "pointer",
                marginTop: "1%",
                marginRight: "1%",
              }}
              onClick={closeWidget}
            >
              Não
            </button>
            <button
              className="circle-button2"
              style={{ border: "none", cursor: "pointer" }}
              onClick={handleExcluirConsulta}
            >
              Sim
            </button>
            {isLoading && (
              <>
                <div className="loading-bar3">
                  <div className="loading-bar3-fill" />
                </div>
                <p style={{ fontSize: "12px" }}>Excluindo consulta...</p>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Widget2;
