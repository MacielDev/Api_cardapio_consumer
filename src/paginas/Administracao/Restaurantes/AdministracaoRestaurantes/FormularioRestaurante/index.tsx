import { Box, Button, TextField, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../../../http";
import IRestaurante from "../../../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const parametros = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(
          `restaurantes/${parametros.id}/`
        )
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [parametros]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => alert(`Restaurante atualizado com sucesso`));
        navigate('/admin/restaurantes');
    } else {
      http.post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() =>
          alert(`Restaurante ${nomeRestaurante} cadastrado com sucesso`)
        );
        navigate('/admin/restaurantes');
    }
  };
  return (
    <Box sx={{display:'flex',flexDirection:'column', alignItems:"center",}}>
      <Typography component="h1" variant="h6">
        Formulário de restaurantes
      </Typography>
      <Box component="form" onSubmit={aoSubmeterForm}>
        <TextField
          value={nomeRestaurante}
          onChange={(event) => setNomeRestaurante(event.target.value)}
          label="Nome do restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button 
          sx={{marginTop:"5px"}} 
          type="submit" 
          variant="outlined"
          fullWidth>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurante;
