import React from 'react';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import { useLocation, Link } from 'react-router-dom'
import AdminNavbar from "./adminNavbar";
import { changePass } from '../API/dbAPI';

export default function ChangePass(props) {
    const location = useLocation()
    const userId = location.state
    const [userPass, setUserPass] = useState({
        usuario: userId.usuario, email: userId.email, ogPassword: "", newPassword: "", repPassword: ""
      })

    let name, value; 
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUserPass({...userPass, [name]: value})
      }
    
      function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      function handleSubmit(event) {
        event.preventDefault();
        changePass(userPass);
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
    
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Editar Contraseña</p>
    
                            <form className="mx-1 mx-md-4" id="newUser" onSubmit={handleSubmit}>
    
                              <div className="d-flex flex-row align-items-center mb-4">
                                <label htmlFor="usuario">
                                  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                </label>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="text" id="usuario" required name="usuario" className="form-control" placeholder="Nombre" autoComplete="off" value={userPass.usuario} onChange={handleInputs}/>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <label htmlFor="email">
                                  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                </label>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="email" id="email" required name="email" className="form-control" placeholder="Email" autoComplete="off" value={userPass.email} onChange={handleInputs}/>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <label htmlFor="ogPassword">
                                  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                </label>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="password" id="ogPassword" required name="ogPassword" className="form-control" placeholder="Contraseña Original" autoComplete="off" value={userPass.password} onChange={handleInputs}/>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <label htmlFor="newPassword">
                                  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                </label>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="password" id="newPassword" required name="newPassword" className="form-control" placeholder="Nueva Contraseña" autoComplete="off" value={userPass.newPassword} onChange={handleInputs}/>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <label htmlFor="repPassword">
                                  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                </label>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="password" id="repPassword" required name="repPassword" className="form-control" placeholder="Repetir Nueva Contraseña" autoComplete="off" value={userPass.repPassword} onChange={handleInputs}/>
                                </div>
                              </div>
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <Link to='/editUser' state={userId}>
                                    <button type="button" className="btn btn-primary btn-lg" >Regresar</button>
                                </Link>
                            </div>
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button type="submit" className="btn btn-primary btn-lg" >Cambiar Contraseña</button>
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
