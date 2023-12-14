import { useEffect, useState } from "react"
import { BiPrinter } from "react-icons/bi"
import axios from "axios"
import {AiOutlineSearch} from "react-icons/ai"
import {RiFileExcel2Fill} from "react-icons/ri"
import * as XLSX from 'xlsx';

export default function Diario({icon,codigo,RegistradoPor}){

    const [api,setApi] = useState([])
    const cuentas = ["7050","7060","7070","7080","7090"]
    const [filtro,setFiltro]= useState([])
    const [visibility,setVisibily] = useState(true)

 
    const fechData = async ()=>{
        const transacciones = await axios.get("https://contable-server-production.up.railway.app/getTrans")
        if(transacciones.data.length > 0) {
            const buscado = transacciones.data.filter(re => cuentas.includes(re.Codigo) || (re.Codigo.length == 5 && re.Saldo > 0) || (re.Codigo.length == 5 && re.Saldo < 0 ) || (re.Codigo.length == 6 && re.Saldo < 0) || (re.Codigo.length == 6 && re.Saldo > 0))
            const filtro = buscado.filter((fil)=> fil.Registro == RegistradoPor)
            if(filtro.length > 0){
                setApi(filtro)
            }
            }

    }

    useEffect(()=>{
        fechData()
    },[])


    const[suma, setSuma] = useState(0)
    

    function autosuma(array){
        let count = 0 
        array.forEach(value =>{
           let sum = parseInt(count) + parseInt(value.Saldo)
           setSuma(sum)
           count = sum
        })
       
    }

    useEffect(()=>{
        if(api.length > 0){
            autosuma(api)
        }
    },[api])

    useEffect(()=>{
        if(filtro.length > 0){
            autosuma(filtro)
        }else{
            autosuma(api)
        }
        
    },[filtro])


    function imprimir(){
        setVisibily(false)
        setTimeout(() => {
            window.print("")
            setVisibily(true)
        }, (100));
        
     
    }

    //Filtrar el valor
    function filtrar(){
        const filtValue = document.getElementById("filtro").value
        if(filtValue){
            const ValorAfiltrar = api.filter((ap)=> Object.values(ap).some(valor => String(valor).includes(filtValue)))
            if(ValorAfiltrar.length > 0){
                setFiltro(ValorAfiltrar)
            }else{
                alert("El campo no se encontro en lo registro")
            }
        }else{
            setFiltro([])
        }
        
    }

    //  exportar a excel
   function exportarExcel() {
    var tabla = document.getElementById("miTabla");
    var datos = XLSX.utils.table_to_sheet(tabla);
    var libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, datos, "Hoja1");
    XLSX.writeFile(libro, "Diario_General.xlsx");
   }



    const formatoNumero = new Intl.NumberFormat('en-US');

    return(
        <>
        <div>
        <div className="movecont">   
        <BiPrinter className={visibility ? "print " : "visibility"} onClick={imprimir}/>
        <RiFileExcel2Fill  className={visibility ? "print" : "visibility"}  onClick={exportarExcel}/>
        <div className="filtrado">
        <input type="text" name="filtro" className={visibility ? "liqui_text ayust1" : "visibility"} id="filtro" /><AiOutlineSearch onClick={filtrar} className="search"/>
        </div>
            <div className="move">
              <h1 className="ite_title">Mayor general</h1>
              {icon}
            </div>  
        </div>
        <div className="title_tran">
            
            <div className="tran_cont">
              {codigo && <p className="pp"></p>}  
               
            </div>
        </div>
        <div className="container_cliente" id="miTabla">
        <table>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Asiento</th>
                        <th>Fecha</th>
                        <th>Descripcion</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
            
              {api.length > 0 && <> 
                {filtro.length > 0 ? 
                filtro.map((ap,index)=>(<tr className="moditr" key={index}>
                     <td className="moditr">{ap.Codigo}</td>
                     <td className="moditr">{`${ap.Asiento}-000${ap.seq}`}</td>
                     <td className="moditr">{ap.Fecha}</td>
                     <td className="moditr">{ap.Descripcion}</td>
                     <td className="moditr">{formatoNumero.format(ap.Saldo)}</td>
                </tr>)) 
                : 
                api.map((ap,index) =>(
                <tr className="moditr" key={index}>
                     <td className="moditr">{ap.Codigo}</td>
                     <td className="moditr">{`${ap.Asiento}-000${ap.seq}`}</td>
                     <td className="moditr">{ap.Fecha}</td>
                     <td className="moditr">{ap.Descripcion}</td>
                     <td className="moditr">{formatoNumero.format(ap.Saldo)}</td>
                </tr>
                ))}
              </>}
              
                
          
               
                
                   
                </tbody> 
                
            </table>
            <div className="ayust_cont" >
              <h1 className="liqui_text ayust">{formatoNumero.format(suma)}</h1>
            </div> 
            {api.length == 0 &&  <p className="trans">No hay transaccion en el modulo</p>}
        </div>
        <br />
        </div>
    </>
    )
}