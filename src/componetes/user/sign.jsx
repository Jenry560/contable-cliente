import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Loader from "../loader/Loader";
const logo = new URL("../../imagenes/App_contable.png", import.meta.url);
export default function Sign() {
  const history = useNavigate();
  const [mensaje, setMensaje] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [load, setLoad] = useState(false);

  const onSuccess = async (resp) => {
    setLoad(true);
    const data = jwtDecode(resp.credential);
    const newData = {
      Correo: data.email,
      Nombre: data.name,
    };

    const response = await axios.post(
      "https://contableserver.azurewebsites.net/google",
      newData
    );
    if (response.data.check) {
      const form = document.getElementsByClassName("input_user");
      form[0].reset();
      await localStorage.setItem("user", JSON.stringify(response.data));

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };
  const onFailure = () => {
    alert("something went wrong ");
  };

  const onSubmit = async (data) => {
    const form = document.getElementsByClassName("input_user");
    setLoad(true);
    if (data.Contraseña == data.Repetir) {
      const response = await axios.post(
        "https://contableserver.azurewebsites.net/postlog",
        data
      );
      if (response.data.check) {
        form[0].reset();
        history("/log");
      } else {
        setMensaje(response.data.mensaje);
        setTimeout(() => {
          setMensaje();
        }, 2000);
      }
    } else {
      setMensaje("Las contraseña no coinciden");
      setTimeout(() => {
        setMensaje(false);
      }, 3000);
    }
    setLoad(false);
  };

  return (
    <>
      <section>
        <form className="input_user" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <img
              src={logo}
              alt="logo para el registro"
              style={{ width: "250px" }}
            />
            <h1
              style={{ color: "black", marginBottom: "15px" }}
              className="media"
            >
              Registrarse
            </h1>
          </div>
          <div className="user">
            <input
              type="text"
              placeholder="Nombre completo"
              className="user_int"
              maxLength={35}
              {...register("Nombre", {
                required: true,
              })}
            />

            <input
              type="text"
              placeholder="Correo"
              className="user_int"
              {...register("Correo", {
                pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                required: true,
              })}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="user_int"
              maxLength={35}
              {...register("Contraseña", {
                required: true,
              })}
            />
            <input
              type="password"
              placeholder="Repetir contraseña"
              className="user_int"
              maxLength={35}
              {...register("Repetir", {
                required: true,
              })}
            />
          </div>

          <div className="inline">
            {errors.Nombre?.type === "required" && (
              <p style={{ fontSize: "15px" }}>El Campo nombre es requerido</p>
            )}
            {errors.Correo?.type === "required" && (
              <p style={{ fontSize: "15px" }}>El Campo correo es requerido</p>
            )}
            {errors.Correo?.type === "pattern" && (
              <p style={{ fontSize: "15px" }}>El Correo no es valido</p>
            )}
            {errors.Contraseña?.type === "required" && (
              <p style={{ fontSize: "15px" }}>
                El Campo contraseña es requerido
              </p>
            )}
            {errors.Repetir?.type === "required" && (
              <p style={{ fontSize: "15px" }}>
                El Campo contraseña 2 es requerido
              </p>
            )}
            {mensaje && <p>{mensaje}</p>}
            <div className="gogle">
              <GoogleLogin
                className="googleX"
                onSuccess={onSuccess}
                onError={onFailure}
              />
            </div>
            <p className="media">
              Ya tienes una cuenta entra &nbsp;<Link to="/log">aqui</Link>
            </p>
            {load ? (
              <Loader />
            ) : (
              <input type="submit" value="Crear usuario" className="btnx btn" />
            )}
          </div>
        </form>
        <br />
        <br />
      </section>
    </>
  );
}
