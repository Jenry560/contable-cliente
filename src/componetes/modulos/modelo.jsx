import { useEffect, useState } from "react";
import { BiPrinter } from "react-icons/bi";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { RiFileExcel2Fill } from "react-icons/ri";
import * as XLSX from "xlsx";

export default function Modelo({ title, icon, codigo, RegistradoPor }) {
  const [api, setApi] = useState([]);
  const [suma, setSuma] = useState(0);
  const [visibility, setVisibily] = useState(true);
  const [filtro, setFiltro] = useState([]);

  function autosuma(array) {
    let count = 0;
    array.forEach((value) => {
      let sum = parseInt(count) + parseInt(value.Saldo);
      setSuma(sum);
      count = sum;
    });
  }

  const fechData = async () => {
    const transacciones = await axios.get(
      "https://contableserver.azurewebsites.net/getTrans"
    );
    if (transacciones.data.length > 0) {
      const buscado = transacciones.data.filter(
        (re) => re.Codigo == codigo && re.Registro == RegistradoPor
      );
      if (buscado.length > 0) {
        setApi(buscado);
      }
    }
  };

  useEffect(() => {
    fechData();
  }, []);

  useEffect(() => {
    if (api.length > 0) {
      autosuma(api);
    }
  }, [api]);

  useEffect(() => {
    if (filtro.length > 0) {
      autosuma(filtro);
    } else {
      autosuma(api);
    }
  }, [filtro]);

  function imprimir() {
    setVisibily(false);
    setTimeout(() => {
      window.print("");
      setVisibily(true);
    }, 100);
  }

  function filtrar() {
    const filtValue = document.getElementById("filtro").value;
    if (filtValue) {
      const ValorAfiltrar = api.filter((ap) =>
        Object.values(ap).some((valor) => String(valor).includes(filtValue))
      );
      if (ValorAfiltrar.length > 0) {
        setFiltro(ValorAfiltrar);
      } else {
        alert("El campo no se encontro en lo registro");
      }
    } else {
      setFiltro([]);
    }
  }

  function exportarExcel() {
    var tabla = document.getElementById("miTabla");
    var datos = XLSX.utils.table_to_sheet(tabla);
    var libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, datos, "Hoja1");
    XLSX.writeFile(libro, `${title}.xlsx`);
  }

  const formatoNumero = new Intl.NumberFormat("en-US");

  return (
    <>
      <div>
        <div className="movecont">
          <BiPrinter
            className={visibility ? "print" : "visibility"}
            onClick={imprimir}
          />
          <RiFileExcel2Fill
            className={visibility ? "print" : "visibility"}
            onClick={exportarExcel}
          />
          <div className="filtrado">
            <input
              type="text"
              name="filtro"
              className={visibility ? "liqui_text ayust1" : "visibility"}
              id="filtro"
            />
            <AiOutlineSearch onClick={filtrar} className="search" />
          </div>
          <div className="move">
            <h1 className="ite_title">{title}</h1>
            {icon}
          </div>
        </div>
        <div className="title_tran">
          <div className="tran_cont">
            {codigo && <p className="pp">Codigo: {codigo}</p>}
          </div>
        </div>
        <div className="container_cliente" id="miTabla">
          <table>
            <thead>
              <tr>
                <th>Asiento</th>
                <th>Fecha</th>
                <th>Descripcion</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {api.length > 0 && (
                <>
                  {filtro.length > 0
                    ? filtro.map((ap, index) => (
                        <tr className="moditr" key={index}>
                          <td className="moditr">{`${ap.Asiento}-000${ap.seq}`}</td>
                          <td className="moditr">{ap.Fecha}</td>
                          <td className="moditr">{ap.Descripcion}</td>
                          <td className="moditr">
                            {formatoNumero.format(ap.Saldo)}
                          </td>
                        </tr>
                      ))
                    : api.map((ap, index) => (
                        <tr className="moditr" key={index}>
                          <td className="moditr">{`${ap.Asiento}-000${ap.seq}`}</td>
                          <td className="moditr">{ap.Fecha}</td>
                          <td className="moditr">{ap.Descripcion}</td>
                          <td className="moditr">
                            {formatoNumero.format(ap.Saldo)}
                          </td>
                        </tr>
                      ))}
                </>
              )}
            </tbody>
          </table>
          <div className="ayust_cont">
            <h1 className="liqui_text ayust">{formatoNumero.format(suma)}</h1>
          </div>
          {api.length === 0 && (
            <p className="trans">No hay transaccion en el modulo</p>
          )}
        </div>
        <br />
      </div>
    </>
  );
}
