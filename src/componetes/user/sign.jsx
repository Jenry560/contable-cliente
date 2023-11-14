import { useState } from "react"
import {LuUserCircle} from "react-icons/lu"
import { useForm } from "react-hook-form";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Sign(){
  
    //validar que el correo no este registrado en la base de dato
    const[respuesta,setRespuesta]= useState()
    const history = useNavigate()
    const [mensaje,setMensaje] = useState(false)
    const { register,formState: {errors} , handleSubmit} = useForm()
    

    const fechPost = async (datos)=>{
        
    }

    const onSubmit = async (data) =>{
        const form = document.getElementsByClassName("input_user")

        if(data.Contraseña == data.Repetir){
            const response = await axios.post("http://localhost:4000/postlog",data)
            if(response.data.check){
                form[0].reset()
                history("/log")
            }else{
                setMensaje(response.data.mensaje)
                setRespuesta()
                setTimeout(()=>{
                    setMensaje()
                },2000)
            }
        }else{ 
            setMensaje("Las contraseña no coinciden")
            setTimeout(()=>{
                setMensaje(false)
            },3000)
        }

    }
    return(
        <>
        <section >
            <form className="input_user" onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <h1 style={{fontSize: "50px"}}>App contable</h1>
                    <LuUserCircle style={{fontSize : "90px", color: "black"}} />
                    <h1 style={{color: "black", marginBottom:"15px"}} className="media">Registrarse</h1>
                </div>
                <div className="user">
                    
                <input type="text" placeholder="Nombre completo" className="user_int" maxLength={35} {...register("Nombre",
                   {
                       required: true,
                   }
                   )}/>
                
                <input type="text" placeholder="Correo" className="user_int"{...register("Correo",
                {   pattern:  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                    required: true
                })}/>
                <input type="password" placeholder="Contraseña"  className="user_int" maxLength={35} {...register("Contraseña",
                {
                    required: true
                })}/>
                <input type="password" placeholder="Repetir contraseña" className="user_int" maxLength={35} {...register("Repetir",{
                    required: true
                })} />
                </div>
                {errors.Nombre?.type === 'required' && <p style={{fontSize: "15px"}}>El Campo nombre es requerido</p> }
                {errors.Correo?.type === 'required' && <p  style={{fontSize: "15px"}}>El Campo correo es requerido</p> }
                {errors.Correo?.type === 'pattern' && <p  style={{fontSize: "15px"}}>El Correo no es valido</p> }
                {errors.Contraseña?.type === 'required' && <p  style={{fontSize: "15px"}}>El Campo contraseña es requerido</p> }
                {errors.Repetir?.type === 'required' && <p  style={{fontSize: "15px"}}>El Campo contraseña 2 es requerido</p> }
                {mensaje && <p>{mensaje}</p>}
               <p style={{color: "black", marginTop:"20px"}} className="media">Ya tienes una cuenta entra &nbsp;<Link to="/log">aqui</Link></p>
               <input type="submit" value="Crear usuario" className="btnx btn"/>
            </form>
        </section>
        </>
    )
}