import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiXCircle } from "react-icons/fi";




export default function FormCliente({fechData,datos,estado,setEstado,RegistradoPor}){
    const form = document.getElementsByClassName("form")
    const[repetido,setRepetido]=useState()
    
    const { register,formState: {errors} , handleSubmit, watch} = useForm()
    
    const onsubmit= async (data) => {
        const repetidos = datos.find(dat => dat.Codigo == data.Codigo)
        if(repetidos){    
            setRepetido(repetidos)
            setTimeout(()=>{
                setRepetido()
            },3000)
        }else{
            const NuevoCliente = {
                "Codigo": data.Codigo,
                "Nombre": data.Nombre,
                "Direccion": data.Direccion,
                "Numero": data.Numero,
                "Cedula": data.Cedula,
                "Registro": RegistradoPor
            }
            const response = await axios.post("http://localhost:4000/postcliente",NuevoCliente)
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
        <form onSubmit={handleSubmit(onsubmit)} className="form" >
               <div className="x" onClick={()=> setEstado(!estado)}>   
               <FiXCircle className="x1"/>
               </div>
               <h1>Nuevo Cliente</h1>
               <div>
                   <label >Codigo:</label>
                   <input type="number" {...register("Codigo",
                   {
                       required: true,
                       maxLength: 5,
                       minLength:5

                   }
                   )}className="field" />
                   {errors.Codigo?.type === 'required' && <p>El Campo codigo es requerido</p> }
                   {errors.Codigo?.type === 'minLength' && <p>El minimo de caracteres son 5</p> }
                   {errors.Codigo?.type === 'maxLength' && <p>El limite de carecteres son 5</p> }
                   {repetido && <p>El codigo ya esta en el sistema</p>}
               </div>

               <div>
                   <label >Nombre:</label>
                   <input type="text" maxLength="25" {...register("Nombre",
                   {
                       required: true,
                       minLength: 5
                       
                   }
                   )} className="field" />
                   {errors.Nombre?.type === 'required' && <p>El Campo nombre es requerido</p> }
                   {errors.Nombre?.type === 'minLength' && <p>El minimo de caracteres son 5</p> }
               </div>
               <div>
                   <label >Direccion</label>
                   <input type="text" maxLength="40" {...register("Direccion",
                   {
                       required: true,
                       minLength: 5

                   })} className="field"/>
                   {errors.Direccion?.type === 'required' && <p>El campo direccion es requerido</p> }
                   {errors.Direccion?.type === 'minLength' && <p>El minimo de caracteres son 5</p> }
               </div>

               <div>
                   <label >Numero:</label>
                   <input type="number" {...register("Numero",{
                       required: true,
                       maxLength: 11,
                       minLength: 10

                   })} className="field" />
                   {errors.Numero?.type === 'required' && <p>El Campo numero es requerido</p> }
                   {errors.Numero?.type === 'minLength' && <p>El numero no es valido</p> }
                   {errors.Numero?.type === 'maxLength' && <p>El numero no es valido</p> }
               </div>
                  
               <div>
                   <label >Cedula:</label>
                   <input type="number" {...register("Cedula",{
                       required: true,
                       maxLength: 11,
                       minLength: 11,

                   })} className="field" />
                   {errors.Cedula?.type === 'required' && <p>El Campo Cedula es requerido</p> }
                   {errors.Cedula?.type === 'maxLength' && <p>La Cedula debe tener 11 Digitos</p> }
                   {errors.Cedula?.type === 'minLength' && <p>La Cedula debe tener 11 Digitos</p> }
                   
               </div>
               <input type="submit" value="Registrar" className="btn btn-blue"/>
           </form>
       </div>
    }
        

        </>
    )
}