// Send the data to Mongo using an API
async function addDocument(formData, setFormData, file) {
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

async function getDocumentInfo(setData) {
  try {
    await fetch('api/getDocInfo', {
      method: "GET"
    })
      .then(response => response.json())
      .then(response => {
        console.log("GetDocInfo response: " + response);
        setData(response);
      })

  } catch (error) {
    console.log("ERROR at 'getDocumentInfo'");
    console.log(error);
    return [];
  } 
} 

async function getFilteredDoc(jQuery, setData) {
  try {
    await fetch('api/getFilteredDoc', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(jQuery)
    })
    .then(response => response.json())
    .then(response => {
        console.log("getFilteredDoc response: " + response);
        setData(response);
      })
  } catch (error) {
    console.log("ERROR at 'getFilteredDoc'");
    console.log(error);
    return [];
  } 
}

export { addDocument, getDocumentInfo, getFilteredDoc };