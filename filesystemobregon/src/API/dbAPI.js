// Send the data to Mongo using an API
export default async function addDocument(formData, setFormData, file) {
  // console.log("'addDocument' QUERY: " + JSON.stringify(formData));
  let formBody = new FormData(formData);
  // let formFile = new FormData();
  // formFile.append("file", file);
  // formBody.append("file", file);
  // console.log(formBody.get("fileName"));
  // formBody.append("formData", JSON.stringify(formData));

  try {
    await fetch('/api/addpath', {
      method: "POST",
      // headers: {
      //   "content-type": "application/json",
      //   "accept": "application/json"
      // },
      body: formBody
    })
      .then(response => response.json())
      .then(response => {
        console.log("addDocument response: " + response);
      })
    setFormData({ reset: true });
  } catch(error) {
    console.log("ERROR at 'addDocument'");
    console.log(error);
  }
}

async function getDocumentInfo(formData) {
  let formBody = new formData(formData)
  try {
    await fetch('api/getDocInfo', {
      method: "GET",
      body: formBody
    })
      .then(response => response.json())
      .then(response => {
        console.log("GetDocInfo Response: " + response);
      })  
  } catch (error) {
    console.log("ERROR at 'addDocument'");
    console.log(error);
  } 
}