import { Helmet } from "react-helmet";
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from './elementos/Header';
import Boton from "./elementos/Boton";
import BotonCerrarSesion from "./elementos/BotonCerrarSesion";
import { useAuth } from "./contextos/AuthContext";
import FomularioGasto from './components/FormularioGasto';
import BarraTotalGastado from "./components/BarraTotalGastado";
const App = () => {
  const {usuario}=useAuth();
  return ( 
  <>
    <Helmet>
      <title>Agregar Gasto</title>
    </Helmet>
    <Header>
      <ContenedorHeader>
        <Titulo>
          Agregar Gasto
        </Titulo> 
        <p>{usuario.email}</p>
        <ContenedorBotones>
          <Boton to="/categorias">Categorias</Boton>
          <Boton to="/lista">Lista de Gasto</Boton>
          <BotonCerrarSesion/>
        </ContenedorBotones> 
      </ContenedorHeader>
    </Header>
    <FomularioGasto/>
    <BarraTotalGastado/>
  </>
   );
}
 
export default App;