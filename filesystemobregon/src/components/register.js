/* Code used to define register interface and to allow admin to add users
Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

// Imports
import { useState } from "react";
import { Link } from 'react-router-dom';
import {addUser} from "../API/dbAPI";
import AdminNavbar from "./adminNavbar";

// Function for register
export default function Register(){
  // New user data
  const [user, setUser] = useState({
    usuario: "", email: "", password: "", repPassword: "", userType: "Usuario", nulidad: false, investigacion: false
  })
  
  // Handle inputs
  let name, value
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
      addUser(user);
    }
  }
  // Render register form
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

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Añadir Usuario</p>
                        <form className="mx-1 mx-md-4" id="newUser" onSubmit={handleSubmit}>

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

                          <div className="d-flex flex-row align-items-center mb-4">
                            <label htmlFor="password">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            </label>
                            <div className="form-outline flex-fill mb-0">
                              <input type="password" id="password" required name="password" className="form-control" placeholder="Contraseña" autoComplete="off" value={user.password} onChange={handleInputs}/>
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <label htmlFor="repPassword">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            </label>
                            <div className="form-outline flex-fill mb-0">
                              <input type="password" id="repPassword" required name="repPassword" className="form-control" placeholder="Repetir contraseña" autoComplete="off" value={user.repPassword} onChange={handleInputs}/>
                            </div>
                          </div>
                          <div>
                          <strong>Permisos</strong>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <label htmlFor="nulidad">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            </label>
                            <div className="custom-control custom-checkbox custom-control-inline">
                              <input type="checkbox" className="custom-control-input" id="nulidad" name="nulidad" value={user.nulidad} onChange={()=>{setUser({...user, nulidad: !user.nulidad})}} checked={user.nulidad}/>
                              <label className="custom-control-label" htmlFor="defaultChecked2"> Nulidad</label>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <label htmlFor="investigacion">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            </label>
                            <div className="custom-control custom-checkbox custom-control-inline">
                              <input type="checkbox" className="custom-control-input" id="investigacion" name="investigacion" value={user.investigacion} onChange={()=>{setUser({...user, investigacion: !user.investigacion})}} checked={user.investigacion}/>
                              <label className="custom-control-label" htmlFor="defaultChecked2"> Investigacion</label>
                            </div>
                          </div>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg" >Registrar</button>
                          </div>
                        </form>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <Link to='/'>
                                    <button type="button" className="btn btn-primary btn-lg" >Regresar</button>
                                </Link>
                            </div>
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
};
