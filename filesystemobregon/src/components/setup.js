import React from 'react'
import { setupAdmin } from '../API/dbAPI';
import { useState , useReducer} from "react";

export default function Setup(props) {
    const [admin, setAdmin] = useState({
        email: "", password: ""
      })
    
      let name, value; 
      const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setAdmin({...admin, [name]: value})
      }
      function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      function handleSubmit(event) {
        event.preventDefault();
        setupAdmin(admin);
        delay(1000).then(() => window.location.reload());
      }
  return (
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

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Inicializar admin</p>

                        <form className="mx-1 mx-md-4" id="newUser" onSubmit={handleSubmit}>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <label htmlFor="email">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            </label>
                            <div className="form-outline flex-fill mb-0">
                              <input type="email" id="email" required name="email" className="form-control" placeholder="Email" autoComplete="off" value={admin.email} onChange={handleInputs}/>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <label htmlFor="password">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            </label>
                            <div className="form-outline flex-fill mb-0">
                              <input type="password" id="password" required name="password" className="form-control" placeholder="Contraseña" autoComplete="off" value={admin.password} onChange={handleInputs}/>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg" >Registrar</button>
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
  )
}
