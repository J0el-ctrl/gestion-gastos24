import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import WebFont from 'webfontloader';
import favicon from './imagenes/logo.png';
import {Helmet} from 'react-helmet';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {Contenedor,Fondo} from './elementos/index.js';
import {RegistroUsuarios,InicioSesion, EditarGasto, GastosPorCategoria, ListaDegastos} from './components/index.js';


WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const Index = () => {
  return ( 
    <>
    <Helmet>
      <link rel='shortcut icon' href={favicon} type='image/x-icon'  />
    </Helmet>
    <BrowserRouter>
         <Contenedor>
            <Routes>
              <Route path='iniciar-sesion' element={<InicioSesion/>} />
              <Route path='crear-cuenta' element={<RegistroUsuarios/>} />
              <Route path='categorias' element={<GastosPorCategoria/>} />
              <Route path='lista' element={<ListaDegastos/>} />
              <Route path='/editar/:id' element={<EditarGasto/>} />
              <Route path='/' element={<App/>} />    
            </Routes>
          </Contenedor>
    </BrowserRouter>
    <Fondo/>
    </>
     );
}
 



ReactDOM.createRoot(document.getElementById('root')).render(<Index/>)
