import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillFileTextFill} from "react-icons/bs";

export default function Registro({RegistradoPor}){
    const form = document.getElementsByClassName("form2")
    const { register,formState: {errors} , handleSubmit} = useForm()
    const validation = ["7060","7070","7080","7090"]
    const [datos,setDatos]= useState()
    const [mensaje,setMensaje] =useState()
    const [look, setlook] = useState(false)



    const fechDataClient= async ()=>{
        const transData = await axios.get("http://localhost:4000/getCliente")
        setDatos(transData.data)
    }

    useEffect(()=>{
        fechDataClient()
    },[])

    const onsubmit = async (data)=>{
       const result = validation.map((vali) => vali == data.Codigo)
       const encontrado = result.includes(true)
       
   
       const encontradClient = datos.find(fetch => fetch.Codigo == data.Codigo) 

       if(encontrado || encontradClient){
        
        const fecha = new Date()

        
        function resultado(){
            if(data.Partida == 'Debito'){
                return parseInt(data.Monto)
            }else if(data.Partida == 'Credito'){
                const negativo = parseInt(data.Monto) * -1
                console.log(negativo)
                return negativo
            }
        }    
        const newdata = {
            "Codigo": data.Codigo,
            "Asiento": data.Asiento,
            "Descripcion": data.Descripcion,
            "Partida": data.Partida,
            "Monto": resultado(),
            "Saldo": resultado(),
            "Fecha": `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`,
            "Registro": RegistradoPor
        }

        const response = await axios.post("http://localhost:4000/postTrans",newdata)
        
        if(response.data.check){
            setlook(true)
            setMensaje(response.data.mensaje)
            form[0].reset()
            setTimeout(()=>{
                setMensaje()  
            },3000)

        }        
       
       }else{
        setlook(false)
        
        setMensaje("El codigo no es valido intente de nuevo")
        setTimeout(()=>{
            setMensaje()
        },3000)
       }
       
    }
    return(
        <>
        <div >
        <form onSubmit={handleSubmit(onsubmit)} className="form2" >
            <div className="regiclas">
               <BsFillFileTextFill className="icon_regi"/>
               <h1 className="title_regi">Registro</h1>
            </div>  
               <div>
                   <label >Codigo:</label>
                   <input type="number"  {...register("Codigo",
                   {
                       required: true,
                       maxLength: 5,
                       minLength:4

                   }
                   )}className="field" />
                   {errors.Codigo?.type === 'required' && <p>El Campo codigo es requerido</p> }
                   {errors.Codigo?.type === 'minLength' && <p>El minimo de caracteres son 4</p> }
                   {errors.Codigo?.type === 'maxLength' && <p>El limite de carecteres son 4</p> }
               </div>

               <div>
                   <label >Asiento:</label>
                   <select  {...register("Asiento",
                   {
                       required: true
                   }
                   )} className="field sele" >
                        <option value="PG">PG</option>
                        <option value="FV">FV</option>
                        <option value="IN">IN</option>
                        <option value="DP">DP</option>
                        <option value="CP">CP</option>
                        <option value="IV">IV</option>
                   </select>
                   {errors.Asiento?.type === 'required' && <p>El Campo asiento es requerido</p> }
               </div>
               <div>
                   <label >Descripcion:</label>
                   <input type="text" maxLength="40" {...register("Descripcion",
                   {
                       required: true,
                       minLength: 5

                   })} className="field"/>
                   {errors.Descripcion?.type === 'required' && <p>El campo descripcion es requerido</p> }
                   {errors.Descripcion?.type === 'minLength' && <p>El minimo de caracteres son 5</p> }
               </div>

               <div>
                   <label >Partida contable:</label>
                   <select type="number" {...register("Partida",{
                       required: true

                   })} className="field sele" >
                        <option value="Debito">Debito</option>
                        <option value="Credito">Credito</option>
                   </select>

                   {errors.Partida?.type === 'required' && <p>El Campo partida es requerido</p> }
               </div>
                  
               <div>
                   <label>Monto:</label>
                   <input type="number" {...register("Monto",{
                       required: true
                   })} className="field" />
                   {errors.Monto?.type === 'required' && <p>El Campo Monto es requerido</p> }
               </div>
               
               {mensaje ? <p className={look? "cambio2": "cambio1" }>{mensaje}</p> :<input type="submit" value="Registrar transaccion" className="btn btn-blue"/>}
           </form>
           </div>
        </>
    )
}