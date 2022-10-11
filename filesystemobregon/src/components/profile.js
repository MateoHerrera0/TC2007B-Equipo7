import React, { useState , useEffect} from 'react'
import './profile.css'
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import {getUser} from "../API/dbAPI";
import { logout } from '../API/dbAPI';

//import { UserContext } from '../app';

//const userContext = useContext(UserContext)

export default function Profile(props) {

  const [user, setUserData] = useState(
    {usuario: "", email: "", userType: "", area: ""}
  )

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  console.log(props.usuario)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/profile')
        const userData = await res.json()
        setUserData(userData[0])
      } catch (error) {
        console.error('There was an error fetch auth', error)
        return
      }
    }
    fetchUser()
  }, [])

  console.log(user)

  return (
    <div className='profile-view'>
      {props.navbar}
        <div className='section p-5 mx-5'>
        <div className='container bg-white rounded-3 shadow'>
          <div className='row'>
            <div className="col-md-5 text-md-start text-center p-5">
              <p className="fs-1"><strong>Perfil</strong></p>
              <p className="fw-bold">Datos</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <p className="fs-3"><strong>Correo Electrónico</strong></p>
                  <p className='fw-lighter'>{user.email}</p>
                </li>
                <li className="list-group-item">
                  <p className="fs-3"><strong>Usuario</strong></p>
                  <p className='fw-lighter'>{user.usuario}</p>
                </li>
                <li className="list-group-item">
                  <p className="fs-3"><strong>Permisos</strong></p>
                  <p className='fw-lighter'>{user.userType}</p>
                </li>
                <li className="list-group-item">
                  <p className="fs-3"><strong>Área</strong></p>
                  <p className='fw-lighter'>{user.area}</p>
                </li>
              </ul>
            </div>
            <div className="col-md text-md-end text-center p-5">
              <p className="display-1"><strong>Imagen</strong></p>
              <div>
                <Link to='/'>
                    <button type="button" className="btn btn-primary btn-sm rounded-3 fw-bold">Regresar a inicio</button>
                </Link>
                <br />
                <Link to='/'>
                    <button type="button" className="btn btn-primary btn-sm rounded-3 fw-bold" onClick={() => {logout(); window.location.assign('/')}}>Cerrar sesión</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
