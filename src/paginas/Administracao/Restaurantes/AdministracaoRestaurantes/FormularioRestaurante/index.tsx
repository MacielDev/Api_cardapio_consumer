import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const handleSubmitName =(event:React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    console.log("Vou enviar o restaurante");
    console.log(nomeRestaurante);
    axios.post('http://0.0.0.0:8000/api/v2/restaurantes/',{
      nome:nomeRestaurante
    })
    .then(() => alert(`Restaurante ${nomeRestaurante} cadastrado com sucesso`))
  }
  return (
    <form onSubmit={handleSubmitName}>
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
  );
};

export default FormularioRestaurante;
