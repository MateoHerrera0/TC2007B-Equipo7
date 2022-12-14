/* Code used to define edit user interface and allow admin to edit selected user
Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/
import React from 'react';
import { useState } from "react";
import { useLocation, Link } from 'react-router-dom'
import AdminNavbar from "./adminNavbar";
import { editUser } from '../API/dbAPI';
import Popup from './popup';

// Function to edit user
export default function EditUser(props) {
    // Remember selected user
    const location = useLocation()
    const userId = location.state

    // User data --> to be changed
    const [user, setUser] = useState({
        usuario: userId.usuario, email: userId.email, nulidad: userId.nulidad, investigacion: userId.investigacion
      })
    // Original user data
    const [OGuser, setOGUser] = useState({
        usuario: userId.usuario, email: userId.email, nulidad: userId.nulidad, investigacion: userId.investigacion
    })

    // Code for popup
    const [visible, setVisible] = useState(false);
    function submitForm(formId) {
      document.getElementById(formId).requestSubmit();
    }

    // Handle inputs
    let name, value; 
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]: value})
    }
    // Handle submit
    function handleSubmit(event) {
      event.preventDefault();
      // Don't allow users with no permits
      if(user.nulidad == false && user.investigacion == false){
        alert("Tienes que dar por lo menos un permiso al usuario");
      }
      // Add user
      else {
        editUser(OGuser, user);
      }
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
    
                        <form className="mx-1 mx-md-4" id="editUser" onSubmit={handleSubmit}>
    
                            <div className="d-flex flex-row align-items-center mb-4">
                            <label htmlFor="usuario">
                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            </label>
                            <div className="form-outline flex-fill mb-0">
                                <input type="text" id="usuario" required name="usuario" className="form-control" placeholder="Nombre" autoComplete="off" value={user.usuario} onChange={handleInputs}/>
                            </div>
                        </div>
    
                        <div className="d-flex flex-row align-items-center mb-4">
                            <label htmlFor="email">
                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
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
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => setVisible(true)}>Aplicar Cambios</button>
                            </div>
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <Link to='/'>
                                    <button type="button" className="btn btn-primary btn-lg" >Regresar</button>
                                </Link>
                            </div>
                            </form>
                            <Popup 
                              visible = {visible}
                              setVisible = {setVisible}
                              popupTitle = {"Favor de confirmar lo siguiente:"}
                              popupBody = {<p>¿Estás seguro de que quieres cambiar los datos del usuario?</p>}
                              okFunction = {()=>submitForm("editUser")}
                            />
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
