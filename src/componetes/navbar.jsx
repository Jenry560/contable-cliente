import { BiUserCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user")) 

  function logout(){
    const response = window.confirm(`¿Estas seguro ${user.Nombre} que quieres cerrar sesion?`)
    if(response){
      localStorage.removeItem("user")
      navigate('/sign')
    }
  }
  
  return (
    <>
    
  <nav className="navbar navbar-expand navbar-light bg-light text-primary">
  <Link to="/" className="navbar-brand text-xl text-primary " > App contable</Link>
  <div className="collapse navbar-collapse ajuste text-xl1" id="navbarNav"  >
  <BiUserCircle className="image" />
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       <li className="nav-item">
        <a className="nav-link text-primary " >{user.Nombre}</a>
      </li>
    </ul>
    <button className="remove" onClick={logout}>Cerrar sesion</button>
  </div>
  
  
</nav>

       
    </>
  )
}

export default Navbar
