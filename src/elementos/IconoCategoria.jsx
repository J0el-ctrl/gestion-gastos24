/* eslint-disable react/prop-types */ 
import IconoComida from './../imagenes/cat_comida.svg?react';
import IconoCompras from './../imagenes/cat_compras.svg?react';
import IconoCuentasYPagos from './../imagenes/cat_cuentas-y-pagos.svg?react';
import IconoDiversion from './../imagenes/cat_diversion.svg?react';
import IconoHogar from './../imagenes/cat_hogar.svg?react';
import IconoRopa from './../imagenes/cat_ropa.svg?react';
import IconoSaludEHigiene from './../imagenes/cat_salud-e-higiene.svg?react';
import IconoTransporte from './../imagenes/cat_transporte.svg?react';

const IconoCategoria = ({id}) => {
	switch(id){
		case 'comida':
			return <IconoComida />;
		case 'compras':
			return <IconoCompras />;
		case 'cuentas y pagos':
			return <IconoCuentasYPagos />;
		case 'diversion':
			return <IconoDiversion />;
		case 'hogar':
			return <IconoHogar />;
		case 'ropa':
			return <IconoRopa />;
		case 'salud e higiene':
			return <IconoSaludEHigiene />;
		case 'transporte':
			return <IconoTransporte />;
		default:
		break;
	}
}
 
export default IconoCategoria;