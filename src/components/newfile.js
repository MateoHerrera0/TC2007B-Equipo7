import { useState } from "react";
import { fields } from "./fields"

export default function Newfile() {
  const nulidadFields = [
    fields.expediente, 
    fields.tja,
    fields.actor,
    fields.domicilio,
    fields.acto,
    fields.eJuridico,
    fields.eProcesal,
    fields.materia,
    fields.demandado,
    fields.folio
  ]
  const carpetaFields = [
    fields.eco,
    fields.denuciante,
    fields.imputado,
    fields.delito,
    fields.lugar,
    fields.objeto,
    fields.eGuarda
  ]

  const [fieldsToUse, setFields] = useState(nulidadFields)
  const usuario = 'getusuario'
  return(
     <div className="section p-5">
        <p className="text-center fs-1"><strong>Para subir tus documentos, ingresa los datos necesarios</strong></p>
        <p className="text-center fs-5">Selecciona un tipo de documento.</p>
        <div className="row text-center p-5">
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={() => setFields(nulidadFields)}>Juicio de Nulidad</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={() => setFields(carpetaFields)}>Carpeta de Investigacion</button>
          </div>
        </div>
      <div className="container p-5 shadow rounded-3">
        <form>

          {fieldsToUse.map((value, index) => {
            return(
              value
            )
          })}
          {fields.file}
          <input type="hidden" id="usuario" value={usuario}/>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
     </div>
  )
}