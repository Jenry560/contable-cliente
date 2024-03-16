import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiXCircle } from "react-icons/fi";

export default function FormCliente({
  fechData,
  datos,
  estado,
  setEstado,
  RegistradoPor,
}) {
  const form = document.getElementsByClassName("form");
  const [repetido, setRepetido] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onsubmit = async (data) => {
    const repetidos = datos.find((dat) => dat.Codigo == data.Codigo);
    if (repetidos) {
      setRepetido(repetidos);
      setTimeout(() => {
        setRepetido();
      }, 3000);
    } else {
      const NuevoCliente = {
        Codigo: data.Codigo,
        Nombre: data.Nombre,
        Direccion: data.Direccion,
        Numero: data.Numero,
        Cedula: data.Cedula,
        Registro: RegistradoPor,
      };
      await axios.post(
        "https://contableserver.azurewebsites.net/postcliente",
        NuevoCliente
      );
      fechData();
      setEstado(!estado);
    }
  };

  useEffect(() => {
    if (estado) {
      form[0].reset();
    }
  }, [estado, form]);

  return (
    <>
      {estado && (
        <div className="overlay">
          <form onSubmit={handleSubmit(onsubmit)} className="form">
            <div className="x" onClick={() => setEstado(!estado)}>
              <FiXCircle className="x1" />
            </div>
            <h1>Nuevo Cliente</h1>
            <div>
              {errors.Codigo?.type === "required" && (
                <p className="alerta">El Campo codigo es requerido</p>
              )}
              {errors.Codigo?.type === "minLength" && (
                <p className="alerta">El minimo de caracteres son 5</p>
              )}
              {errors.Codigo?.type === "maxLength" && (
                <p className="alerta">El limite de carecteres son 5</p>
              )}
              <label>Codigo:</label>
              <input
                type="number"
                {...register("Codigo", {
                  required: true,
                  maxLength: 5,
                  minLength: 5,
                })}
                className="field"
              />

              {repetido && <p>El codigo ya esta en el sistema</p>}
            </div>

            <div>
              {errors.Nombre?.type === "required" && (
                <p className="alerta">El Campo nombre es requerido</p>
              )}
              {errors.Nombre?.type === "minLength" && (
                <p className="alerta">El minimo de caracteres son 5</p>
              )}
              <label>Nombre:</label>
              <input
                type="text"
                maxLength="25"
                {...register("Nombre", {
                  required: true,
                  minLength: 5,
                })}
                className="field"
              />
            </div>
            <div>
              {errors.Direccion?.type === "required" && (
                <p className="alerta">El campo direccion es requerido</p>
              )}
              {errors.Direccion?.type === "minLength" && (
                <p className="alerta">El minimo de caracteres son 5</p>
              )}
              <label>Direccion</label>
              <input
                type="text"
                maxLength="40"
                {...register("Direccion", {
                  required: true,
                  minLength: 5,
                })}
                className="field"
              />
            </div>

            <div>
              {errors.Numero?.type === "required" && (
                <p className="alerta">El Campo numero es requerido</p>
              )}
              {errors.Numero?.type === "minLength" && (
                <p className="alerta">El numero no es valido</p>
              )}
              {errors.Numero?.type === "maxLength" && (
                <p className="alerta">El numero no es valido</p>
              )}
              <label>Numero:</label>
              <input
                type="number"
                {...register("Numero", {
                  required: true,
                  maxLength: 11,
                  minLength: 10,
                })}
                className="field"
              />
            </div>

            <div>
              {errors.Cedula?.type === "required" && (
                <p className="alerta">El Campo Cedula es requerido</p>
              )}
              {errors.Cedula?.type === "maxLength" && (
                <p className="alerta">La Cedula debe tener 11 Digitos</p>
              )}
              {errors.Cedula?.type === "minLength" && (
                <p className="alerta">La Cedula debe tener 11 Digitos</p>
              )}
              <label>Cedula:</label>
              <input
                type="number"
                {...register("Cedula", {
                  required: true,
                  maxLength: 11,
                  minLength: 11,
                })}
                className="field"
              />
            </div>
            <input type="submit" value="Registrar" className="btn btn-blue" />
          </form>
        </div>
      )}
    </>
  );
}
