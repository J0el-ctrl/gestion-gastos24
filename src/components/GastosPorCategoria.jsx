import { Helmet } from 'react-helmet';
import {Header, Titulo} from './../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';


const GastosPorCategoria = () => {
  return (
    <>
      <Helmet>
      <title>Gastos por Categoria</title>
    </Helmet>
    <Header>
        <BtnRegresar  />
        <Titulo>
        Gastos por Categoría
        </Titulo>     
    </Header>


    </>
  )
}

export default GastosPorCategoria