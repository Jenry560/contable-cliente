import React, { useEffect, useState } from 'react'

import App from './App.jsx'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Cliente from './componetes/modulos/Cliente componentes/clientes.jsx'
import Registro from './componetes/modulos/registro.jsx'
import Modelo from './componetes/modulos/modelo.jsx'
import { TbPigMoney } from "react-icons/tb";
import { BsBank2 } from "react-icons/bs";
import { TfiMoney} from "react-icons/tfi";
import { GiPayMoney} from "react-icons/gi";
import { BsFillHouseAddFill} from "react-icons/bs";
import { RiNewspaperLine} from "react-icons/ri";
import Diario from './componetes/modulos/Diario.jsx'
import Cobrar from './componetes/modulos/cobrar.jsx'
import Sign from './componetes/user/sign.jsx'
import Log from './componetes/user/log.jsx'
import Modulos from './componetes/modulos.jsx'
import ProtectedRoute from './componetes/utils/protect.jsx'
import { useLocalStorage } from 'react-use'
import Principal from './componetes/principal/principal.jsx';




export default function Rutas(){

    const [user,setUser]= useLocalStorage('user')

    

    return(
     <Router>
      <Routes>
        <Route element={<ProtectedRoute canActivate={user} redirectPath={"/signs"}/>}>
        <Route path='/' element={<App/>}>
          <Route path='/' element={<Modulos/>} />
          <Route path='cliente' element={<Cliente RegistradoPor={user && user.Correo}/>}/>
          <Route path='registro' element={<Registro RegistradoPor={user && user.Correo}/>}/>
          <Route path='cxc' element={<Cobrar title="Cuentas por cobrar" codigo="CXC" RegistradoPor={user && user.Correo} icon={<TbPigMoney className='ite' />} />}/>
          <Route path='cxp' element={<Modelo title="Cuentas por pagar" codigo="7060" RegistradoPor={user && user.Correo} icon={<BsBank2 className='ite' />}/>}/>
          <Route path='ingresos' element={<Modelo title="Ingresos" codigo="7070" RegistradoPor={user && user.Correo} icon={<TfiMoney className='ite' />}/>}/>
          <Route path='gastos' element={<Modelo title="Gastos" codigo="7080" RegistradoPor={user && user.Correo} icon={<GiPayMoney className='ite'  />}/>}/>
          <Route path='inventario' element={<Modelo title="Inventario" codigo="7090" RegistradoPor={user && user.Correo} icon={<BsFillHouseAddFill  className='ite' />}/>}/>
          <Route path='diario' element={<Diario RegistradoPor={user && user.Correo} icon={<RiNewspaperLine className='ite'  />}/>}/>
        </Route>
        </Route>
        <Route path='signs' element={<Principal/>}/>
       <Route path='log' element={<Log/>}/>
       <Route path='sign' element={<Sign/>}/>        
      </Routes>
    </Router>
 
    )
}
  

