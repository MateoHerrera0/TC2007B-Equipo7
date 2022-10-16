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
                  req.session.userType = result.userType;
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
  if(req.session.usuario)
  {
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
    }
    // Error
    catch (error){
      res.status(500);
      res.json(error);
      console.log(error);
    }
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
  if(req.session.usuario)
  {
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
  }
})

// Get for logout
app.get("/api/logout", (req, res) => {
  if(req.session.usuario)
  {
    // Delete session to logout
    req.session.destroy();
    res.json({});
  }
})

// Delete for user
app.delete("/api/deleteUser", (req, res) => {
  // Get req user data
  let mail = req.body.email;
  let user = req.body.usuario;
  if(req.session.usuario)
  {
    // Delete from database
    db.collection("usuarios").deleteOne({usuario: user, email: mail});
    res.send({"message": "User deleted"});
  }
})

// Put to edit users
app.put("/api/editUser", (req, res) => {
  // Get user new info and original user identifier (email in this case)
  let mail = req.body.email; 
  let user = req.body.usuario; 
  let ogEmail = req.body.ogEmail;
  let tNulidad = req.body.nulidad; 
  let tInvestigacion = req.body.investigacion;
  if(req.session.usuario)
  {
    // Update database
    db.collection("usuarios").updateOne({email: ogEmail}, {$set: {usuario: user, email: mail, nulidad: tNulidad, investigacion: tInvestigacion}});
    res.send({"Message": "User edited"});
  }
})

// Put to update passwords
app.put("/api/changePass", (req, res) => {
  // Get req info
  let mail = req.body.email; 
  let ogPass = req.body.ogPassword;
  let newPass = req.body.newPassword;
  let repPass = req.body.repPassword;
  if(req.session.usuario)
  {
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
  }
})

// Post to setup app backend --> create roles 
app.post("/api/setup", (req, res)=>{
  // Get request info
  let mail = req.body.email;
  let pass=req.body.password;
  let nulidad = "nulidad"; 
  let investigacion = "investigacion";
  // Generate keys using private key
  let privKey=fs.readFileSync("testLab.key");
  // Key and initialization vector for nulidad
  let nulidadKey=crypto.publicEncrypt(privKey, Buffer.from(crypto.randomBytes(16).toString("hex"))).toString("hex");
  let nulidadIv=crypto.publicEncrypt(privKey, Buffer.from(crypto.randomBytes(8).toString("hex"))).toString("hex");
  // Key and initialization vector for investigacion
  let investigacionKey=crypto.publicEncrypt(privKey, Buffer.from(crypto.randomBytes(16).toString("hex"))).toString("hex");
  let investigacionIv=crypto.publicEncrypt(privKey, Buffer.from(crypto.randomBytes(8).toString("hex"))).toString("hex");
  // Insert values
  let nulidadInsertar={rol: nulidad, llave: nulidadKey, iv: nulidadIv}
  let investigacionInsertar={rol: investigacion, llave: investigacionKey, iv: investigacionIv}
  // Insert roles in database
  db.collection("roles").insertMany([nulidadInsertar, investigacionInsertar], (err, result)=>{
    if (err) throw err;
    // Create user admin
    bcrypt.hash(pass, 10, (err, hash)=>{
        let agregarAdmin={usuario: "Admin", email: mail, password: hash, userType: "Administrador", nulidad: false, investigacion: false}
        // Insert admin in database
        db.collection("usuarios").insertOne(agregarAdmin, (err, result)=>{
            if (err) throw err;
        })
    })
  res.send({"Message": "Setup complete"})
  })
});

// Upload file path --> Expediente
app.post("/api/addpath", uploads.single("file"), (req, res) => {
  if(req.session.usuario)
  {
    try {
      // Get request data
      let body = req.body;
      let collection = req.body.docType;
      delete(body.folio)
      delete(body.docType)
      delete(body.nombre)
  
      // Insert into collection (nulidad or investigacion)
      db.collection(collection).insertOne(body, (err,res) => {
        if (err) throw err;
        console.log("Expediente Guardado");
      })
      res.json({'message': "Data inserted correctly."});
      // ERror
    } catch (error) {
      res.status(500);
      res.json(error);
      console.log(error);
    }
  }
})

// Post for first folio
app.post("/api/addFirstFolio", uploads.single("file"), (req,res) => {
  if(req.session.usuario)
  {
    try {
      // Get req data
      let collection = req.body.docType;
      console.log(collection);
      // Get key and initialization vector depending on docType
      if(collection == "juicioNulidad")
      {
        // Nulidad iv and key
        db.collection("roles").findOne({rol:"nulidad"}, (err, result)=>{
          fs.readFile("testLab.key", (err, decryptKey)=>{
              console.log("el resultado",result.iv);
              let key=Buffer.from(crypto.privateDecrypt(decryptKey, Buffer.from(result.llave, "hex")));
              let iv=Buffer.from(crypto.privateDecrypt(decryptKey, Buffer.from(result.iv, "hex")));
              uploadFirstFolio(req, key,iv);
          })
        })
      }
      else if (collection == "carpetaInvestigacion")
      {
        // Investigacion iv and key
        db.collection("roles").findOne({rol:"investigacion"}, (err, result)=>{
          fs.readFile("testLab.key", (err, decryptKey)=>{
              console.log("wuwuwuw");
              let key=Buffer.from(crypto.privateDecrypt(decryptKey, Buffer.from(result.llave, "hex")));
              let iv=Buffer.from(crypto.privateDecrypt(decryptKey, Buffer.from(result.iv, "hex")));
              console.log("el iv", iv)
              uploadFirstFolio(req, key,iv);
          })
        })
      }
      res.json({'message': "Data inserted correctly."});
      // Error
    } catch (error) {
      res.status(500);
      res.json(error);
      console.log(error);
    }
  }
})

// Put to add folios
app.put("/api/addfolio", uploads.single("fileFolio"), (req, res) => {
  if(req.session.usuario)
  {
    try {
      // Get folio type
      let collection = req.body.docType;
      // Get key and initialization vector depending on docType
      if(collection == "juicioNulidad")
      {
        // Nulidad iv and key
        db.collection("roles").findOne({rol:"nulidad"}, (err, result)=>{
          fs.readFile("testLab.key", (err, decryptKey)=>{
              let key=Buffer.from(crypto.privateDecrypt(decryptKey, Buffer.from(result.llave, "hex")));
              let iv=Buffer.from(crypto.privateDecrypt(decryptKey, Buffer.from(result.iv, "hex")));
              uploadFolio(req, key, iv);
          })
        })
      }
      else if (collection == "carpetaInvestigacion")
      {
        // Investigacion iv and key
        db.collection("roles").findOne({rol:"investigacion"}, (err, result)=>{
          fs.readFile("testLab.key", (err, decryptKey)=>{
              let key=Buffer.from(crypto.privateDecrypt(decryptKey, Buffer.from(result.llave, "hex")));
              let iv=Buffer.from(crypto.privateDecrypt(decryptKey, Buffer.from(result.iv, "hex")));
              uploadFolio(req, key, iv);
          })
        })
      }
      res.json({'message': "Data updated correctly"})
      // Error
    } catch (error) {
      res.status(500);
      res.json(error);
      console.log(error);
    }
  }
})

// Function that uploads first folio
async function uploadFirstFolio(req, key, iv)
{
    // Get req data
    let folio = req.body.folio;
    let nombre = req.body.nombre;
    let docID = req.body.docID
    let collection = req.body.docType;
    console.log(collection);
    // Get doc id from database (depending on collection --> nulidad / investigacion)
    const cursor = db.collection(collection).find({docID: docID}, {projection: {"_id": 1}});
    const data = await cursor.toArray();
    console.log(data)
    // Define route, input and output
    let rutaDefinitiva = "/.storage/" + folio;
    let inputFS = fs.createReadStream(__dirname + "/.temp/" +req.file.filename)
    let outputFS = fs.createWriteStream(__dirname + rutaDefinitiva)
    console.log("iv aqui",iv);
    // Cipher
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(cipher).pipe(outputFS)
    // Add folio
    outputFS.on("finish", () => {
      let Folio = {};
      Folio.folio = folio;
      Folio.archivo = rutaDefinitiva;
      Folio.nombre = nombre;
      Folio.expedienteID = data[0]._id
      fs.unlinkSync(__dirname + "/.temp/" +req.file.filename)
      // Add folio to database
      db.collection("folios").insertOne(Folio, (err,res) => {
        if (err) throw err;
        console.log("Folio Guardado");
      })
    })
}

// Function to upload folios
async function uploadFolio(req, key, iv)
{
  // Define route, input and output
  let rutaDefinitiva = "/.storage/" + req.body.folio;
  let inputFS = fs.createReadStream(__dirname + "/.temp/" + req.file.filename)
  let outputFS = fs.createWriteStream(__dirname + rutaDefinitiva)
  // Cipher
  let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  // Add folio
  inputFS.pipe(cipher).pipe(outputFS)
  outputFS.on("finish", () => {
    let Folio = {};
    Folio.folio = req.body.folio;
    Folio.archivo = rutaDefinitiva;
    Folio.nombre = req.body.nombre;
    Folio.expedienteID = ObjectId(req.body.proceeding);
    fs.unlinkSync(__dirname + "/.temp/" +req.file.filename);
    // Add folio to database
    db.collection("folios").insertOne(Folio, (err,res) => {
      if (err) throw err;
      console.log("Folio Guardado");
    })
  })
}

// Post to get docs
app.post("/api/getDocs", async (request, response) => {
  if(request.session.usuario)
  {
    try {
      // Query to search docs
      let searchValue = {}
      if (request.body.query != null) {
        searchValue = request.body.query
      }
      // {"docID" : {$regex : request.body.docID}
      // Look in collection corresponding to document type (nulidad/investigacion)
      const cursor = db.collection(request.body.docType).find(searchValue, request.body.projection);
      const data = await cursor.toArray();
      console.log(data);
      // Get data
      response.json(data);
      // Error
    } catch (error) {
      response.status(500);
      response.json(error);
      console.log(error);
    }
  }
})

// Post to get folios
app.post("/api/getFolios", async (request, response) => {
  if(req.session.usuario)
  {}
  try {
    // Save query
    let searchValue = request.body.query
    console.log(searchValue);
    // {"docID" : {$regex : request.body.docID}
    // Look for query value in the folios collection
    const cursor = db.collection("folios").find({expedienteID: ObjectId(searchValue)});
    const data = await cursor.toArray();
    console.log(data);
    // Get data
    response.json(data);
    // Error
  } catch (error) {
    response.status(500);
    response.json(error);
    console.log(error);
  }
})

// Function used to download a file --> receives key and initialization vector also
async function descargarArchivo(req, res, key, iv){
  // Find folio to download in database
  db.collection("folios").findOne({"_id":ObjectId(req.body._id)}, (err, result) => {
    if (err) throw err;
    // Define input, output and temp file
    let archivoTemporal=__dirname+"/.temp/"+result.nombre+".pdf";
    const inputFS = fs.createReadStream(__dirname + result.archivo);
    const outputFS = fs.createWriteStream(archivoTemporal);
    // Decipher using key and initialization vector 
    const decypher = crypto.createDecipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(decypher).pipe(outputFS)
    // Download
    outputFS.on('finish', function() {
      res.download(archivoTemporal, (err) => {
        if (err) throw err;
        // Delete temp file after download
        fs.unlink(archivoTemporal, (err) => {
          if (err) throw err;
          console.log("Borrado despues de descarga");
        })
      })
    })
  })
}

// Post to download folio
app.post("/api/descargarFolio", (req, res) => {
  // Initialize key and iv, get doctype to determine them
  let key=""
  let iv= ""
  let folioType = req.body.docType;
  if(req.session.usuario)
  {
    // Get key and initialization vector depending on docType
    if(folioType == "juicioNulidad")
    {
      // Nulidad iv and key
      db.collection("roles").findOne({rol:"nulidad"}, (err, result)=>{
        fs.readFile("testLab.key", (err, decryptKey)=>{
            key=Buffer.from(crypto.privateDecrypt(decryptKey, Buffer.from(result.llave, "hex")));
            iv=Buffer.from(crypto.privateDecrypt(decryptKey, Buffer.from(result.iv, "hex")));
             // Call download function
            descargarArchivo(req, res, key, iv);
          })
        })
      }
      else if (folioType == "carpetaInvestigacion")
      {
        // Investigacion iv and key
        db.collection("roles").findOne({rol:"investigacion"}, (err, result)=>{
          fs.readFile("testLab.key", (err, decryptKey)=>{
              key=Buffer.from(crypto.privateDecrypt(decryptKey, Buffer.from(result.llave, "hex")));
              iv=Buffer.from(crypto.privateDecrypt(decryptKey, Buffer.from(result.iv, "hex")));
              // Call download function
              descargarArchivo(req, res, key, iv);
          })
        })
      }
  }
})

// Https server
https.createServer({ cert: fs.readFileSync('testLab.cer'), key: fs.readFileSync('testLab.key') },app).listen(443, ()=>{ 
  // Connect database
  connectToDB()
  console.log('Servidor funcionando en puerto 443'); 
});

// app.listen(5000, ()=>{
//   connectToDB()
//   console.log("Server started on port 5000........")
// })