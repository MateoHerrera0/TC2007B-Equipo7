export default function Newfile() {
  const materiasGuardadas = [1,2,3,4]
  const usuario = 'getusuario'
  return(
     <div className="section p-5">
        <p className="text-center fs-1"><strong>Para subir tus documentos, ingresa los datos necesarios</strong></p>
      <div className="container p-5 shadow rounded-3">
        <form>
          <div className="mb-3">
            <label for="expediente" className="form-label">Expediente</label>
            <input type="text" className="form-control" id="expediente" placeholder="Ingresa el expediente aqui..."/>
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
            <label for="materia" className="form-label">Materia</label>
            <input type="text" className="form-control" id="materia" placeholder="Ingresa la materia aqui..." list="materias" aria-describedby="materiaHelp"/>
            <div id="materiaHelp" className="form-text">Selecciona una materia existente de las autocompletadas o ingresa una nueva.</div>
            <datalist id="materias">
              {materiasGuardadas.map((value) => {
                return (
                  <option>{value}</option>
                )
              })}
            </datalist>
          </div>

          <div className="mb-3">
            <label for="tipo" className="form-label">Tipo de Documento</label>
            <input type="text" className="form-control" id="tipo" placeholder="Ingresa el tipo de documento"/>
          </div>

          <div className="mb-3">
            <label for="juzgado" className="form-label">Juzgado</label>
            <input type="text" className="form-control" id="juzgado" placeholder="Ingresa el juzgado aqui..."/>
          </div>

          <div className="mb-3">
            <label for="distrito" className="form-label">Autoridad Involucrada (Distrito)</label>
            <input type="text" className="form-control" id="distrito" placeholder="Ingresa el distrito aqui..."/>
          </div>

          <div className="mb-3">
            <label for="unidad" className="form-label">Unidad Administrativa</label>
            <input type="text" className="form-control" id="unidad" placeholder="Ingresa la unidad administrativa aqui..."/>
          </div>

          <div className="mb-3">
            <label for="direccion" className="form-label">Direccion</label>
            <input type="text" className="form-control" id="direccion" placeholder="Ingresa la direccion aqui..."/>
          </div>

          <div className="mb-3">
            <label for="estado" className="form-label">Estado del Documento</label>
            <select class="form-select" id="estado">
              <option value="1">Abierto</option>
              <option value="2">Cerrado</option>
            </select>
          </div>

          <input type="hidden" id="usuario" value={usuario}/>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
     </div>
  )
}