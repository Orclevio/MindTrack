import React, { useState, useEffect } from "react";
import img1 from "../../Imagens/folder-open.png";
import "../../Fonts.css";
import "./Arquivos.css";
import axios from 'axios';

// Componente responsável por exibir a lista de arquivos e deixar  excluir e visualização deles
const FileList = ({ files, baixarArquivo, onDelete, onView }) => {
    return (
      <div className="formulario">
        {files.map((file) => (
          <div className="file-button" key={file.id} onClick={() => onView(file)}>
            <img src={img1} alt="File Icon" />
            <span className="nomeArq">{file.name}</span>
            <button className="botAcao" onClick={() => baixarArquivo(file)}>Baixar</button>
            <button className="botAcao" onClick={() => onDelete(file.id)}>Excluir</button>
          </div>
        ))}
      </div>
    );
  };
  
  

// Componente para upload de arquivos
const FileUploader = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Função para lidar com a seleção de arquivo
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      reader.readAsDataURL(file);
    });
  }

  // Função para lidar com o upload do arquivo selecionado
  const handleUpload = () => {
    if (selectedFile) {
      // Cria um objeto com dados do arquivo selecionado
      convertFileToBase64(selectedFile)
      .then((base64String) => {
        // Aqui você pode fazer o upload do arquivo para o servidor,
            // usando o arquivo em Base64 (base64String)
            const requestBody = {
              name: selectedFile.name,
              type: selectedFile.type,
              file: base64String
            };
            onUpload(requestBody);
            enviarArquivo(requestBody);
          })
          .catch((error) => {
            console.error('Erro ao converter o arquivo para Base64:', error);
          });
      // Chama a função para enviar os dados do arquivo
      
      setSelectedFile(null); // Limpa o arquivo selecionado após o upload
    }
  };

  async function enviarArquivo(requestBody) {
    const url = 'http://192.168.0.9:8080/file';

    console.log(requestBody)
    await axios.post(url, requestBody).then(response => {
      console.log('Status code:', response.status);
      console.log('Response body:', response.data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
    console.log('Arquivo enviado e salvo com sucesso!');
  }


  return (
    <div>
      {/* Input para selecionar o arquivo */}
      <input type="file" onChange={handleFileChange} style={{marginLeft:"10px"}} className="file-input" />

      {/* Botão para realizar o upload */}
      <button className="circle-button2" style={{width:"150px", marginTop:"15px", marginLeft:"10px"}} onClick={handleUpload}>Adicionar</button>
    </div>
  );
};

const Arquivos = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


  function handleCarregamentoArquivos() {
    // Lógica de autenticação do usuário aqui

    const url = 'http://192.168.0.9:8080/file';

    axios.get(url)
      .then(response => {
        setFiles(response.data.object);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    handleCarregamentoArquivos();
  }, [ setFiles]);

  // Função para lidar com o upload de arquivos
  const handleUpload = (file) => {

    const url = 'http://192.168.0.9:8080/file';

    let ultimo;

    axios.get(url)
      .then(response => {
        if (response.data.object?.length === undefined) {
          ultimo = 1;
        } else {
          ultimo = response.data.object[response.data.object.length - 1].id + 1;
        }
        const arquivo = {
          id: ultimo,
          name: file.name,
          type: file.type,
          file: file.file,
        };
        // Adiciona o novo arquivo à lista de arquivos
        setFiles((prevFiles) => {
          if (Array.isArray(prevFiles)) {
            return [...prevFiles, arquivo];
          } else {
            return [arquivo];
          }
        });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  function criarBlob(conteudo, tipoMIME) {
    var arrayDados = [conteudo];
    var opcoes = { type: tipoMIME };
  

    var blob = new Blob(arrayDados, opcoes);
  
    return blob;
  }

  const baixarArquivo = (file) => {
    //if (!pdfBase64) return;

    // var arquivoBlob = new Blob(file, { type: "application/pdf" });
    var link = document.createElement('a');
    let blob = criarBlob(file.file, file.type);
    link.href = URL.createObjectURL(blob);
    //link.href = 'caminho/para/o/arquivo.extensao'; // Substitua pelo caminho do arquivo que deseja baixar
    link.download = file.name; // Substitua pelo nome desejado para o arquivo
  
    // Adicione o link ao documento
    document.body.appendChild(link);
  
    // Clique no link
    link.click();
  
    // Remova o link do documento
    document.body.removeChild(link);
  };

  

  // Função para lidar com a exclusão de arquivos
// Função para lidar com a exclusão de arquivos
  const handleDelete = (fileId) => {
    console.log(fileId)
      if (fileId === 1) {
        handleCarregamentoArquivos();
      }

        const url = `http://192.168.0.9:8080/file/${fileId}`;
    
        axios.delete(url)
          .then(response => {
            // const filesArray = files.filter((item) => item.id !== fileId);
            // console.log(filesArray)
            // setFiles(filesArray);
            handleCarregamentoArquivos()
          })
          .catch(error => {
            console.log('Error:', error);
          });
      
    // Filtra a lista de arquivos para remover o arquivo com o ID fornecido
    //setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };
  

  // Função para lidar com a visualização de arquivos
  const handleView = (file) => {
    setSelectedFile(file);
  };

  // Função para voltar à lista de arquivos após visualizar um arquivo
  const handleBack = () => {
    setSelectedFile(null);
  };

  return (
    <div>
      <h1 className="tituloprinc">Gerenciamento de Formulários</h1>
      <FileUploader onUpload={handleUpload} />
      {/* Verifica se um arquivo foi selecionado para visualização */}
      {selectedFile ? (
        <div  >
          <h2>Visualização de Arquivo: {selectedFile.name}</h2>
          <button className="botVoltar" onClick={handleBack}>Voltar</button>
          <div className="file-button">
            <img src={img1} alt="File Icon" />            
          </div>
        </div>
      ) : (
        <div>
          {/* Componente FileList para exibir a lista de arquivos */}
          {files?.length &&
            <FileList files={files} baixarArquivo={baixarArquivo} onDelete={handleDelete} onView={handleView} />
          }
          
          {/* Componente FileUploader para permitir o upload de arquivos */}
        </div>
      )}
    </div>
  );
};

export default Arquivos;