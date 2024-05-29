import { Helmet } from "react-helmet"
import {Header, Titulo} from './../elementos/Header';
import BtnRegresar from "../elementos/BtnRegresar";
const ListaDegastos = () => {
  return (
    <>
    <Helmet>
    <title>Lista de Gastos</title>
  </Helmet>
  <Header>
      <BtnRegresar />
      <Titulo>
      Lista de Gasto
      </Titulo>     
  </Header>


  </>
  )
}

export default ListaDegastos