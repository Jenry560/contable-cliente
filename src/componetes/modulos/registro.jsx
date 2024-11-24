import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsFillFileTextFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Registro({ RegistradoPor }) {
  const navigate = useNavigate();
  const form = document.getElementsByClassName("form2");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const validation = ["7060", "7070", "7080", "7090"];
  const [datos, setDatos] = useState();
  const [mensaje, setMensaje] = useState();
  const [look, setlook] = useState(false);

  const fechDataClient = async () => {
    const transDataClientes = await axios.get(
      "https://contableserver.azurewebsites.net/getCliente"
    );
    const transDataProveedores = await axios.get(
      "https://contableserver.azurewebsites.net/getProveedores"
    );
    const personasData = transDataClientes.data.concat(
      transDataProveedores.data
    );
    setDatos(personasData);
  };

  useEffect(() => {
    fechDataClient();
  }, []);

  function resultado(data) {
    if (data.Partida == "Debito") {
      return parseInt(data.Monto);
    } else if (data.Partida == "Credito") {
      const negativo = parseInt(data.Monto) * -1;
      return negativo;
    }
  }
  const onsubmit = async (data) => {
    const result = validation.map((vali) => vali == data.Codigo);
    const encontrado = result.includes(true);

    const encontradClient = datos.find((fetch) => fetch.Codigo == data.Codigo);

    if (encontrado || encontradClient) {
      const fecha = new Date();

      const newdata = {
        Codigo: data.Codigo,
        Asiento: data.Asiento,
        Descripcion: data.Descripcion,
        Partida: data.Partida,
        Monto: resultado(data),
        Saldo: resultado(data),
        Fecha: `${fecha.getDate()}/${
          fecha.getMonth() + 1
        }/${fecha.getFullYear()}`,
        Registro: RegistradoPor,
      };

      //seccion de codigo donde se va regitrar la trasaccion al invetario//
      if (newdata.Codigo.length == 6 && newdata.Saldo < 0) {
        const newInventario = { ...newdata };
        newInventario.Codigo = "7090";
        newInventario.Monto = data.Monto;
        newInventario.Saldo = data.Monto;
        newInventario.Descripcion = `Proveedor: ${encontradClient.Nombre} (${newdata.Descripcion}) `;
        await axios.post(
          "https://contableserver.azurewebsites.net/postTrans",
          newInventario
        );
      }

      const response = await axios.post(
        "https://contableserver.azurewebsites.net/postTrans",
        newdata
      );

      if (response.data.check) {
        setlook(true);
        setMensaje(response.data.mensaje);
        form[0].reset();
        setTimeout(() => {
          setMensaje();
        }, 3000);
      }
    } else {
      setlook(false);

      setMensaje("El codigo no es valido intente de nuevo");
      setTimeout(() => {
        setMensaje();
      }, 3000);
    }
  };
  return (
    <>
      <div>
        <div className="icon_back">
          <AiOutlineArrowLeft
            className="back_icon"
            onClick={() => navigate("/")}
          />
        </div>
        <form onSubmit={handleSubmit(onsubmit)} className="form2">
          <div className="regiclas">
            <BsFillFileTextFill className="icon_regi" />
            <h1 className="title_regi">Registro</h1>
          </div>
          <div>
            <label>Codigo:</label>
            <input
              id="Codigo"
              type="number"
              {...register("Codigo", {
                required: true,
                maxLength: 6,
                minLength: 4,
              })}
              className="field"
            />
            {errors.Codigo?.type === "required" && (
              <p>El Campo codigo es requerido</p>
            )}
            {errors.Codigo?.type === "minLength" && (
              <p>El minimo de caracteres son 6</p>
            )}
            {errors.Codigo?.type === "maxLength" && (
              <p>El limite de carecteres son 4</p>
            )}
          </div>

          <div>
            <label>Asiento:</label>
            <select
              id="Asiento"
              {...register("Asiento", {
                required: true,
              })}
              className="field sele"
            >
              <option value="PG">PG</option>
              <option value="FV">FV</option>
              <option value="IN">IN</option>
              <option value="DP">DP</option>
              <option value="CP">CP</option>
              <option value="IV">IV</option>
            </select>
            {errors.Asiento?.type === "required" && (
              <p>El Campo asiento es requerido</p>
            )}
          </div>
          <div>
            <label>Descripcion:</label>
            <input
              id="Descripcion"
              type="text"
              maxLength="40"
              {...register("Descripcion", {
                required: true,
                minLength: 5,
              })}
              className="field"
            />
            {errors.Descripcion?.type === "required" && (
              <p>El campo descripcion es requerido</p>
            )}
            {errors.Descripcion?.type === "minLength" && (
              <p>El minimo de caracteres son 5</p>
            )}
          </div>

          <div>
            <label>Partida contable:</label>
            <select
              id="Partida"
              type="number"
              {...register("Partida", {
                required: true,
              })}
              className="field sele"
            >
              <option value="Debito">Debito</option>
              <option value="Credito">Credito</option>
            </select>

            {errors.Partida?.type === "required" && (
              <p>El Campo partida es requerido</p>
            )}
          </div>

          <div>
            <label>Monto:</label>
            <input
              id="Monto"
              type="number"
              {...register("Monto", {
                required: true,
              })}
              className="field"
            />
            {errors.Monto?.type === "required" && (
              <p>El Campo Monto es requerido</p>
            )}
          </div>

          {mensaje ? (
            <p className={look ? "cambio2" : "cambio1"}>{mensaje}</p>
          ) : (
            <input
              id="Submit"
              type="submit"
              value="Registrar transaccion"
              className="btn btn-blue"
            />
          )}
        </form>
      </div>
    </>
  );
}
