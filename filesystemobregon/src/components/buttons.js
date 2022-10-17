/* Code used to define buttons to display
Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

// Button used for juicios nulidad
function NulidadButton(props) {
  return(
    <div className="col d-grid">
      <button type="button" className="btn btn-primary btn-lg" onClick={() => {props.setFields(props.nulidadFields); props.setFormData({reset: true}); props.setDocType("juicioNulidad")}}>Juicio de Nulidad</button>
    </div>
  )
}

// Button used for carpeta investigacion
function CarpetaButton(props) {
  return(
    <div className="col d-grid">
      <button type="button" className="btn btn-primary btn-lg" onClick={() => {props.setFields(props.carpetaFields); props.setFormData({reset: true}); props.setDocType("carpetaInvestigacion")}}>Carpeta de Investigacion</button>
    </div>
  )
}

function NulidadButtonSearch(props) {
  return(
    <div className="col">
      <button type="button" className="btn btn-primary" id="buttonBusqueda" onClick={
        () => {
          props.setFields(props.nulidadFields);
          props.setDocType({docType: "juicioNulidad"});
          props.getData({docType: "juicioNulidad"});
        }}>Juicio de Nulidad</button>
    </div>
  )
}

function CarpetaButtonSearch(props) {
  return(
    <div className="col">
        <button type="button" className="btn btn-primary" id="buttonBusqueda" onClick={
          () => {
            props.setFields(props.carpetaFields);
            props.setDocType({docType: "carpetaInvestigacion"});
            props.getData({docType: "carpetaInvestigacion"});
          }}>Carpeta de Investigacion</button>
    </div>
  )
}

function GetButtons(props) {
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
    // Only display nulidad button
  } else if (props.nulidad) {
    return (
      <div className="row text-center p-5 gx-5">  
      <NulidadButton
        setFields= {props.setFields}
        setFormData = {props.setFormData}
        setDocType = {props.setDocType}
        nulidadFields = {props.nulidadFields}
      />
      </div>
    )
    // Only display carpeta button
  } else if (props.carpeta) {
    return (
      <div className="row text-center p-5 gx-5">  
      <CarpetaButton 
        setFields= {props.setFields}
        setFormData = {props.setFormData}
        setDocType = {props.setDocType}
        carpetaFields = {props.carpetaFields}
      />
      </div>
    )
    // Don't display any
  } else {
    return(
      <div></div>
    )
  }
}

function GetButtonsSearch(props) {
  if (props.nulidad && props.carpeta) {
    return (
      <div className="row text-center p-5">
        <NulidadButtonSearch
          setFields= {props.setFields}
          getData = {props.getData}
          setDocType = {props.setDocType}
          nulidadFields = {props.nulidadFields}
        />
        <CarpetaButtonSearch 
          setFields= {props.setFields}
          getData = {props.getData}
          setDocType = {props.setDocType}
          carpetaFields = {props.carpetaFields}
        />
      </div>
    )
  } else if (props.nulidad) {
    return (
      <div className="row text-center p-5 gx-5">  
      <NulidadButtonSearch
        setFields= {props.setFields}
        getData = {props.getData}
        setDocType = {props.setDocType}
        nulidadFields = {props.nulidadFields}
      />
      </div>
    )
  } else if (props.nulidad) {
    return (
      <div className="row text-center p-5 gx-5">  
      <CarpetaButtonSearch
        setFields= {props.setFields}
        getData = {props.getData}
        setDocType = {props.setDocType}
        carpetaFields = {props.carpetaFields}
      />
      </div>
    )
  } else {
    return(
      <div></div>
    )
  }
}

export {GetButtons, GetButtonsSearch}