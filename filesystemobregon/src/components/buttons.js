function NulidadButton(props) {
  return(
    <div className="col d-grid">
      <button type="button" className="btn btn-primary btn-lg" onClick={() => {props.setFields(props.nulidadFields); props.setFormData({reset: true}); props.setDocType("juicioNulidad")}}>Juicio de Nulidad</button>
    </div>
  )
}

function CarpetaButton(props) {
  return(
    <div className="col d-grid">
      <button type="button" className="btn btn-primary btn-lg" onClick={() => {props.setFields(props.carpetaFields); props.setFormData({reset: true}); props.setDocType("carpetaInvestigacion")}}>Carpeta de Investigacion</button>
    </div>
  )
}

export default function GetButtons(props) {
  if (props.nulidad && props.carpeta) {
    return (
      <div className="row text-center p-5 gx-5">  
        <NulidadButton
          setFields= {props.setFields}
          setFormData = {props.setFormData}
          setDocType = {props.setDocType}
          nulidadFields = {props.nulidadFields}
        />
        <CarpetaButton 
          setFields= {props.setFields}
          setFormData = {props.setFormData}
          setDocType = {props.setDocType}
          carpetaFields = {props.carpetaFields}
        />
      </div>
    )
  } else if (props.nulidad) {
    return (
      <div className="row text-center p-5 gx-5">  
      <NulidadButton
        setFields= {props.setFields}
        setFormData = {props.setFormData}
        setDocType = {props.setDocType}
      />
      </div>
    )
  } else if (props.nulidad) {
    return (
      <div className="row text-center p-5 gx-5">  
      <CarpetaButton 
        setFields= {props.setFields}
        setFormData = {props.setFormData}
        setDocType = {props.setDocType}
      />
      </div>
    )
  } else {
    return(
      <div></div>
    )
  }
}