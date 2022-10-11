const express = require("express")
const fs = require("fs")
const bodyparser = require("body-parser")
const multer = require("multer")
const crypto = require("crypto")
const {MongoClient, Binary, ObjectId} = require("mongodb")

const app = express();
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
app.set("view-engine", "ejs")
const uploads = multer({dest:".temp"})

let db;

function connectToDB() {
  let client = new MongoClient("mongodb://127.0.0.1:27017/AOFILES")
  client.connect()
  console.log("Conectado mongo");
  db = client.db()
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
        let Folio = {};
        Folio.folio = folio;
        let fileToUpload = fs.readFileSync(lugarGuardar);
        Folio.archivo = Binary(fileToUpload);
        let aInsertar = {...body, "archivos": [Folio]};
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
    // let folio = req.body.folio;
    // let nombre = req.body.nombre;
    let collection = req.body.docType;
    delete(body.folio)
    delete(body.docType)
    delete(body.nombre)

    db.collection(collection).insertOne(body, (err,res) => {
      if (err) throw err;
      console.log("Expediente Guardado");
    })
    res.json({'message': "Data inserted correctly."});

    // const cursor = db.collection(collection).find({docID: docID}, {projection: {"_id": 1}});
    // const data = await cursor.toArray();
    // console.log(data)

  //   let rutaDefinitiva = "/.storage/" + folio;
  //   let inputFS = fs.createReadStream(__dirname + "/.temp/" +req.file.filename)
  //   let outputFS = fs.createWriteStream(__dirname + rutaDefinitiva)
  //   let key="abcabcabcabcabcabcabcabcabcabc12"
  //   let iv= "abcabcabcabcabc1"
  //   let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
  //   inputFS.pipe(cipher).pipe(outputFS)
  //   outputFS.on("finish", () => {
  //     let Folio = {};
  //     Folio.folio = folio;
  //     Folio.archivo = rutaDefinitiva;
  //     Folio.nombre = nombre;
  //     Folio.expedienteID = data[0]._id
  //     fs.unlinkSync(__dirname + "/.temp/" +req.file.filename)
  //     db.collection("folios").insertOne(Folio, (err,res) => {
  //       if (err) throw err;
  //       console.log("Folio Guardado");
  //     })
  //   })
  //   res.json({'message': "Data inserted correctly."});
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

app.get("/api/getDocs", async (req, res) => {
  try {
    const cursor = db.collection("docs").find();
    const data = await cursor.toArray();
    res.json(data);
  } catch (error) {
    res.status(500);
    res.json(error);
    console.log(error);
  }
})

app.post("/api/getDocNames", async (request, response) => {
  try {
    let searchValue = {}
    if (request.body.docID != null) {
      searchValue = {"docID" : {$regex : request.body.docID}}
    }
    const cursor = db.collection(request.body.docType).find(searchValue, {projection: {"docID": 1}});
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
  console.log("Server started on port 5000........")
})