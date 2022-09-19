const express = require("express")
const fs = require("fs")
const bodyparser = require("body-parser")
const multer = require("multer")
const crypto = require("crypto")
const {MongoClient} = require("mongodb")

const app = express();
app.use(bodyparser.urlencoded({extended:true}))
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
    let rutaDefinitiva = "/.storage/" + req.file.filename;
    let inputFS = fs.createReadStream(__dirname + "/.temp/" +req.file.filename)
    let outputFS = fs.createWriteStream(__dirname + rutaDefinitiva)
    let key="abcabcabcabcabcabcabcabcabcabc12"
    let iv= "abcabcabcabcabc1"
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    inputFS.pipe(cipher).pipe(outputFS)
    outputFS.on("finish", () => {
      fs.unlinkSync(__dirname + "/.temp/" +req.file.filename)
      let aInsertar = {...req.body, "file": rutaDefinitiva};
      db.collection("docs").insertOne(aInsertar, (err,res) => {
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

app.listen(5000, ()=>{
  connectToDB()
  console.log("Server started on port 5000........")
})