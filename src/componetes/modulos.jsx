import { Link } from "react-router-dom";
import "../App.css";
const cliente = new URL("../imagenes/cliente.png", import.meta.url);
const registro = new URL("../imagenes/registro1.png", import.meta.url);
const cxc = new URL("../imagenes/billete.jpg", import.meta.url);
const cxp = new URL("../imagenes/cuentaPorPagar.png", import.meta.url);
const ingresos = new URL("../imagenes/ingresos.png", import.meta.url);
const invetario = new URL("../imagenes/inve2.png", import.meta.url);
const gasto = new URL("../imagenes/GastoNew.png", import.meta.url);
const diario = new URL("../imagenes/Mayor.png", import.meta.url);
const Proveedores = new URL("../imagenes/proveedores.png", import.meta.url);
function Modulos() {
  return (
    <>
      <div className="container">
        <div className="picture__cont">
          <div>
            <Link to="/cliente" id="cliente_modulo">
              <figure className="information__pictures">
                <img src={cliente} className="information__img" />
                <div className="capa">
                  <p className="abs">Clientes</p>
                </div>
              </figure>
            </Link>
            <h1 className="title">Clientes</h1>
          </div>

          <div>
            <Link to="/proveedores">
              <figure className="information__pictures">
                <img src={Proveedores} className="information__img" />
                <div className="capa">
                  <p className="absolute">Proveedores</p>
                </div>
              </figure>
            </Link>

            <h1 className="title">Proveedores</h1>
          </div>

          <div>
            <Link to="/registro" id="registro_modulo">
              <figure className="information__pictures">
                <img src={registro} className="information__img" />
                <div className="capa">
                  <p className="absolute">Registro</p>
                </div>
              </figure>
            </Link>

            <h1 className="title">Registro</h1>
          </div>
          <div>
            <Link to="/cxc">
              <figure className="information__pictures">
                <img src={cxc} className="information__img" />
                <div className="capa">
                  <p className="absolute">CXC</p>
                </div>
              </figure>
            </Link>

            <h1 className="title">Cuenta por Cobrar</h1>
          </div>

          <div>
            <Link to="/cxp">
              <figure className="information__pictures">
                <img src={cxp} className="information__img" />
                <div className="capa">
                  <p className="absolute">7060</p>
                </div>
              </figure>
            </Link>

            <h1 className="title">Cuenta por pagar</h1>
          </div>

          <div>
            <Link to="/ingresos">
              <figure className="information__pictures">
                <img src={ingresos} className="information__img" />
                <div className="capa">
                  <p className="absolute">7070</p>
                </div>
              </figure>
            </Link>
            <h1 className="title">Ingresos</h1>
          </div>

          <div>
            <Link to="/gastos">
              <figure className="information__pictures">
                <img src={gasto} className="information__img" />
                <div className="capa">
                  <p className="absolute">7080</p>
                </div>
              </figure>
            </Link>
            <h1 className="title">Gastos</h1>
          </div>

          <div>
            <Link to="/inventario">
              <figure className="information__pictures">
                <img src={invetario} className="information__img" />
                <div className="capa">
                  <p className="absolute">7090</p>
                </div>
              </figure>
            </Link>
            <h1 className="title">Inventario</h1>
          </div>

          <div>
            <Link to="/diario" id="mayor_modulo">
              <figure className="information__pictures">
                <img src={diario} className="information__img" />
                <div className="capa">
                  <p className="absolute">8000</p>
                </div>
              </figure>
            </Link>
            <h1 className="title">Mayor general</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modulos;
