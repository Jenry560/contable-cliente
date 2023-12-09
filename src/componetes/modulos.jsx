import { Link } from 'react-router-dom';
import '../App.css'
const cliente = new URL("../imagenes/cliente.png",import.meta.url);
const registro = new URL("../imagenes/registro1.png",import.meta.url);
const cxc = new URL("../imagenes/cxc.jpg",import.meta.url);
const cxp = new URL("../imagenes/cxp.png",import.meta.url);
const ingresos = new URL("../imagenes/ingresos.png",import.meta.url);
const invetario = new URL("../imagenes/inve2.png",import.meta.url);
const gasto = new URL("../imagenes/gastos.png",import.meta.url);
const diario = new URL("../imagenes/diario.png",import.meta.url);
function Modulos() {

  return (
    <>
    <div className='container'>
    
     <div className="picture__cont">
       <div >
       <figure className="information__pictures">
            <img src={cliente} className="information__img" />
            <div className="capa">
            <Link to="/cliente" className="abs">Clientes</Link>
            </div>
            
        </figure>
        <h1 className='title'>Clientes</h1>
        </div>
        <div  >
        <figure className="information__pictures">
            <img src={registro} className="information__img" />
            <div className="capa">
             <Link to="/registro" className="absolute" >Registro</Link>
            </div>
        </figure>
        <h1 className='title'>Registro</h1>
        </div> 
        <div  >
        <figure className="information__pictures">
            <img src={cxc} className="information__img" />
            <div className="capa">
              <Link to="/cxc" className='absolute'>CXC</Link>   
            </div>
        </figure>
        <h1 className='title'>Cuenta por Cobrar</h1>
        </div> 
        
        <div  >
        <figure className="information__pictures">
            <img src={cxp} className="information__img" />
            <div className="capa">
              <Link to="/cxp" className="absolute">7060</Link>
              
            </div>
        </figure>
        <h1 className='title'>Cuenta por pagar</h1>
        </div> 

        <div  >
        <figure className="information__pictures">
            <img src={ingresos} className="information__img" />
            <div className="capa">
              <Link to="/ingresos" className="absolute">7070</Link>
              
            </div>
        </figure>
        <h1 className='title'>Ingresos</h1>
        </div> 

        <div  >
        <figure className="information__pictures">
            <img src={gasto} className="information__img" />
            <div className="capa">
              <Link to="/gastos" className="absolute">7080</Link>
              
            </div>
        </figure>
        <h1 className='title'>Gastos</h1>
        </div> 

        <div  >
        <figure className="information__pictures">
            <img src={invetario} className="information__img" />
            <div className="capa">
              <Link to="/inventario" className="absolute">7090</Link>
              
            </div>
        </figure>
        <h1 className='title'>Inventario</h1>
        </div> 

        <div  >
        <figure className="information__pictures">
            <img src={diario} className="information__img" />
            <div className="capa">
              <Link to="/diario" className="absolute">8000</Link>
              
            </div>
        </figure>
        <h1 className='title'>Diario general</h1>
        </div> 
        
        <div  >
        <figure className="information__pictures">
            <img src={diario} className="information__img" />
            <div className="capa">
              <Link to="/proveedores" className="absolute">8010</Link>
              
            </div>
        </figure>
        <h1 className='title'>Provedores</h1>
        </div> 
        

       
       
     </div>
        </div>
   
    </>
  )
}

export default Modulos
