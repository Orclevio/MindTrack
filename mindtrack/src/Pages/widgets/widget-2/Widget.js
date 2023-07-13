import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Widget.css";
import { UserContext } from "../../../UserContext";
import sair from "../../../Imagens/sair.png";

const menuHeight = getComputedStyle(document.documentElement).getPropertyValue(
  "--menu-height"
);

const buttons = ["Paciente", "Consulta", "Observações", "Finalizar"];

function Widget() {
  const [activeBlock, setActiveBlock] = useState(0);
  const [isWidgetOpen, setIsWidgetOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const { crp } = useContext(UserContext);
  const [formValues, setFormValues] = useState({
    nome: "",
    cpf: "",
    email: "",
    local: "",
    recorrencia: "",
    dataInicio: "",
    horario: "",
    preco: "",
    pago: "",
  });
  const [nomes, setNomes] = useState([]);

  const toggleMenuBlock = (index) => {
    if (index === activeBlock || canSwitchBlock()) {
      setActiveBlock(index);
    }
  };

  const closeWidget = (event) => {
    setIsWidgetOpen(false);

    
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

  function handleEnviarConsulta() {
    const requestBody = {
      date: formatData(formValues.dataInicio) + " " + formValues.horario,
      recurrence: formValues.recorrencia,
      local: formValues.local,
      inPerson: formValues.local === "Virtual" ? true : false,
      price: parseFloat(formValues.preco),
      paid: formValues.pago === "Sim" ? true : false,
    };

    axios
      .post(
        `http://192.168.0.9:8080/appointment/${crp}/${formValues.cpf}`,
        requestBody
      )
      .then((response) => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(true);
          console.log("Consulta enviada com sucesso:", response.data);
          console.log(response.status);
          console.log(requestBody);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Erro ao enviar a consulta:", error);
        console.log(crp + " " + formValues.cpf);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.9:8080/professional/patients/${crp}`
        );
        const pacientes = response.data.object; // Atualiza o estado dos pacientes
        setPacientes(pacientes); // Define o estado dos pacientes antes de buscar os nomes
        const names = pacientes.map((item) => item.name);
        names.sort();
        if (Array.isArray(names)) {
          setNomes(names);
        } else {
          console.error("Os dados obtidos não são um array:", names);
        }
      } catch (error) {
        console.error("Erro ao obter os nomes da base de dados:", error);
      }
    };

    fetchData(); // Chama a função fetchData para buscar os nomes
  }, [crp]);

  const handleNomeChange = (event) => {
    const { value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      nome: value,
    }));

    // Find the paciente object with the selected name
    const paciente = pacientes.find((item) => item.name === value);
    if (paciente) {
      setFormValues((prevValues) => ({
        ...prevValues,
        cpf: paciente.cpf,
        email: paciente.email,
      }));
    }
  };

  if (!isWidgetOpen) {
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
        <button className="close-button" onClick={closeWidget} >
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

            <select
              className="campo-form2"
              value={formValues.nome}
              onChange={handleNomeChange} // Adiciona o manipulador de eventos para a seleção de nomes
              name="nome"
              required
            >
              <option value="" disabled>
                Selecione o nome:
              </option>
              {nomes.map((nome, index) => (
                <option key={index} value={nome}>
                  {nome}
                </option>
              ))}
            </select>
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
            <button className="circle4-button" onClick={handleEnviarConsulta}>
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
        </div>
      </div>
    </article>
  );
}

export default Widget;
