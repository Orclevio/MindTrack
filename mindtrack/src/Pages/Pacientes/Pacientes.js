import React, { useState, useMemo, useEffect, useContext } from "react";
import { UserContext } from "./../../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Pacientes.css';
import Menu from '../../Menu';
import Header from '../../Header';
import WidgetPac from './WidgetPac';
import visualizar from "../../Imagens/visualizar.png";
import editar from "../../Imagens/editar.png";
import excluir from "../../Imagens/trash.png";
import { useTable, useFilters } from 'react-table';

const Pacientes = () => {
  const [valueInput, setValueInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const { crp } = useContext(UserContext);
  const [showWidget, setShowWidget] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const CrpUs = localStorage.getItem("CrpUs");
  const [nomes, setNomes] = useState([]);
  const navigate = useNavigate();
  const handleValueChange = (e) => {
    const value = e.target.value || '';
    setValueInput(value);

    const filtered = pacientes.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredData(filtered);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'emailAddress',
      },
      {
        Header: 'Telefone',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Ação',
        accessor: 'acao',
        Cell: ({ row }) => (
          <div>
            <button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer"}} onClick={() => handleEdit(row)}><img src={visualizar} style={{ width: "80%" }} alt="Descrição da imagem"/></button>
            <button style={{ backgroundColor: "transparent", border: "none", cursor: "pointer"}} onClick={() => handleEdit(row)}><img src={editar} style={{ width: "80%" }} alt="Descrição da imagem"/></button>
            </div>
        ),
      },
    ],
    []
  );
  function CadastrarPac() {    
    navigate("/CriarPac");
  }
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: filteredData,
    },
    useFilters
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.9:8080/professional/patients/${CrpUs}`);
        const pacientes = response.data.object;
        if (pacientes && Array.isArray(pacientes)) {
          setPacientes(pacientes);
          const names = pacientes.map((item) => item.name);
          names.sort();
          setNomes(names);
        } else {
          console.error("Invalid data format:", pacientes);
        }
      } catch (error) {
        console.error("Error retrieving data from the database:", error);
      }
    };
    

    fetchData();
  }, [crp]);

  useEffect(() => {
    setFilteredData(pacientes);
  }, [pacientes]);

  const handleEdit = (row) => {
    const paciente = row.original;
    setSelectedPaciente(paciente);
    setShowWidget(true);
  };

  const handleSave = (updatedPaciente) => {
    // Implement your logic to save the updated patient data
    console.log("Updated Paciente:", updatedPaciente);
  };

  const handleClose = () => {
    setShowWidget(false);
    setSelectedPaciente(null);
  };

  const handleDelete = (row) => {
    // Implement your logic to handle the delete action here
    // You can access the row data using row.original
    console.log("Delete row:", row.original);
  };

  return (
    <div className="container">
      <div className="item item1-1" style={{ width: '93%' }}>
        <Menu />
      </div>
      <div className="item item1-2">
        <Header />
      </div>
      
      <div className="item itemP2-1">      
        <h1 className="tituloprinc">Gerenciamento de Pacientes</h1>
        <div className="input-container" style={{marginTop:"3%"}}>          
          {showWidget && selectedPaciente && (
            <div className="widget-container">
              <WidgetPac paciente={selectedPaciente} onSave={handleSave} onClose={handleClose} />
            </div>
          )}

          <input className="Pesquisa" type="text" value={valueInput} onChange={handleValueChange} placeholder={'Busca pelo nome'} />
          <button className="circle-buttonP" onClick={CadastrarPac}>Novo Paciente</button>    
        </div>
        
        <table style={{ width: '100%' }} className="tableP" {...getTableProps()}>
          <thead className="theadP">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th className="thP" {...column.getHeaderProps()} key={column.id}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td className="tdP" {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default Pacientes;
