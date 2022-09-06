export default function App() {
  
  return(
    <html>
      <head>
        <meta charset="utf-8" ></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        {/* Bootsrtap CSS CDN */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      </head>

      <body>
        {/* <Navigation /> */}
        <div className="m-5">
          
        </div>
        <div className="section p-5">
          <div className="container">
            <div className="row">
              <div className="col-md-5 text-md-start text-center">
                <p className="display-2"><strong>Sube tus archivos</strong></p>
                <button type="button" class="btn btn-primary btn-sm rounded-3 fw-bold">Subir archivo</button>
              </div>
              <div className="col-md text-md-end text-center">
                <p className="display-1"><strong>Imagen</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className="section p-5">
          <div className="container">
            <div className="row">
              <div className="col-md text-md-start text-center">
                <p className="display-1"><strong>Imagen</strong></p>
              </div>
              <div className="col-md-5 text-md-end text-center">
                <p className="display-2"><strong>Busca archivos</strong></p>
                <button type="button" class="btn btn-primary btn-sm rounded-3 fw-bold">Subir archivo</button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}