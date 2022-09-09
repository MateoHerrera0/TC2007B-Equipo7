function addElement(id, element) {
  
}

const fields = {
    expediente: <div className='mb-3'><label for='expediente' className='form-label'>Expediente</label><input type='text' className='form-control' id='expediente' placeholder='Ingresa el expediente aqui...'/></div>,
    tja: <div className="mb-3"><label for="tja" className="form-label">Sala del TJA</label><input type="text" className="form-control" id="tja" placeholder="Ingresa la sala del TJA aqui..."/></div>,
    actor: <div className="mb-3"><label for="actor" className="form-label">Actor</label><input type="text" className="form-control" id="actor" placeholder="Ingresa el actor aqui..."/></div>,
    domicilio: <div className="mb-3"><label for="domicilio" className="form-label">Domicilio</label><input type="text" className="form-control" id="domicilio" placeholder="Ingresa el domicilio aqui..."/></div>,
    acto: <div className="mb-3"><label for="acto" className="form-label">Acto</label><input type="text" className="form-control" id="acto" placeholder="Ingresa el acto impugnado aqui..."/></div>,
    eJuridico: <div className="mb-3"><label for="eJuridico" className="form-label">Estado Juidico</label><input type="text" className="form-control" id="eJuridico" placeholder="Ingresa el estado juridico aqui..."/></div>,
    eProcesal: <div className="mb-3"><label for="eProcesal" className="form-label">Estado Procesal</label><input type="text" className="form-control" id="eProcesal" placeholder="Ingresa el estado procesal aqui..."/></div>,
    materia: <div className="mb-3"><label for="materia" className="form-label">Materia</label><input type="text" className="form-control" id="materia" placeholder="Ingresa la materia aqui..."/></div>,
    demandado: <div className="mb-3"><label for="demandado" className="form-label">Demandado</label><input type="text" className="form-control" id="demandado" placeholder="Ingresa el demandado aqui..."/></div>,
    folio: <div className="mb-3"><label for="folio" className="form-label">Folio</label><input type="text" className="form-control" id="folio" placeholder="Ingresa el folio aqui..."/></div>,
    eco: <div className="mb-3"><label for="eco" className="form-label">ECO</label><input type="text" className="form-control" id="eco" placeholder="Ingresa el eco aqui..."/></div>,
    carpeta: <div className="mb-3"><label for="carpeta" className="form-label">Carpeta de Investigacion</label><input type="text" className="form-control" id="carpeta" placeholder="Ingresa el carpeta de investigacion aqui..."/></div>,
    denuciante: <div className="mb-3"><label for="denuciante" className="form-label">Denuciante</label><input type="text" className="form-control" id="denuciante" placeholder="Ingresa el denuciante aqui..."/></div>,
    imputado: <div className="mb-3"><label for="imputado" className="form-label">Imputado</label><input type="text" className="form-control" id="imputado" placeholder="Ingresa el imputado aqui..."/></div>,
    delito: <div className="mb-3"><label for="delito" className="form-label">Delito</label><input type="text" className="form-control" id="delito" placeholder="Ingresa el delito aqui..."/></div>,
    lugar: <div className="mb-3"><label for="lugar" className="form-label">Lugar de los Hechos</label><input type="text" className="form-control" id="lugar" placeholder="Ingresa el lugar de los hechos aqui..."/></div>,
    objeto: <div className="mb-3"><label for="objeto" className="form-label">Objeto del Delito</label><input type="text" className="form-control" id="objeto" placeholder="Ingresa el objeto del delito aqui..."/></div>,
    eGuarda: <div className="mb-3"><label for="eGuarda" className="form-label">Estado que Guarda</label><input type="text" className="form-control" id="eGuarda" placeholder="Ingresa el estado que guarda aqui..."/></div>,
    file: <div class="mb-3"><label for="file" class="form-label">Documento Escaneado</label><input class="form-control" type="file" accept="*.pdf" id="file" /></div>
}

{/* <div className="mb-3">
            <div id="formArea">
              <select className="form-select" placeholder="Seleccione uno" onChange={(e) => setSelectValue(e.target.value)}>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <div className="row justify-content-center text-center">
                <div className="col">
                  <button type="button" className="btn btn-secondary" onClick={() => setMaterias(materias.concat(selectValue))}>Add</button>
                </div>
                <div className="col">
                  <button type="button" className="btn btn-secondary" onClick={() => setMaterias(materias.slice(0,-1))}>Remove</button>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start text-center overflow-scroll">
              {materias.map((value, index) => {
                  return(
                    <div className="col-2 ps-2" key={index}>
                      <div className="border bg-light p-1">
                        <p className="m-0">{value}</p>
                        <input type='hidden' id="materias" value={value} />
                      </div>
                    </div>
                  )
                })}
            </div>
          </div> */}

export {fields}