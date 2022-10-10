import React from 'react';
import { useState, useEffect } from 'react';
import './login.css'
import { Link } from 'react-router-dom';
import { logUser } from '../API/dbAPI';

export default function Login(props) {
  const [user, setUser] = useState({
    email: "", password: ""
  })

  let name, value;
  let reloaded = false; 
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
    logUser(user);
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

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Entrar</p>

                      <form className="mx-1 mx-md-4" id= "logUser" onSubmit={handleSubmit} >

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <strong>Correo electrónico</strong>
                            <input type="email" id="email" required name="email" className="form-control" placeholder="Correo electrónico" autoComplete="off" value={user.email} onChange={handleInputs}/>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <strong>Contraseña</strong>
                            <input type="password" id="password" name='password' required className="form-control" placeholder="Contraseña" autoComplete='off' value={user.password} onChange={handleInputs}/>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">Entrar</button>
                        </div>

                      </form>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <Link to='/register'>
                            <button type="button" className="btn btn-primary btn-sm fw-bold">Registrarse</button>
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
  );
}