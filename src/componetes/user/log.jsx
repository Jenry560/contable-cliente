import { useState } from "react"
import {LuUserCircle} from "react-icons/lu"
import { set, useForm } from "react-hook-form";
import { Link} from "react-router-dom";
import axios from "axios"
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Loader from "../loader/Loader";
 
export default function Log(){

    const [load,setLoad] = useState(false)
    const [mensaje,setMensaje] = useState(false)
    const { register,formState: {errors} , handleSubmit} = useForm()
   
    const onSuccess = async (resp) =>{
        setLoad(true)
        const data = jwtDecode(resp.credential)
        const newData = {
            Correo: data.email,
            Nombre: data.name,
        }

        const response = await axios.post("https://server-contable.onrender.com/google",newData)
        if(response.data.check){
            const form = document.getElementsByClassName("input_user")
            form[0].reset()
            await localStorage.setItem("user",JSON.stringify(response.data))
            
            setTimeout(() => {
                window.location.href="/"
            }, 1000);
    }
    setLoad(false)
    }
    const onFailure = () =>{
        alert("something went wrong ")
    }

   
    
    const onSubmit = async (data) => {
       
        const form = document.getElementsByClassName("input_user")
     
        setLoad(true)

        const response = await axios.post("https://server-contable.onrender.com/compare",data)

        if(response.data.check){
            await localStorage.setItem("user",JSON.stringify(response.data))
            form[0].reset()
                
                await setTimeout(() => {
                 window.location.href="/"
                }, 1000);
               
        }else{
            setMensaje(response.data.mensaje)
            setTimeout(()=>{
                setMensaje()
            },2000)
            setLoad(false)
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
              
                <div className="inline">
                {mensaje && <p  style={{fontSize: "15px",color: 'red'}}>{mensaje}</p> }
                {errors.Correo?.type === 'pattern' && <p  style={{fontSize: "15px"}}>El Correo no es valido</p> }
                {errors.Correo?.type === 'required' && <p  style={{fontSize: "15px"}}>El Campo correo es requerido</p> }
                {errors.Contraseña?.type === 'required' && <p  style={{fontSize: "15px"}}>El Campo contraseña es requerido</p> }
                
                <div className="gogle" >
                 <GoogleLogin className="googleX" onSuccess={onSuccess} onError={onFailure}  />
                </div>
               <p className="media">Aun no tienes una cuenta entra &nbsp;<Link to="/sign">   aqui</Link></p>
               
               {load ? <Loader/> : <input type="submit" value="Iniciar sesion" className="btnx btn"/> }
               
               </div>
            </form>
            <br />
            <br />
        </section>
        </>
    )
}