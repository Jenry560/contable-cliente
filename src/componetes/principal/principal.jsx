import { Link } from 'react-router-dom';
const logo = new URL(".../imagenes/cliente.png",import.meta.url);
export default function Principal(){
    return(
        <>
        <div className='principal'>
        <div className='principal_title'>
        <img src={logo} alt="app contable" />
        <p>Maneja tu contabilidad contabilidad</p>
        </div>
      
        <div className='principal_rutas'>
            <Link to='/sign' >Registrarse</Link>
          
            <Link to='/log'>Iniciar seccion</Link>
        </div>
        </div>
        </>
    )
}