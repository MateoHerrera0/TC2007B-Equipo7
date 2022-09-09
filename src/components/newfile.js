export default function Newfile() {
  const expedientes = [1,2,3,4]
  return(
     <div className="section p-5">
        <p className="text-center fs-1"><strong>Para subir tus documentos, ingresa los datos necesarios</strong></p>
      <div className="container p-5 shadow rounded-3">
        <form>
          <div className="mb-3">
            <label for="expediente" className="form-label">Expediente</label>
            <input type="text" className="form-control" id="expediente" aria-describedby="expedienteHelp" placeholder="Ingresa el expediente aqui..." list="expedientes"/>
            <datalist id="expedientes">
              {expedientes.map((value) => {
                return(
                  <option> {value} </option>
                )
              })}
            </datalist>
            <div id="expedienteHelp" className="form-text">Selecciona un expediente existente o ingresa uno nuevo.</div>
          </div>

          <div className="mb-3">
            <label for="folio" className="form-label">Folio</label>
            <input type="text" className="form-control" id="folio" placeholder="Ingresa el folio aqui..."/>
          </div>

          <div className="mb-3">
            <label for="numeroJuicio" className="form-label">Numero de Juicio</label>
            <input type="text" className="form-control" id="numeroJuicio" placeholder="Ingresa el numero de juicio aqui..."/>
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
     </div>
  )
}