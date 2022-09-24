import React from 'react';
import { useState, useEffect } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';

export default function Login(props) {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        function performValidation() {
        return username.length > 0 && password.length > 0;
        }
        function handleSubmit(event) {
        event.preventDefault();
        }
        return (
            <div className="container">
                <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                    <div className="card-body p-4 p-sm-5">
                        <h5 className="card-title text-center mb-5 fw-light fs-5">Ingresar</h5>
                        <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="Usuario" />
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Constraseña" />
                        </div>
                        <div className="d-grid">
                            <Link to='/home'>
                            <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Entrar</button>
                        </Link>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
          </div>
        );
}


const loginFields = {
    user: {
      id: "usuario",
      label: "usuario",
      placeholder: "Usuario"
    },
    
    psw: {
      id: "contraseña",
      label: "contraseña",
      placeholder: "Contraseña"
    },
}


export {loginFields}