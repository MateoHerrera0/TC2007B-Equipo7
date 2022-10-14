// Imports
const express = require("express")
const fs = require("fs")
const bodyparser = require("body-parser")
const multer = require("multer")
const crypto = require("crypto")
const {MongoClient, Binary, ObjectId} = require("mongodb")
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const https = require('https');
const { func } = require("joi")

const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
app.set("view-engine", "ejs")
const uploads = multer({dest:".temp/"})

let db;

// Cors configuration
app.use(
  cors({
    origin: "https://localhost:3000", 
    optionsSuccessStatus: 200,
    credentials: true,
}))

// Trust proxy
app.set("trust proxy", 1);

// Create session
app.use(session({
  secret: "team7AOFILES",
  resave: false, // no volver a guardar si en la sesión no se hizo nada nuevo
  saveUninitialized: false, // cuando alguien se conecte al sistema, tenemos una sesión, pero si no se logguea, no queremos guardarla
  store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/AOFILES"}),
  cookie: {
     maxAge: 60000 * 30 // Permitir que la cookie exista por 30 mins
  }
}))

// Función para conectar a base de datos
async function connectToDB(){
  let client = new MongoClient("mongodb://127.0.0.1:27017/AOFILES")
  await client.connect();
  db = client.db();
}

// app.get("/descargar", async (req, res)=>{
//   let array = await db.collection("AOFILES").find({}).project({_id: 0, nombre: 1}).toArray()
//   res.render("descargar.ejs", {archivos: array})
//   console.log(array);
// })


// Post para login
app.post("/api/login", (req, res) => {
  // Recibir req
  let user = req.body.email;
  let pass = req.body.password;
  // Buscar usuario en la base de datos 
  db.collection("usuarios").findOne({email:user}, (err, result) => {
      // Si el usuario existe
      if(result!=null)
      {
          // Verificar contraseña
          bcrypt.compare(pass, result.password, (err, result) => {
              // Si la contraseña es correcta
              if(result){
                  // Inicializar sesión
                  req.session.usuario=user;
                  req.session.nulidad = result.nulidad;
                  req.session.investigacion = result.investigacion;
                  // Enviar sesión
                  res.send(JSON.stringify({'email': req.session.usuario}));
              }
              // Si la contraseña no es correcta
              else{
                  res.send({"Message": "Error in login"});
              }
          })
      }
      // Si el usuario no existe
      else{
          res.send({"Message" : "Error1 in login"});
      }
  })
})

// Post para registro
app.post("/api/register", (req, res) => {
  console.log(req.body);
  let user = req.body.usuario;
  let pass = req.body.password;
  let mail = req.body.email;
  let cpass = req.body.repPassword;
  let uType = req.body.userType;
  let typeNulidad = req.body.nulidad; 
  let typeInv = req.body.investigacion;
  console.log(user);
  try{
    db.collection("usuarios").findOne({email:mail}, (err, result) => {
      if(result!=null)
      {
        console.log("El usuario ya existe")
      }
      else if (pass != cpass) 
      {
        console.log("Las contraseñas no coinciden")
      }
      else
      {
        bcrypt.hash(pass, 10, (err, hash) => {
          let aAgregar = {usuario: user, email: mail, password: hash, userType: uType, nulidad: typeNulidad, investigacion: typeInv}
          db.collection("usuarios").insertOne(aAgregar, (err, result) => {
          if(err) throw err;
          console.log("Usuario agregado");
          })
        })
      }
    })
    res.json({'message': "User inserted correctly."});
  }
  catch (error){
    res.status(500);
    res.json(error);
    console.log(error);
  }
})

app.get("/api/profile", async (req, res) => {
  if(req.session.usuario)
  {
    console.log(req.session.usuario)
    try{
      const cursor = db.collection("usuarios").find({email:req.session.usuario}, {password: 0});
      const data = await cursor.toArray();
      return res.json(data);
    }
    catch (error){
      res.status(500);
      res.json(error);
      console.log(error);
    }
  }
  else
  {
    return res.status(400).json("Not Authorized")
  }
})

app.get("/api/sessionExists", async (req, res) => {
  if(req.session.usuario) {
    console.log("el usuario", req.session.usuario)
    return res.json(req.session.usuario)
  }
  else
  {
    return res.json(null)
  }
})

app.get("/api/getAllUsers", async (req, res) => {
  try {
    const cursor = db.collection("usuarios").find(); // cambiar xq las colleciones se dividieron
    const data = await cursor.toArray();
    res.json(data);
  } catch (error) {
    res.status(500);
    res.json(error);
    console.log(error);
  }
})

app.get("/api/User", async (req, res) => {
  try {
    const cursor = db.collection("usuarios").find(); // cambiar xq las colleciones se dividieron
    const data = await cursor.toArray();
    res.json(data);
  } catch (error) {
    res.status(500);
    res.json(error);
    console.log(error);
  }
})


app.get("/api/logout", (req, res) => {
  console.log(req.session);
  req.session.destroy()
  res.json({})
})

app.delete("/api/deleteUser", (req, res) => {
  let mail = req.body.email;
  let user = req.body.usuario;
  db.collection("usuarios").deleteOne({usuario: user, email: mail}) 
  res.send({"message": "User deleted"})
})

app.put("/api/editUser", (req, res) => {
  let mail = req.body.email; 
  let user = req.body.usuario; 
  let ogEmail = req.body.ogEmail;
  let tNulidad = req.body.nulidad; 
  let tInvestigacion = req.body.investigacion;
  db.collection("usuarios").updateOne({email: ogEmail}, {$set: {usuario: user, email: mail, nulidad: tNulidad, investigacion: tInvestigacion}})
  res.send({"message": "User edited"})
})

app.put("/api/changePass", (req, res) => {
  let mail = req.body.email; 
  let ogPass = req.body.ogPassword;
  let newPass = req.body.newPassword;
  let repPass = req.body.repPassword;
  console.log(req.body)
  db.collection("usuarios").findOne({email:mail}, (err, result) => {
    console.log("hey ", result);
    if(result!=null)
    {
        bcrypt.compare(ogPass, result.password, (err, result) => {
            if(result){
              
              if (newPass != repPass) 
              {
                console.log("Las contraseñas no coinciden")
                res.send({"message": "Las contraseñas no coinciden"})
              }
              else {
                bcrypt.hash(newPass, 10, (err, hash) => {
                  if (err) throw err;
                  console.log(hash)
                  db.collection("usuarios").updateOne({email: mail}, {$set: {password: hash}})
                })
                res.send({"message": "Cambio realizado"})
              }
                //res.redirect("/pagina")
            }
            else{
                console.log("Error")
                //res.redirect("/")
            }
        })
    }
    else{
        res.send(false)
        console.log("El usuario no existe")
    }
})
})

app.post("/api/addpath", uploads.single("file"), (req, res) => {
  try {
    let body = req.body;
    let collection = req.body.docType;
    delete(body.folio)
    delete(body.docType)
    delete(body.nombre)

    db.collection(collection).insertOne(body, (err,res) => {
      if (err) throw err;
      console.log("Expediente Guardado");
    })
    res.json({'message': "Data inserted correctly."});
  } catch (error) {
    res.status(500);
    res.json(error);
    console.log(error);
  }
  
})

app.post("/api/addFirstFolio", uploads.single("file"), async (req,res) => {
  try {
    let folio = req.body.folio;
    let nombre = req.body.nombre;
    let docID = req.body.docID
    let collection = req.body.docType;

    const cursor = db.collection(collection).find({docID: docID}, {projection: {"_id": 1}});
    const data = await cursor.toArray();
    console.log(data)

    let rutaDefinitiva = "/.storage/" + folio;
    let inputFS = fs.createReadStream(__dirname + "/.temp/" +req.file.filename)
    let outputFS = fs.createWriteStream(__dirname + rutaDefinitiva)
    let key="abcabcabcabcabcabcabcabcabcabc12"
    let iv= "abcabcabcabcabc1"
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(cipher).pipe(outputFS)
    outputFS.on("finish", () => {
      let Folio = {};
      Folio.folio = folio;
      Folio.archivo = rutaDefinitiva;
      Folio.nombre = nombre;
      Folio.expedienteID = data[0]._id
      fs.unlinkSync(__dirname + "/.temp/" +req.file.filename)
      db.collection("folios").insertOne(Folio, (err,res) => {
        if (err) throw err;
        console.log("Folio Guardado");
      })
    })
    res.json({'message': "Data inserted correctly."});
  } catch (error) {
    res.status(500);
    res.json(error);
    console.log(error);
  }
})

app.put("/api/addfolio", uploads.single("fileFolio"), (req, res) => {
  try {
    let rutaDefinitiva = "/.storage/" + req.body.folio;
    let inputFS = fs.createReadStream(__dirname + "/.temp/" + req.file.filename)
    let outputFS = fs.createWriteStream(__dirname + rutaDefinitiva)
    let key="abcabcabcabcabcabcabcabcabcabc12"
    let iv= "abcabcabcabcabc1"
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(cipher).pipe(outputFS)
    outputFS.on("finish", () => {
      let Folio = {};
      Folio.folio = req.body.folio;
      Folio.archivo = rutaDefinitiva;
      Folio.nombre = req.body.nombre;
      Folio.expedienteID = ObjectId(req.body.proceeding)
      fs.unlinkSync(__dirname + "/.temp/" +req.file.filename)
      db.collection("folios").insertOne(Folio, (err,res) => {
        if (err) throw err;
        console.log("Folio Guardado");
      })
    })
    res.json({'message': "Data updated correctly"})
  } catch (error) {
    res.status(500);
    res.json(error);
    console.log(error);
  }
})

// app.get("/api/getDocs", async (req, res) => {
//   try {
//     const cursor = db.collection("docs").find(); // cambiar xq las colleciones se dividieron
//     const data = await cursor.toArray();
//     res.json(data);
//   } catch (error) {
//     res.status(500);
//     res.json(error);
//     console.log(error);
//   }
// })

app.post("/api/getDocs", async (request, response) => {
  try {
    let searchValue = {}
    if (request.body.query != null) {
      searchValue = request.body.query
    }
    // {"docID" : {$regex : request.body.docID}
    const cursor = db.collection(request.body.docType).find(searchValue, request.body.projection);
    const data = await cursor.toArray();
    console.log(data);
    response.json(data);
  } catch (error) {
    
    response.status(500);
    response.json(error);
    console.log(error);
  }
})

app.post("/api/getFolios", async (request, response) => {
  try {
    let searchValue = request.body.query
    console.log(searchValue);
    // {"docID" : {$regex : request.body.docID}
    const cursor = db.collection("folios").find({expedienteID: ObjectId(searchValue)});
    const data = await cursor.toArray();
    console.log(data);
    response.json(data);
  } catch (error) {
    
    response.status(500);
    response.json(error);
    console.log(error);
  }
})

async function descargarArchivo(req, res, key, iv){
  db.collection("folios").findOne({"_id":ObjectId(req.body._id)}, (err, result) => {
    if (err) throw err;
    let archivoTemporal=__dirname+"/.temp/"+result.nombre+".pdf";
    const inputFS = fs.createReadStream(__dirname + result.archivo);
    const outputFS = fs.createWriteStream(archivoTemporal);
    const decypher = crypto.createDecipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(decypher).pipe(outputFS)
    outputFS.on('finish', function() {
      res.download(archivoTemporal, (err) => {
        if (err) throw err;
        fs.unlink(archivoTemporal, (err) => {
          if (err) throw err;
          console.log("Borrado despues de descarga");
        })
      })
    })
  })
}

app.post("/api/descargarFolio", (req, res) => {
  descargarArchivo(req, res, "abcabcabcabcabcabcabcabcabcabc12", "abcabcabcabcabc1")
})


https.createServer({ cert: fs.readFileSync('testLab.cer'), key: fs.readFileSync('testLab.key') },app).listen(443, ()=>{ 
  connectToDB()
  console.log('Servidor funcionando en puerto 443'); 
});

// app.listen(5000, ()=>{
//   connectToDB()
//   console.log("Server started on port 5000........")
// })