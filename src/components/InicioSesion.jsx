import { Helmet } from "react-helmet"
import {Header, Titulo, ContenedorHeader} from './../elementos/Header';
import { useNavigate } from "react-router-dom";
import {Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import { useState } from "react";
import Boton from './../elementos/Boton';
import SvgLogin from './../imagenes/login.svg?react';

import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './../firebase/firebaseConfig';
import Alerta from "../elementos/Alerta";
const Svg=styled(SvgLogin)`
    width:100% ;
    max-height:12.5rem; /*100px */
    margin-bottom:1.25rem; /*20px */
`;

const InicioSesion = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const handleChange = (e) => {     
    if(e.target.name==='email'){
      setCorreo(e.target.value);
    }else if(e.target.name==='password'){
      setPassword(e.target.value);
    }
}

const handleSubmit=async(e)=>{
  e.preventDefault()
  cambiarEstadoAlerta(false);
  cambiarAlerta({});
 // Comprobamos del lado del cliente que el correo sea valido.
const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
if( !expresionRegular.test(correo) ){
  cambiarEstadoAlerta(true);
  cambiarAlerta({
    tipo: 'error',
    mensaje: 'Por ingresa un correo electrónico valido'
  });
  return;
}
if(correo === '' || password === ''){
  cambiarEstadoAlerta(true);
  cambiarAlerta({
    tipo: 'error',
    mensaje: 'Por favor rellena todos los datos'
  });
  return;
}



try {
  await signInWithEmailAndPassword(auth, correo, password);
  navigate('/');
} catch(error) {
  cambiarEstadoAlerta(true);

  let mensaje;
  switch(error.code){ 
    case 'auth/wrong-password':
      mensaje = 'La contraseña no es correcta.'
      break;
    case 'auth/user-not-found':
      mensaje = 'No se encontro ninguna cuenta con este correo electrónico.'
      break;
    default:
      mensaje = 'Hubo un error al intentar crear la cuenta.'
    break;
  }

  cambiarAlerta({tipo: 'error', mensaje: mensaje});
}
}

  return (
    <>
      <Helmet>
         <title>Inicio de Session</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Session</Titulo>
          <div>
          <Boton to="/crear-cuenta" >Registrarse</Boton>
          </div>
        </ContenedorHeader>
      </Header>
      <Formulario onSubmit={handleSubmit} >
        <Svg/>
        <Input 
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={correo}
          onChange={handleChange}
        />
        <Input 
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
       
        <ContenedorBoton>
          <Boton as="button" primario="true" type="submit"  >Iniciar Session</Boton>
        </ContenedorBoton>
      </Formulario>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}

      />
    </>
  )
}

export default InicioSesion