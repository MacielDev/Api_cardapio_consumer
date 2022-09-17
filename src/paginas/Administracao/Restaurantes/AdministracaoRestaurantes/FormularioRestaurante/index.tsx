import { Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  
  const parametros = useParams();

  useEffect(() => {
    if(parametros.id){
      axios.get<IRestaurante>(`http://0.0.0.0:8000/api/v2/restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  },[parametros])

  const aoSubmeterForm =(evento:React.FormEvent<HTMLFormElement>) =>{
    evento.preventDefault();


    if(parametros.id){
      axios.put(`http://0.0.0.0:8000/api/v2/restaurantes/${parametros.id}/`,{
        nome:nomeRestaurante
      })
      .then(() => alert(`Restaurante atualizado com sucesso`))
    }else{
      axios.post('http://0.0.0.0:8000/api/v2/restaurantes/',{
        nome:nomeRestaurante
      })
      .then(() => alert(`Restaurante ${nomeRestaurante} cadastrado com sucesso`))
    }

  }
  return (
    <Container maxWidth="sm">
      <form onSubmit={aoSubmeterForm}> 
        <TextField
          value={nomeRestaurante}
          onChange={event => setNomeRestaurante(event.target.value)}
          label="Nome do restaurante"
          variant="standard"
        />
        <Button 
          type="submit" 
          variant="outlined"
          >
          Salvar
        </Button>
      </form>
    </Container>
  );
};

export default FormularioRestaurante;
