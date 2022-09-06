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
          nav
        </div>
        <div className="section p-5">
          <div className="container">
            <div className="row">
              <div className="col-md-2 text-start">
                <p className="display-3"><strong>Sube tus archivos</strong></p>
              </div>
              <div className="col-md text-end">
                <p className="display-1"><strong>Sube tus archivos</strong></p>
              </div>
            </div>
          </div>
        </div>
        {/* Bootsrtap Js CDN */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      </body>
    </html>
  )
}