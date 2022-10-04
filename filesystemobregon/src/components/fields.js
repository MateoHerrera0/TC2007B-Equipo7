function Field(props) {
  return (
    <div className="mb-3">
      <label htmlFor={props.field.id} className="form-label">{props.field.label}</label>
      <input 
        type="text" 
        className="form-control" 
        id={props.field.id} 
        name={props.field.id} 
        placeholder={props.field.placeholder}
        onChange={props.onChange}
        value={props.value}
        required
      />
    </div>
  )
}

const fields = {
    expediente: {
      id: "docID",
      label: "Expediente",
      placeholder: "Ingresa el expediente aqui..."
    },
    
    tja: {
      id: "tja",
      label: "Sala del TJA",
      placeholder: "Ingresa la sala del TJA aqui..."
    },

    actor: {
      id: "actor",
      label: "Actor",
      placeholder: "Ingresa el actor aqui..."
    },

    domicilio: {
      id: "domicilio",
      label: "Domicilio",
      placeholder: "Ingresa el domicilio aqui..."
    },

    acto: {
      id: "acto",
      label: "Acto",
      placeholder: "Ingresa el acto impugnado aqui..."
    },

    eJuridico: {
      id: "eJuridico",
      label: "Estado Juidico",
      placeholder: "Ingresa el estado juridico aqui..."
    },

    eProcesal: {
      id: "eProcesal",
      label: "Estado Procesal",
      placeholder: "Ingresa el estado procesal aqui..."
    },

    materia: {
      id: "materia",
      label: "Materia",
      placeholder: "Ingresa la materia aqui..."
    },

    demandado: {
      id: "demandado",
      label: "Demandado",
      placeholder: "Ingresa el demandado aqui..."
    },

    folio: {
      id: "folio",
      label: "Folio",
      placeholder: "Ingresa el folio aqui..."
    },

    eco: {
      id: "eco",
      label: "ECO",
      placeholder: "Ingresa el ECO aqui..."
    },

    carpeta: {
      id: "docID",
      label: "Carpeta de Investigacion",
      placeholder: "Ingresa el carpeta de investigacion aqui..."
    },

    denuciante: {
      id: "denuciante",
      label: "Denuciante",
      placeholder: "Ingresa el denuciante aqui..."
    },

    imputado: {
      id: "imputado",
      label: "Imputado",
      placeholder: "Ingresa el imputado aqui..."
    },

    delito: {
      id: "delito",
      label: "Delito",
      placeholder: "Ingresa el delito aqui..."
    },

    lugar: {
      id: "lugar",
      label: "Lugar de los Hechos",
      placeholder: "Ingresa el lugar de los hechos aqui..."
    },

    objeto: {
      id: "objeto",
      label: "Objeto del Delito",
      placeholder: "Ingresa el objeto del delito aqui..."
    },

    eGuarda: {
      id: "eGuarda",
      label: "Estado que Guarda",
      placeholder: "Ingresa el estado que guarda aqui..."
    },
    
}


export {fields, Field}