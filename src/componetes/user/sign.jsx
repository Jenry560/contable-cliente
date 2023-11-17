import { useEffect, useState } from "react"
import {LuUserCircle} from "react-icons/lu"
import { useForm } from "react-hook-form";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

export default function Sign(){
  
    //validar que el correo no este registrado en la base de dato
    const[respuesta,setRespuesta]= useState()
    const history = useNavigate()
    const [mensaje,setMensaje] = useState(false)
    const { register,formState: {errors} , handleSubmit} = useForm()
    
    const clientId = "519988429373-9sugtshvmp40v3l447ls6gqnsm5ihj9u.apps.googleusercontent.com"
    
    useEffect(()=>{
        const start = () =>{
            gapi.auth2.init({
                clientId: clientId,
            })
        }
        gapi.load("client:auth2",start)
    },[])
    const onSuccess = (resp) =>{
        console.log(resp)
    }
    const onFailure = () =>{
        alert("something went wrong ")
    }
    
    const onSubmit = async (data) =>{
        const form = document.getElementsByClassName("input_user")

        if(data.Contraseña == data.Repetir){
            const response = await axios.post("https://server-contable.onrender.com/postlog",data)
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
                    <h1 className="app_title">Bienveniedo a la App contable</h1>
                    <p  className="app_p">Esta aplicación redefine la contabilidad: elegante, fácil de usar y poderosa. Simplifica tus finanzas con automatización inteligente y seguridad de primer nivel. Tu aliada perfecta para llevar un registro preciso de tus transacciones.</p>
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
                <GoogleLogin clientId={clientId} onSuccess={onSuccess} onFailure={onFailure} cookiePolicy='single_host_origin' className="gogle"/>
               <p className="media">Ya tienes una cuenta entra &nbsp;<Link to="/log">aqui</Link></p>
               <input type="submit" value="Crear usuario" className="btnx btn"/>
            </form>
        </section>
        </>
    )
}