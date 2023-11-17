import { useState } from "react"
import {LuUserCircle} from "react-icons/lu"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

export default function Log(){

    
    const [mensaje,setMensaje] = useState(false)
    const { register,formState: {errors} , handleSubmit} = useForm()
   

   
    
    const onSubmit = async (data) => {
       
        const form = document.getElementsByClassName("input_user")
     

        const response = await axios.post("https://server-contable.onrender.com/compare",data)

        if(response.data.check){
            await localStorage.setItem("user",JSON.stringify(response.data))
            form[0].reset()
                
                setTimeout(() => {
                  window.location.href="/"
                }, 1000);
               
        }else{
            setMensaje(response.data.mensaje)
            setTimeout(()=>{
                setMensaje()
            },2000)
        }

    }
    return(
        <>
        <section >
            <form className="input_user" onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <h1 className="app_title">Bienveniedo a la App contable</h1>
                    <LuUserCircle style={{fontSize : "90px", color: "black"}} />
                    <h1 style={{color: "black", marginBottom:"15px"}} className="media">Iniciar sesion</h1>
                </div>
                <div className="user">
                
                <input type="text" placeholder="Correo" className="user_int"{...register("Correo",
                {   pattern:  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                    required: true
                })}/>
                <input type="password" placeholder="Contraseña"  className="user_int" maxLength={35} {...register("Contraseña",
                {
                    required: true
                })}/>
                </div>
                {mensaje && <p  style={{fontSize: "15px",color: 'red'}}>{mensaje}</p> }
                {errors.Correo?.type === 'pattern' && <p  style={{fontSize: "15px"}}>El Correo no es valido</p> }
                {errors.Correo?.type === 'required' && <p  style={{fontSize: "15px"}}>El Campo correo es requerido</p> }
                {errors.Contraseña?.type === 'required' && <p  style={{fontSize: "15px"}}>El Campo contraseña es requerido</p> }
              
               <p className="media">Aun no tienes una cuenta entra &nbsp;<Link to="/sign">   aqui</Link></p>
               <input type="submit" value="Iniciar sesion" className="btnx btn"/>
            </form>
        </section>
        </>
    )
}