import React from 'react'
import './profile.css'
import { Link } from 'react-router-dom';
import Navbar from './navbar';

export default function Profile() {
  return (
    <div className='profile-view'>
      <Navbar />
        <div className='section p-5 mx-5'>
        <div className='container bg-white rounded-3 shadow'>
          <div className='row'>
            <div className="col-md-5 text-md-start text-center p-5">
              <p className="fs-1"><strong>Perfil</strong></p>
              <p className="fw-bold">Datos</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <p className="fs-3"><strong>Correo Electrónico</strong></p>
                  <p className='fw-lighter'>ejemplo@alcaldia.com</p>
                </li>
                <li className="list-group-item">
                  <p className="fs-3"><strong>Usuario</strong></p>
                  <p className='fw-lighter'>XXXXXX</p>
                </li>
                <li className="list-group-item">
                  <p className="fs-3"><strong>Permisos</strong></p>
                  <p className='fw-lighter'>Agregar archivos</p>
                </li>
              </ul>
            </div>
            <div className="col-md text-md-end text-center p-5">
              <p className="display-1"><strong>Imagen</strong></p>
              <div>
                <Link to='/home'>
                    <button type="button" className="btn btn-primary btn-sm rounded-3 fw-bold">Regresar a inicio</button>
                </Link>
                <br />
                <Link to='/'>
                    <button type="button" className="btn btn-primary btn-sm rounded-3 fw-bold">Cerrar sesión</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
