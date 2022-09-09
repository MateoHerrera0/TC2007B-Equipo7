import React from 'react'
import { useState, useEffect } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';

export default function Login() {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        function performValidation() {
        return username.length > 0 && password.length > 0;
        }
        function handleSubmit(event) {
        event.preventDefault();
        }
        return (
            <div class="container">
                <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card border-0 shadow rounded-3 my-5">
                    <div class="card-body p-4 p-sm-5">
                        <h5 class="card-title text-center mb-5 fw-light fs-5">Ingresar</h5>
                        <form onSubmit={handleSubmit}>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingInput" placeholder="Usuario" />
                            <label for="floatingInput">Usuario</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Constraseña" />
                            <label for="floatingPassword">Constraseña</label>
                        </div>
                        <div class="d-grid">
                            <Link to='/home'>
                            <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Entrar</button>
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

