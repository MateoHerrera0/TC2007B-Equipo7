/* Code used to define endpoints and connection to database (backend)
Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

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
  resave: false, // don't save again if nothing got changed in session 
  saveUninitialized: false, // do not save session if no one logged in
  store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/AOFILES"}),
  cookie: {
     maxAge: 60000 * 30 // cookie lifespan of 30 minutes
  }
}))

// Function to connect database
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


// Post for user login
app.post("/api/login", (req, res) => {
  // Receive req
  let user = req.body.email;
  let pass = req.body.password;
  // Look for user in database
  db.collection("usuarios").findOne({email:user}, (err, result) => {
      // If user exists
      if(result!=null)
      {
          // Verify password
          bcrypt.compare(pass, result.password, (err, result) => {
              // If password is correct
              if(result){
                  // Start session
                  req.session.usuario=user;
                  req.session.nulidad = result.nulidad;
                  req.session.investigacion = result.investigacion;
                  // Send session
                  res.send(JSON.stringify({'email': req.session.usuario}));
              }
              // If password is incorrect
              else{
                  res.send({"Message": "Error in login"});
              }
          })
      }
      // If user doesn't exist
      else{
          res.send({"Message" : "Error1 in login"});
      }
  })
})

// Post for user register
app.post("/api/register", (req, res) => {
  // Receive req
  let user = req.body.usuario;
  let pass = req.body.password;
  let mail = req.body.email;
  let cpass = req.body.repPassword;
  let uType = req.body.userType;
  let typeNulidad = req.body.nulidad; 
  let typeInv = req.body.investigacion;
  try{
    // Look for user in database
    db.collection("usuarios").findOne({email:mail}, (err, result) => {
      // If user exists
      if(result!=null)
      {
        res.send({"Message": "User already exists"});
      }
      // Check if password confirmation is valid
      else if (pass != cpass) 
      {
        res.send({"Message": "Passwords don't match"});
      }
      // Otherwise
      else
      {
        // Hash password
        bcrypt.hash(pass, 10, (err, hash) => {
          // Save new user info into variable
          let aAgregar = {usuario: user, email: mail, password: hash, userType: uType, nulidad: typeNulidad, investigacion: typeInv}
          // Add new user info to database
          db.collection("usuarios").insertOne(aAgregar, (err, result) => {
          // Evaluate for error
          if(err) throw err;
          res.send({"Message": "User registered"});
          })
        })
      }
    })
    res.json({'Message': "User inserted correctly."});
  }
  // Error
  catch (error){
    res.status(500);
    res.json(error);
    console.log(error);
  }
})

// Get for user profile
app.get("/api/profile", async (req, res) => {
  // If session exists
  if(req.session.usuario)
  {
    try{
      // Find user in database from session info
      const cursor = db.collection("usuarios").find({email:req.session.usuario}, {password: 0});
      const data = await cursor.toArray();
      // Send user data
      return res.json(data);
    }
    // Error
    catch (error){
      res.status(500);
      res.json(error);
      console.log(error);
    }
  }
  // If session doesn't exist
  else
  {
    return res.status(400).json("Not Authorized");
  }
})

// Get for session --> determine if session exists
app.get("/api/sessionExists", async (req, res) => {
  // If session exists
  if(req.session.usuario) {
    // Return session
    return res.json(req.session.usuario);
  }
  // If session doesn't exist
  else
  {
    // Return null
    return res.json(null);
  }
})

// Get for all users in database
app.get("/api/getAllUsers", async (req, res) => {
  try {
    // Get all info from users collection
    const cursor = db.collection("usuarios").find(); 
    const data = await cursor.toArray();
    // Get results
    res.json(data);
  } 
  // Error
  catch (error) {
    res.status(500);
    res.json(error);
    console.log(error);
  }
})

// Get for logout
app.get("/api/logout", (req, res) => {
  // Delete session to logout
  req.session.destroy();
  res.json({});
})

// Delete for user
app.delete("/api/deleteUser", (req, res) => {
  // Get req user data
  let mail = req.body.email;
  let user = req.body.usuario;
  // Delete from database
  db.collection("usuarios").deleteOne({usuario: user, email: mail});
  res.send({"message": "User deleted"});
})

// Put to edit users
app.put("/api/editUser", (req, res) => {
  // Get user new info and original user identifier (email in this case)
  let mail = req.body.email; 
  let user = req.body.usuario; 
  let ogEmail = req.body.ogEmail;
  let tNulidad = req.body.nulidad; 
  let tInvestigacion = req.body.investigacion;
  // Update database
  db.collection("usuarios").updateOne({email: ogEmail}, {$set: {usuario: user, email: mail, nulidad: tNulidad, investigacion: tInvestigacion}});
  res.send({"Message": "User edited"});
})

// Put to update passwords
app.put("/api/changePass", (req, res) => {
  // Get req info
  let mail = req.body.email; 
  let ogPass = req.body.ogPassword;
  let newPass = req.body.newPassword;
  let repPass = req.body.repPassword;
  // Look for user in database
  db.collection("usuarios").findOne({email:mail}, (err, result) => {
    // If user exists
    if(result!=null)
    {
      // Verify if original password matches password in database
      bcrypt.compare(ogPass, result.password, (err, result) => {
        // If they match
        if(result){
          // Confirm new password
          if (newPass != repPass) 
          {
            // If new passwords don't match
            res.send({"Message": "Passwords don't match"})
          }
          // If new passwords match
          else {
            // Hash new password
            bcrypt.hash(newPass, 10, (err, hash) => {
              // Error
              if (err) throw err;
              // update password in database
              db.collection("usuarios").updateOne({email: mail}, {$set: {password: hash}})
            })
            res.send({"Message": "Change Successful"})
          }
        }
        // If original password doesn't match with database
        else{
          res.send({"Message": "Error"})
        }
      })
    }
    // If user doesn't exist
    else
    {
      res.send(false)
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