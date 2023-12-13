
import {useEffect, useState } from "react";
import Data from "./datopro";
import axios from "axios"
import * as XLSX from 'xlsx';
import { BiPrinter } from "react-icons/bi"
import {AiOutlineSearch} from "react-icons/ai"
import {RiFileExcel2Fill} from "react-icons/ri"
import TranProveedor from "./tranproveedor";
import FormProveedor from "./formproveedor";
import { FaTruck } from "react-icons/fa";



export default function Proveedor({RegistradoPor}){
    const[datos, setDatos]= useState([])
    const[estado , setEstado] = useState(false)
    const[env ,setEnv] = useState()
    const[base, setBase]= useState([])
    const [visibility,setVisibily] = useState(true)
    const [filtro,setFiltro]= useState([])



    const fechData= async ()=>{
        const ClienteData = await axios.get("https://server-contable.onrender.com/getProveedores")
        const filtro = ClienteData.data.filter((fil)=> fil.Registro == RegistradoPor)
        if(filtro.length > 0){
            setDatos(filtro)
        }
    }

    const fechDataTrans = async ()=>{
        const TransData = await axios.get("https://server-contable.onrender.com/getTrans")
        const filtro = TransData.data.filter((fil)=> fil.Registro == RegistradoPor)
        if(filtro.length > 0){
            setBase(filtro)
            
        }
    }


    const enviox = val =>{
        const finded = datos.find(llegue => llegue.Codigo == val)
        setEnv(finded)

    };
    

    useEffect(()=>{
        fechDataTrans()
    },[])
    
    useEffect(()=>{
        if(datos){
           fechData()
        }  
    },[datos])


    //Codigo para liquidar

  
    const [number,setNumber]= useState([])
    const [value,setValue] = useState(0)
    

    function calcular(numero,id){
   
       const revisar = number.map(dat=> dat.Id == id)
       
       if(revisar.includes(true)){
         const nuevo =  number.filter(dat=> dat.Id !== id)
         setNumber(nuevo)
       
        }else{
            const dash = {
                numbe: numero,
                Id:id
            }
            setNumber([...number,dash])
           
        }
        
    }


    const liquidar = async ()=>{

        try {

            if(number.length === 2){
                let hay_negativo = true
                let hay_positivo = false
                for (var num of number){
                  if(num.numbe > 0){hay_positivo = true}
                  else if(num.numbe < 0){hay_negativo = false}
                }
              
                if(!hay_negativo && hay_positivo ){
                    let valor_positivo = 0
                    let valor_Negativo = 0
                    for (var id_seq of number){
                        if(id_seq.numbe > 0){ valor_positivo = id_seq.Id}
                        else if(id_seq.numbe < 0){valor_Negativo = id_seq.Id}
                      
                        
                    }
                    const dataLiqui = {
                        id_positivo: valor_positivo,
                        id_negativo: valor_Negativo,
                        value: value
                    }
        
                    const respuesta = await axios.post("https://server-contable.onrender.com/liquidar",dataLiqui)
                    if(respuesta){
                        window.location.reload()
                    }
                }else{
                  alert("Solo puede selecionar un debito y credito para poder liquidar la tra")
                }
            }else if (number.length > 2){
                alert("Has excedido el numero de dos trasacciones para poder hacer la funcion de liquidar") 
            }else if (number.length < 2){
                alert("Debes selecionar dos trasacciones para poder hacer la funcion de liquidar")
            }
        } catch (error) {
            console.log(error)
        }
    }
     
    //funcion auto suma de las transacciones
    useEffect(()=>{
        setValue()
        let count = 0

        number.forEach(element => {
            count = count + parseInt(element.numbe)
          });
        setValue(count)
    },[number])
    
   



    function imprimir(){
        setVisibily(false)
        setTimeout(() => {
            window.print("")
            setVisibily(true)
        }, (100));
        
     
    }

    function filtrar(){
        const filtValue = document.getElementById("filtro").value
        if(filtValue){
            const ValorAfiltrar = datos.filter((ap)=> Object.values(ap).some(valor => String(valor).includes(filtValue)))
            if(ValorAfiltrar.length > 0){
                setFiltro(ValorAfiltrar)
            }else{
                alert("El campo no se encontro en lo registro")
            }
        }else{
            setFiltro([])
        }
        
    }


   function exportarExcel() {
    var tabla = document.getElementById("miTabla");
    var datos = XLSX.utils.table_to_sheet(tabla);
    var libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, datos, "Hoja1");
    XLSX.writeFile(libro,  `Clientes.xlsx`);
   }
    


    return(
        <>
       {env ? <TranProveedor env={env} base={base} calcular={calcular} value={value} liquidar={liquidar}/>: <>
        <div>
         
        <h1 className="cliente_title">Proveedores</h1>
        <div className="icon_add">
         <FaTruck  className="add_icon" onClick={()=> setEstado(!estado)}/>
        </div>
        <div className="newmove">
        <BiPrinter className={visibility ? "printClient" : "visibility"} onClick={imprimir}/>
        <RiFileExcel2Fill  className={visibility ? "printClient" : "visibility"}  onClick={exportarExcel}/>
        <div className="filtrado">
        <input type="text" name="filtro" className={visibility ? "liqui_text ayust1" : "visibility"} id="filtro" /><AiOutlineSearch onClick={filtrar} className="search"/>
        </div>
        </div>
       
        <div className="container_cliente" id="miTabla">
            <table>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Direccion</th>
                        <th>Numero</th>
                        <th>Rnc</th>
                        <th>Correo</th>
                    </tr>
                </thead>
                <tbody>


                {datos.length > 0 && <> 
                {filtro.length > 0 ? 
                filtro.map((dato,index)=>(
                     <tr key={index}>
                        <Data enviox={enviox} >{dato.Codigo}</Data>
                        <td>{dato.Nombre}</td>
                        <td>{dato.Direccion}</td>
                        <td>{dato.Numero}</td>
                        <td>{dato.Rnc}</td>
                        <td>{dato.Correo}</td>
                    </tr>
               )) 
                : 
                datos.map((dato, index) =>(
                    <tr key={index}>
                        <Data enviox={enviox} >{dato.Codigo}</Data>
                        <td>{dato.Nombre}</td>
                        <td>{dato.Direccion}</td>
                        <td>{dato.Numero}</td>
                        <td>{dato.Rnc}</td>
                        <td>{dato.Correo}</td>
                    </tr>
                ))}
              </>}    
              
                   
                </tbody> 
            </table>
            {datos.length === 0 && <p className="trans" >No hay proveedores registrado</p>}
               </div>

        </div>
        <br />
        <FormProveedor fechData={fechData} datos={datos}  estado={estado} setEstado={setEstado} RegistradoPor={RegistradoPor}/>
       </>}
        
       
        </>
    )
        
    
}

