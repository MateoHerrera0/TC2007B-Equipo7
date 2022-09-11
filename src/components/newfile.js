import { useState, useReducer } from "react";
import { fields, Field } from "./fields"


function reducer(state, event) {
  if (event.reset) {
    return {}
  }
  
  return {...state,
    [event.id]: event.value
  }
}

export default function Newfile() {
  const [formData, setFormData] = useReducer(reducer, {})
  
  function handleChange(ev) {
    setFormData({
      id: ev.target.name,
      value: ev.target.value
    })
    console.log(formData);
  }
  
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
            <button type="button" className="btn btn-primary" onClick={() => {setFields(nulidadFields); setFormData({reset: -1})}}>Juicio de Nulidad</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary" onClick={() => {setFields(carpetaFields); setFormData({reset: -1})}}>Carpeta de Investigacion</button>
          </div>
        </div>
      <div className="container p-5 shadow rounded-3">
        <form>
          {fieldsToUse.map((value, index) => {
            let id = value.id
            return(
              <Field
                field = {value}
                onChange = {handleChange}
                key = {index}
                value = {formData[id] || ""}
              />
            )
          })}

          <div className="mb-3">
            <label htmlFor="file" className="form-label">Documento Escaneado</label>
            <input className="form-control" type="file" accept="*.pdf" id="file" />
          </div>
          <input type="hidden" name="usuario" id="usuario" value={usuario}/>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
     </div>
  )
}