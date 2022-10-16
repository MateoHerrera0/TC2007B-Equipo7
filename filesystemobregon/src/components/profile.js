import React, { useState , useEffect} from 'react'
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import {getUser} from "../API/dbAPI";
import { logout } from '../API/dbAPI';
import stock from '../Images/womanStock.jpg'
import './profile.css';
//import { UserContext } from '../app';

//const userContext = useContext(UserContext)

export default function Profile(props) {

  const [user, setUserData] = useState(
    {usuario: "", email: "", userType: ""}
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
              <p className="fs-2">Mis Datos</p>
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
                  <p className="fs-3"><strong>Tipo de Usuario</strong></p>
                  <p className='fw-lighter'>{user.userType}</p>
                </li>
              </ul>
            </div>
            <div className="col-md text-md-end text-center p-5">
              <p className="display-1"><strong>Tu Foto</strong></p>
              <img src={stock} alt='Logo' width='450'></img> <br></br>
              <br></br>
              <div>
                <Link to='/'>
                    <button type="button" className="btn btn-primary btn-sm rounded-3 fw-bold">Regresar a inicio</button>
                </Link>
              </div>
              <br></br>
              <div>
                <Link to='/'>
                    <button type="button" className="btn btn-primary btn-sm rounded-3 fw-bold" onClick={() => {logout()}}>Cerrar sesión</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
