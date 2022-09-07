import { Link } from 'react-router-dom';
import './home.css'

export default function Home() {
  return(
    <div className='home'>
      <div className="section p-5">
        <div className="container p-5">
          <div className="row">
            <div className="col-md-5 text-md-start text-center">
              <p className="title"><strong>Sube tus archivos</strong></p>
              <Link to='/newFile'>
                <button type="button" className="btn btn-primary btn-sm rounded-3 fw-bold">Subir archivo</button>
              </Link>
            </div>
            <div className="col-md text-md-end text-center pt-md-0 pt-5">
              <p className="display-1"><strong>Imagen</strong></p>
            </div>
          </div>
        </div>
      </div>

      <div className="section p-5">
        <div className="container p-5">
          <div className="row">
            <div className="col-md-5 text-md-end text-center order-md-5">
              <p className="title"><strong>Busca archivos</strong></p>
              <Link to='/search'>
                <button type="button" className="btn btn-primary btn-sm rounded-3 fw-bold">Buscar archivo</button>
              </Link>
            </div>
            <div className="col-md text-md-start text-center order-md-1 pt-md-0 pt-5">
              <p className="display-1"><strong>Imagen</strong></p>
            </div>
          </div>
        </div>
      </div>

      <div className='section p-5 mx-5'>
        <div className='container bg-white rounded-3 shadow'>
          <div className='row'>
            <div className="col-md-5 text-md-start text-center p-5">
              <p className="fs-1"><strong>Consulta las instrucciones aqui</strong></p>
              <p className="fw-bold">Subir archivos:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <p className="fs-3"><strong>Paso 1</strong></p>
                  <p className='fw-lighter'>Ingresa a la seccion de "subir archivos"</p>
                </li>
                <li className="list-group-item">
                  <p className="fs-3"><strong>Paso 2</strong></p>
                  <p className='fw-lighter'>Ingresa los datos solicitados. Asegurate de llenar bien los espacios</p>
                </li>
                <li className="list-group-item">
                  <p className="fs-3"><strong>Paso 3</strong></p>
                  <p className='fw-lighter'>Da click en "subir" y revisa la confirmacion de que tus datos fueron agregados correctamente</p>
                </li>
              </ul>
            </div>
            <div className="col-md text-md-end text-center p-5">
              <p className="display-1"><strong>Imagen</strong></p>
            </div>
          </div>
        </div>
      </div>

      <div className='section px-5 mx-5'>
        <div className='container'>
          <div className='row'>
            <div className="col-md-6 justify-content-start text-md-start text-center p-5 order-md-5">
              <p className="fw-bold">Subir archivos:</p>
              <p className="fs-2"><strong>Ingresa a la seccion de busqueda</strong></p>
              <p className='fw-lighter'>Utiliza los filtros para encontrar rapidamente los archivos que necesites, mediante folio, nombre, o categoria.</p>
            </div>
            <div className="col-md text-md-start text-center p-5 order-md-1">
              <p className="display-1"><strong>Imagen</strong></p>
            </div>
          </div>
        </div>
      </div>

      <div className='section px-5'>
        <div className='border-top'>
          <div className='text-center p-3'>
            <p className='fw-lighter'>Credits</p>
          </div>
        </div>

      </div>
    </div>
  )
}