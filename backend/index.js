// Imports
const express = require("express")
const fs = require("fs")
const bodyparser = require("body-parser")
const multer = require("multer")
const crypto = require("crypto")
const {MongoClient, Binary} = require("mongodb")
const cors = require("cors")
const mongoose = require("mongoose")
const register = require("./routes/register");
const login = require("./routes/login");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
app.set("view-engine", "ejs")
const uploads = multer({dest:".temp"})

let db;

app.use("/api/register", register);
app.use("/api/login", login);

function connectToDB() {
  let client = new MongoClient("mongodb://127.0.0.1:27017/AOFILES")
  client.connect()
  console.log("Conectado mongo");
  db = client.db()
}

function connectToUserDB() {
  const uri = process.env.USER_DB_URI;
  mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongooseDB connection established..."))
  .catch((error) => console.error("MongooseDB connection failed:", error.message));
}

// app.get("/descargar", async (req, res)=>{
//   let array = await db.collection("AOFILES").find({}).project({_id: 0, nombre: 1}).toArray()
//   res.render("descargar.ejs", {archivos: array})
//   console.log(array);
// })

// app.post("/descargar", (req, res) => {
//   db.collection("AOFILES").findOne({nombre: req.body.documentos}, (err, result) =>{

//     let temporal = __dirname + "/.temp/" + req.body.documentos + ".pdf";
//     let inputFS = fs.createReadStream(__dirname + result.archivo)
//     let outputFS = fs.createWriteStream(temporal)
//     let key="abcabcabcabcabcabcabcabcabcabc12"
//     let iv= "abcabcabcabcabc1"
//     let cipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
//     inputFS.pipe(cipher).pipe(outputFS)
//     outputFS.on("finish", () => {
//       res.download(temporal, (err) => {
//         if (err) throw err;
//         fs.unlinkSync(temporal)
//       })
//     })
//   })
// })

app.post("/api/adddoc", uploads.single("file"), (req, res) => {
  try {
    let body = req.body;
    let folio = req.body.folio;
    delete(body.folio)
    let lugarGuardar = __dirname + "/.temp/" + req.body.folio;
    let inputFS = fs.createReadStream(__dirname + "/.temp/" +req.file.filename)
    let outputFS = fs.createWriteStream(lugarGuardar)
    let key="abcabcabcabcabcabcabcabcabcabc12"
    let iv= "abcabcabcabcabc1"
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(cipher).pipe(outputFS)
    outputFS.on("finish", function() {
      fs.unlink(__dirname + "/.temp/" +req.file.filename, (err) => {
        if (err) throw err;
        let pair = {};
        pair.folio = folio;
        let fileToUpload = fs.readFileSync(lugarGuardar);
        pair.archivo = Binary(fileToUpload);
        let aInsertar = {...body, "archivos": [pair]};
        db.collection("docs").insertOne(aInsertar, (err,res) => {
          if (err) throw err;
          console.log("Guardado");
        })
        fs.unlinkSync(lugarGuardar);
      })
    })
      
    res.json({'message': "Data inserted correctly."});
  } catch (error) {
    res.status(500);
    res.json(error);
    console.log(error);
  }
  
})

app.post("/api/addpath", uploads.single("file"), (req, res) => {
  try {
    let body = req.body;
    let folio = req.body.folio;
    let nombre = req.body.nombre;
    let collection = req.body.docType;
    delete(body.folio)
    delete(body.docType)
    delete(body.nombre)
    let rutaDefinitiva = "/.storage/" + folio;
    let inputFS = fs.createReadStream(__dirname + "/.temp/" +req.file.filename)
    let outputFS = fs.createWriteStream(__dirname + rutaDefinitiva)
    let key="abcabcabcabcabcabcabcabcabcabc12"
    let iv= "abcabcabcabcabc1"
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(cipher).pipe(outputFS)
    outputFS.on("finish", () => {
      let pair = {};
      pair.folio = folio;
      pair.archivo = rutaDefinitiva;
      pair.nombre = nombre;
      fs.unlinkSync(__dirname + "/.temp/" +req.file.filename)
      let aInsertar = {...req.body, "archivos": [pair] };
      db.collection(collection).insertOne(aInsertar, (err,res) => {
        if (err) throw err;
        console.log("Guardado");
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
      let pair = {};
      pair.folio = req.body.folio;
      pair.archivo = rutaDefinitiva;
      fs.unlinkSync(__dirname + "/.temp/" +req.file.filename)
      db.collection("docs").updateOne({_id: req.body.docID}, {$push: { archivos: pair }}, (err, res) => {
        if (err) throw err;
        console.log("Agregado")
      })
    })
    res.json({'message': "Data updated correctly"})
  } catch (error) {
    res.status(500);
    res.json(error);
    console.log(error);
  }
})

app.get("/api/getDocs", async (req, res) => {
  try {
    const cursor = db.collection("docs").find();
    const data = await cursor.toArray();
    res.json(data);
    return data;
  } catch (error) {
    res.status(500);
    res.json(error);
    console.log(error);
  }
})

app.post("/api/getDocNames", async (request, response) => {
  try {
    let searchValue ={}
    if (request.body.docID != null) {
      searchValue = {"docID" : {$regex : request.body.docID}}
    }
    const cursor = db.collection("docs").find(searchValue, {projection: {"docID": 1}});
    const data = await cursor.toArray();
    response.json(data);
  } catch (error) {
    response.status(500);
    response.json(error);
    console.log(error);
  }
})

app.listen(5000, ()=>{
  connectToDB()
  connectToUserDB()
  console.log("Server started on port 5000........")
})