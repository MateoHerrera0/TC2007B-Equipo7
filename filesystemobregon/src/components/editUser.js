import React from 'react';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import { useLocation, Link } from 'react-router-dom'
import AdminNavbar from "./adminNavbar";
import { editUser } from '../API/dbAPI';

export default function EditUser(props) {
    const location = useLocation()
    const userId = location.state
    //const docId = this.props.location;
    //const [data, setData] = useState([]);
    console.log(userId.email);
    const [user, setUser] = useState({
        usuario: userId.usuario, email: userId.email, nulidad: userId.nulidad, investigacion: userId.investigacion
      })
    const [OGuser, setOGUser] = useState({
        usuario: userId.usuario, email: userId.email, nulidad: userId.nulidad, investigacion: userId.investigacion
    })

      let name, value; 
      const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]: value})
      }
    
      function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      function handleSubmit(event) {
        event.preventDefault();
        editUser(OGuser, user);
        //delay(1000).then(() => window.location.reload());
      }

        return (
          <div>
          <AdminNavbar />
          <div className="container">
          <div className="row">
            <section className="vh-100" >
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-lg-12 col-xl-11">
                    <div className="card text-black">
                      <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                          <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Editar Usuario</p>
    
                            <form className="mx-1 mx-md-4" id="newUser" onSubmit={handleSubmit}>
    
                              <div className="d-flex flex-row align-items-center mb-4">
                                <label htmlFor="usuario">
                                  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                </label>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="text" id="usuario" required name="usuario" className="form-control" placeholder="Nombre" autoComplete="off" value={user.usuario} onChange={handleInputs}/>
                                </div>
                              </div>
    
                              <div className="d-flex flex-row align-items-center mb-4">
                                <label htmlFor="email">
                                  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                </label>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="email" id="email" required name="email" className="form-control" placeholder="Email" autoComplete="off" value={user.email} onChange={handleInputs}/>
                                </div>
                              </div>
                              <strong>Permisos</strong>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <label htmlFor="nulidad">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            </label>
                            <div className="custom-control custom-checkbox custom-control-inline">
                              <input type="checkbox" className="custom-control-input" id="nulidad" name="nulidad" value={user.nulidad} onClick={()=>{setUser({...user, nulidad: !user.nulidad})}} checked={user.nulidad}/>
                              <label className="custom-control-label" for="defaultChecked2">Nulidad</label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <label htmlFor="investigacion">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            </label>
                            <div className="custom-control custom-checkbox custom-control-inline">
                              <input type="checkbox" className="custom-control-input" id="investigacion" name="investigacion" value={user.investigacion} onClick={()=>{setUser({...user, investigacion: !user.investigacion})}} checked={user.investigacion}/>
                              <label className="custom-control-label" for="defaultChecked2">Investigacion</label>
                            </div>
                          </div>
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <Link to='/changePass' state={userId}>
                                    <button type="button" className="btn btn-primary btn-lg" >Cambiar Contraseña</button>
                                </Link>
                            </div>
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button type="submit" className="btn btn-primary btn-lg" >Aplicar Cambios</button>
                            </div>
                            </form>
    
                          </div>
                          <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
    
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                              className="img-fluid" alt="Sample image"/>
    
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
      </div>
      </div>
      );
}