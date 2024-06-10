import { Helmet } from "react-helmet"
import {Header, Titulo} from './../elementos/Header';
import BtnRegresar from "../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
import useObtenerGastos from './../hooks/useObtenerGastos';
import {
    Lista,
    ElementoLista,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from './../elementos/ElementosDeLista';
import IconoCategoria from './../elementos/IconoCategoria';
// import convertirAMoneda from './../funciones/convertirAMoneda';
import convertirAMoneda from './../funciones/convertirAMonedas';
import IconoEditar from './../imagenes/editar.svg?react';
import IconoBorrar from './../imagenes/borrar.svg?react';
import {Link} from 'react-router-dom';
import Boton from './../elementos/Boton';
import {format, fromUnixTime} from 'date-fns';
import {es} from 'date-fns/locale';
import borrarGasto from './../firebase/borrarGasto';

const ListaDeGastos = () => {
	const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos();

	const formatearFecha = (fecha) => {
		return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es})
	}


	// gastos->arreglo index->elementos de comparar fecha actual con el anterior gasto->informacion del gasto
	const fechaEsIgual = (gastos, index, gasto) => {
		// Si el índice no es 0 (es decir, no es el primer elemento)
		if(index !== 0){
			// Formatea la fecha del gasto actual
			const fechaActual = formatearFecha(gasto.fecha);
			// Formatea la fecha del gasto anterior
			const fechaGastoAnterior = formatearFecha(gastos[index -1].fecha);

			// Compara las fechas formateadas
			if(fechaActual === fechaGastoAnterior){
				return true;  // Las fechas son iguales
			} else {
				return false; // Las fechas son diferentes
			}
		}
	}
	// optimizado fechaEsIgual
	// const FechaEsIgual=(lista,index,objeto)=>{
	// 	return index !==0 && (formatearFecha(lista[index-1].fecha)=== formatearFecha(objeto.fecha))
	// }
	return (
		<>
			<Helmet>
				<title>Lista de Gastos</title>
			</Helmet>

			<Header>
				<BtnRegresar />
				<Titulo>Lista de Gastos</Titulo>
			</Header>

			<Lista>
				{gastos.map((gasto, index) => {
					return(
						<div key={gasto.id}>
							{/* gastos->arreglo del map index->para comprobar los index de las fechas gasto->informacion del propio gasto*/}
							{/* si la fecha no es igual a la del elemento anterior muestrame la fecha con su nuevo encabezado css */}
							{!fechaEsIgual(gastos, index, gasto) && <Fecha>{formatearFecha(gasto.fecha)}</Fecha>}
							<ElementoLista key={gasto.id}>
								<Categoria>
									<IconoCategoria id={gasto.categoria} />
									{gasto.categoria}
								</Categoria>

								<Descripcion>
									{gasto.descripcion}
								</Descripcion>
								<Valor>{convertirAMoneda(gasto.cantidad)}</Valor>

								<ContenedorBotones>
									<BotonAccion as={Link} to={`/editar/${gasto.id}`}>
										<IconoEditar />
									</BotonAccion>
									<BotonAccion onClick={() => borrarGasto(gasto.id)}>
										<IconoBorrar />
									</BotonAccion>
								</ContenedorBotones>
							</ElementoLista>
						</div>
					);
				})}

				{hayMasPorCargar && 
					<ContenedorBotonCentral>
						<BotonCargarMas onClick={() => obtenerMasGastos()}>Cargar Más</BotonCargarMas>
					</ContenedorBotonCentral>
				}

				{gastos.length === 0 &&
					<ContenedorSubtitulo>
						<Subtitulo>No hay gastos por mostrar</Subtitulo>
						<Boton as={Link} to="/">Agregar Gasto</Boton>
					</ContenedorSubtitulo>
				}
			</Lista>

			<BarraTotalGastado/>
		</>
	);
}
 
export default ListaDeGastos;