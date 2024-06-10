import { Helmet } from "react-helmet"
import {Header, Titulo, ContenedorHeader} from './../elementos/Header';
import {Formulario, Input, ContenedorBoton} from './../elementos/ElementosDeFormulario';
import { useState } from "react";
import {auth} from './../firebase/firebaseConfig';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Boton from './../elementos/Boton';
import SvgLogin from './../imagenes/registro.svg?react';
import styled from "styled-components";
import Alerta from "../elementos/Alerta";
const Svg=styled(SvgLogin)`
    width:100% ;
    max-height:6.25rem; /*100px */
    margin-bottom:1.25rem; /*20px */
`;



const RegistroUsuarios = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {     
        switch(e.target.name){
        case 'email':
          setCorreo(e.target.value);
          break;
        case 'password':
          setPassword(e.target.value);
          break;
        case 'password2':
          setPassword2(e.target.value);
          break;
        default:
          break;
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
    if(correo === '' || password === '' || password2 === ''){
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Por favor rellena todos los datos'
			});
			return;
		}

		if(password !== password2){
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Las contraseñas no son iguales'
			});
			return;
		}

    try {
			await createUserWithEmailAndPassword(auth, correo, password);
			navigate('/');
		} catch(error) {
			cambiarEstadoAlerta(true);

			let mensaje;
			switch(error.code){
				case 'auth/invalid-password':
					mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
					break;
				case 'auth/email-already-in-use':
					mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
				break;
				case 'auth/invalid-email':
					mensaje = 'El correo electrónico no es válido.'
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
         <title>Crear cuenta</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Crear cuenta</Titulo>
          <div>
          <Boton to="/iniciar-sesion" >Iniciar Session</Boton>
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
        <Input 
          type="password"
          name="password2"
          placeholder="Repita Password"
          value={password2}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as="button" primario="true" type="submit"  >Crear Cuenta</Boton>
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

export default RegistroUsuarios