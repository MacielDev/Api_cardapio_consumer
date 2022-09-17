import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IRestaurante from "../../../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const excluir = (restauranteAhSerExcluido :IRestaurante) =>{
    axios.delete(`http://0.0.0.0:8000/api/v2/restaurantes/${restauranteAhSerExcluido.id}/`)
      .then(() => {
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
        setRestaurantes([...listaRestaurante])
      })
  }
  useEffect(() => {
    axios
      .get<IRestaurante[]>("http://0.0.0.0:8000/api/v2/restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);
  return (
    <>
      <h1>Administracao de Restaurantes</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome do Restaurante</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Deletar</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {restaurantes.map((restaurante) => (
              <TableRow key={restaurante.id}>
                <TableCell>{restaurante.nome}</TableCell>
                <TableCell>
                  [<Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>Excluir</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdministracaoRestaurantes;
