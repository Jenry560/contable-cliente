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
    
  <nav className="navbar   navbar-light bg-light text-primary">
  
   
    <Link to="/" className="navbar-brand nab text-xl text-primary " > App contable</Link>

    <div className="navbal">
        <BiUserCircle className="img"/>
        <a className="nav_name">{user.Nombre}</a>
        <button className="remove" onClick={logout}>Cerrar sesion</button>
    </div>    
    
</nav>

       
    </>
  )
}

export default Navbar
