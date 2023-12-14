import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiXCircle } from "react-icons/fi";



export default function FormProveedor({fechData,datos,estado,setEstado,RegistradoPor}){
    const form = document.getElementsByClassName("form")
    const[repetido,setRepetido]=useState()
    const[cargando,setCargando] = useState(false)
    
    const { register,formState: {errors} , handleSubmit,watch} = useForm()

    const  consultRnc = async (e) => {
        setCargando(true)
        const consultarRnc = watch('Rnc','')
        const response = await axios.get(`https://api-dgi-production.up.railway.app/dgi/${consultarRnc}`)
        if(response.data.length > 0){
            alert(`Nombre: ${response.data[0].nombre} Status: ${response.data[0].status}`)
        }else{
            alert('Rnc no es valido')
        }
        setCargando(false)
    }
    
    const onsubmit= async (data) => {
        const repetidos = datos.find(dat => dat.Codigo == data.Codigo)
        if(repetidos){    
            setRepetido(repetidos)
            setTimeout(()=>{
                setRepetido()
            },3000)
        }else{
            const NuevProveedor = {
                "Codigo": data.Codigo,
                "Nombre": data.Nombre,
                "Direccion": data.Direccion,
                "Numero": data.Numero,
                "Rnc": data.Rnc,
                "Correo": data.Correo,
                "Registro": RegistradoPor
            }
            await axios.post("https://contable-server-production.up.railway.app/postProveedor",NuevProveedor)
            fechData()
            setEstado(!estado)     
        }
    }
    
    useEffect(()=>{
        if(estado){
           form[0].reset() 
        }
     },[estado])
      
    return(
        <>{estado && 
        <div className="overlay" >
        <form onSubmit={handleSubmit(onsubmit)} className="form" style={{margin: '15px auto'}} >
               <div className="x" onClick={()=> setEstado(!estado)}>   
               <FiXCircle className="x1"/>
               </div>
               <h1>Nuevo Proveedor</h1>
               <div>
                   {errors.Codigo?.type === 'required' && <p className="alerta">El Campo codigo es requerido</p> }
                   {errors.Codigo?.type === 'minLength' && <p className="alerta">El minimo de caracteres son 6</p> }
                   {errors.Codigo?.type === 'maxLength' && <p className="alerta">El limite de carecteres son 6</p> }
                   {repetido && <p>El codigo ya esta en el sistema</p>}
                   <label >Codigo:</label>
                   <input type="number" {...register("Codigo",
                   {
                       required: true,
                       maxLength: 6,
                       minLength:6

                   }
                   )}className="field" />
               </div>

               <div>
               {errors.Nombre?.type === 'required' && <p className="alerta" >El Campo nombre es requerido</p> }
                   {errors.Nombre?.type === 'minLength' && <p className="alerta" >El minimo de caracteres son 5</p> }
                   <label >Nombre:</label>
                   <input type="text" maxLength="25" {...register("Nombre",
                   {
                       required: true,
                       minLength: 5
                       
                   }
                   )} className="field" />
                  
               </div>
               <div>
                   {errors.Direccion?.type === 'required' && <p className="alerta" >El campo direccion es requerido</p> }
                   {errors.Direccion?.type === 'minLength' && <p className="alerta" >El minimo de caracteres son 5</p> }
                   <label >Direccion</label>
                   <input type="text" maxLength="40" {...register("Direccion",
                   {
                       required: true,
                       minLength: 5

                   })} className="field"/>
               </div>

               <div>
                   {errors.Numero?.type === 'required' && <p className="alerta" >El Campo numero es requerido</p> }
                   {errors.Numero?.type === 'minLength' && <p className="alerta"  >El numero no es valido</p> }
                   {errors.Numero?.type === 'maxLength' && < p className="alerta" >El numero no es valido</p> }
                   <label >Numero:</label>
                   <input type="number" {...register("Numero",{
                       required: true,
                       maxLength: 11,
                       minLength: 10

                   })} className="field" />
               </div>
                  
               <div >
                   
                   {errors.Rnc?.type === 'required' && <p className="alerta" >El Campo Rnc es requerido</p> }
                   {errors.Rnc?.type === 'maxLength' && <p className="alerta" >El Rnc debe ser menor 13 Digitos</p> }
                   {errors.Rnc?.type === 'minLength' && <p className="alerta" >El Rnc debe ser mayor 9 digitos</p> }
                  
                   <label >Rnc:</label>
                   <input type="number" {...register("Rnc",{
                       required: true,
                       maxLength: 13,
                       minLength: 9,

                   })} className="field" />
                   {cargando ? <div>Cargando...</div>  :  <button type="button" onClick={consultRnc} className="rnc_button">Validar Rnc</button>}
               </div>
               

               <div>
                   {errors.Correo?.type === 'required' && <p className="alerta" >El Campo Correo es requerido</p> }
                   {errors.Correo?.type === 'pattern' && <p  className="alerta" >El Correo no es valido</p> }
                   <label >Correo:</label>
                   <input type="text" {...register("Correo",
                {   pattern:  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                    required: true
                })}  className="field" />
               
                 
               </div>
               <input type="submit" value="Registrar" className="btn btn-blue"/>
           </form>
       </div>
    }
        

        </>
    )
}