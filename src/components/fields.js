const fields = {
    expediente: <div className='mb-3'><label htmlFor='expediente' className='form-label'>Expediente</label><input type='text' required className='form-control' id='expediente' placeholder='Ingresa el expediente aqui...'/></div>,
    tja: <div className="mb-3"><label htmlFor="tja" className="form-label">Sala del TJA</label><input type="text" required className="form-control" id="tja" placeholder="Ingresa la sala del TJA aqui..."/></div>,
    actor: <div className="mb-3"><label htmlFor="actor" className="form-label">Actor</label><input type="text" required className="form-control" id="actor" placeholder="Ingresa el actor aqui..."/></div>,
    domicilio: <div className="mb-3"><label htmlFor="domicilio" className="form-label">Domicilio</label><input type="text" required className="form-control" id="domicilio" placeholder="Ingresa el domicilio aqui..."/></div>,
    acto: <div className="mb-3"><label htmlFor="acto" className="form-label">Acto</label><input type="text" required className="form-control" id="acto" placeholder="Ingresa el acto impugnado aqui..."/></div>,
    eJuridico: <div className="mb-3"><label htmlFor="eJuridico" className="form-label">Estado Juidico</label><input type="text" required className="form-control" id="eJuridico" placeholder="Ingresa el estado juridico aqui..."/></div>,
    eProcesal: <div className="mb-3"><label htmlFor="eProcesal" className="form-label">Estado Procesal</label><input type="text" required className="form-control" id="eProcesal" placeholder="Ingresa el estado procesal aqui..."/></div>,
    materia: <div className="mb-3"><label htmlFor="materia" className="form-label">Materia</label><input type="text" required className="form-control" id="materia" placeholder="Ingresa la materia aqui..."/></div>,
    demandado: <div className="mb-3"><label htmlFor="demandado" className="form-label">Demandado</label><input type="text" required className="form-control" id="demandado" placeholder="Ingresa el demandado aqui..."/></div>,
    folio: <div className="mb-3"><label htmlFor="folio" className="form-label">Folio</label><input type="text" required className="form-control" id="folio" placeholder="Ingresa el folio aqui..."/></div>,
    eco: <div className="mb-3"><label htmlFor="eco" className="form-label">ECO</label><input type="text" required className="form-control" id="eco" placeholder="Ingresa el eco aqui..."/></div>,
    carpeta: <div className="mb-3"><label htmlFor="carpeta" className="form-label">Carpeta de Investigacion</label><input type="text" required className="form-control" id="carpeta" placeholder="Ingresa el carpeta de investigacion aqui..."/></div>,
    denuciante: <div className="mb-3"><label htmlFor="denuciante" className="form-label">Denuciante</label><input type="text" required className="form-control" id="denuciante" placeholder="Ingresa el denuciante aqui..."/></div>,
    imputado: <div className="mb-3"><label htmlFor="imputado" className="form-label">Imputado</label><input type="text" required className="form-control" id="imputado" placeholder="Ingresa el imputado aqui..."/></div>,
    delito: <div className="mb-3"><label htmlFor="delito" className="form-label">Delito</label><input type="text" required className="form-control" id="delito" placeholder="Ingresa el delito aqui..."/></div>,
    lugar: <div className="mb-3"><label htmlFor="lugar" className="form-label">Lugar de los Hechos</label><input type="text" required className="form-control" id="lugar" placeholder="Ingresa el lugar de los hechos aqui..."/></div>,
    objeto: <div className="mb-3"><label htmlFor="objeto" className="form-label">Objeto del Delito</label><input type="text" required className="form-control" id="objeto" placeholder="Ingresa el objeto del delito aqui..."/></div>,
    eGuarda: <div className="mb-3"><label htmlFor="eGuarda" className="form-label">Estado que Guarda</label><input type="text" required className="form-control" id="eGuarda" placeholder="Ingresa el estado que guarda aqui..."/></div>,
    file: <div class="mb-3"><label htmlFor="file" class="form-label">Documento Escaneado</label><input class="form-control" type="file" accept="*.pdf" id="file" /></div>
}


export {fields}