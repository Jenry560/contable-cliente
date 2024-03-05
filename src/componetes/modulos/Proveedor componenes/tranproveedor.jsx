import { useEffect, useState } from "react";
import Trans from "../../Trans";
import { BiPrinter } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { RiFileExcel2Fill } from "react-icons/ri";
import * as XLSX from "xlsx";
import { FaTruckLoading } from "react-icons/fa";

export default function TranProveedor({
  env,
  base,
  calcular,
  value,
  liquidar,
}) {
  const [suma, setSuma] = useState(0);
  const [codigo, setCodigo] = useState([]);
  const [filtro, setFiltro] = useState([]);
  const [visibility, setVisibily] = useState(true);

  function autosuma(array) {
    let count = 0;
    array.forEach((value) => {
      let sum = parseInt(count) + parseInt(value.Saldo);
      setSuma(sum);
      count = sum;
    });
  }

  const SearchCodigo = () => {
    const HaveTransations = base.filter((fin) => fin.Codigo == env.Codigo);

    if (HaveTransations.length > 0) {
      setCodigo(HaveTransations);
    }
  };

  useEffect(() => {
    SearchCodigo();
  }, []);

  useEffect(() => {
    if (codigo.length > 0) {
      autosuma(codigo);
    }
  }, [codigo]);

  useEffect(() => {
    if (filtro.length > 0) {
      autosuma(filtro);
    } else {
      autosuma(codigo);
    }
  }, [filtro]);

  function imprimir() {
    setVisibily(false);
    setTimeout(() => {
      window.print("");
      setVisibily(true);
    }, 100);
  }

  //Filtrar el valor
  function filtrar() {
    const filtValue = document.getElementById("filtro").value;
    if (filtValue) {
      const ValorAfiltrar = codigo.filter((ap) =>
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

  //  exportar a excel
  function exportarExcel() {
    var tabla = document.getElementById("miTabla");
    var datos = XLSX.utils.table_to_sheet(tabla);
    var libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, datos, "Hoja1");
    XLSX.writeFile(libro, `${env.Codigo}: ${env.Nombre}.xlsx`);
  }

  const formatoNumero = new Intl.NumberFormat("en-US");

  return (
    <>
      <div className="cellphone">
        <div className="movecont">
          <BiPrinter
            className={visibility ? "print " : "visibility"}
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
              className={visibility ? "liqui_text ayust1 " : "visibility"}
              id="filtro"
            />
            <AiOutlineSearch onClick={filtrar} className="search" />
          </div>
          <div className="move">
            <h1 className="ite_title">Movimientos Proveedor</h1>
            <FaTruckLoading className="ite" />
          </div>
        </div>
        <div className="title_tran">
          <div className="tran_cont">
            <div className="liqui_cont">
              <button
                className={visibility ? "liqui " : "visibility"}
                onClick={liquidar}
              >
                Liquidar
              </button>
              <h1
                className={visibility ? "liqui_text " : "visibility"}
                onClick={liquidar}
              >
                {formatoNumero.format(value)}
              </h1>
            </div>
            <p className="pp">Codigo: {env.Codigo}</p>
            <p className="pp">Nombre: {env.Nombre}</p>
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
                <th>Saldo</th>
                <th>marcar</th>
              </tr>
            </thead>
            <tbody>
              {codigo.length > 0 && (
                <>
                  {filtro.length > 0
                    ? filtro.map((bas, index) => (
                        <tr className="moditr" key={index}>
                          <td className="moditr">{`${bas.Asiento}-000${bas.seq}`}</td>
                          <td className="moditr">{bas.Fecha}</td>
                          <td className="moditr">{bas.Descripcion}</td>
                          <td className="moditr">
                            {formatoNumero.format(bas.Monto)}
                          </td>
                          <Trans id={bas.seq} calcular={calcular}>
                            {bas.Saldo}
                          </Trans>
                        </tr>
                      ))
                    : codigo.map((bas, index) => (
                        <tr className="moditr" key={index}>
                          <td className="moditr">{`${bas.Asiento}-000${bas.seq}`}</td>
                          <td className="moditr">{bas.Fecha}</td>
                          <td className="moditr">{bas.Descripcion}</td>
                          <td className="moditr">
                            {formatoNumero.format(bas.Monto)}
                          </td>
                          <Trans id={bas.seq} calcular={calcular}>
                            {bas.Saldo}
                          </Trans>
                        </tr>
                      ))}
                </>
              )}
            </tbody>
          </table>

          {codigo.length === 0 && (
            <p className="trans">No hay transaccion en el proveedor</p>
          )}
          <div className="ayust_cont">
            <h1 className="liqui_text ayust">{formatoNumero.format(suma)}</h1>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
