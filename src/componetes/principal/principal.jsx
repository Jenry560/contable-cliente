import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
const logo = new URL("../../imagenes/count.png",import.meta.url);
const svg = new URL("../../imagenes/svgf.svg",import.meta.url);

import Typed from 'typed.js';

export default function Principal(){
    const el = useRef(null)

    useEffect(()=>{
        const typed = new Typed(el.current, {
            strings: ['+3000 Transacciones', '+400 Clientes','Registros actulizados'],
            smartBackspace: true,
            typeSpeed: 75,
            startDelay: 500,
            backDelay: 800,
            backSpeed: 75,
            loop: true,
            loopCount: false,
            showCursor: true,
            cursorChar: '|'
          });
      
          return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();}
    },[])
    return(
        <>
        <div className='background'>
        <div className='principal'>
        
        <div className='principal_title'> 
        <img src={logo} alt="app contable" className='contable'/>
        <h1>CONTROL FINANCIERO CON: </h1>
        <p><span ref={el}></span></p>
      
        </div>


        <div> 
        <img src={svg} alt="svg for finace" style={{width:'400px'}}/>
    
        <div className='principal_rutas'>

            <Link to='/sign' className='boton_rute'>Registrarse</Link>
          
            <Link to='/log' className='boton_rute'>Iniciar sesión</Link>
        </div>    
        </div>
        
       

        </div>
        </div>
        </>
    )
}