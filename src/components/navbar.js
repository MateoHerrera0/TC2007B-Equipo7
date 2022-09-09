import { useState } from 'react';

export default function Navbar() {
  const[expand, setExpand] = useState("collapse navbar-collapse");
  
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Alcaldía Álvaro obregón</a>
    <button className="navbar-toggler" type="button" onClick={() => { 
      if(expand === "collapse navbar-collapse") {
        setExpand("collapse navbar-collapse show")
      } else {
        setExpand("collapse navbar-collapse")
      }
    }} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={expand} id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/home">Inicio</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/newfile">Subir</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Buscar</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}