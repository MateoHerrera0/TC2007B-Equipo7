// Send the data to Mongo using an API
async function addDocument(formData, setFormData) {
  let formBody = new FormData(formData);

  try {
    await fetch('/api/addpath', {
      method: "POST",
      body: formBody
    })
      .then(response => response.json())
      .then( async () => {
        await fetch('/api/addFirstFolio', {
          method: "POST",
          body: formBody
        })
          .then(response => response.json())
          .then(response => {
            console.log("addDocument response: " + response);
            window.location.reload()
          })
      })
    setFormData({ reset: true });
  } catch(error) {
    console.log("ERROR at 'addDocument'");
    console.log(error);
  }
}

// Send the data to Mongo using an API
async function putDocument(formData, setFormData) {
  let formBody = new FormData(formData);
  console.log(formBody);

  try {
    await fetch('/api/addfolio', {
      method: "PUT",
      body: formBody
    })
      .then(response => response.json())
      .then(response => {
        console.log("addDocument response: " + response);
        window.location.reload()
      })
    setFormData({ reset: true });
  } catch(error) {
    console.log("ERROR at 'addDocument'");
    console.log(error);
  }
}

async function getDocumentInfo(setData) {
  try {
    await fetch('api/getDocs', {
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

// async function getDocNames(setData) {
//   try {
//     await fetch('/api/getDocNames', {
//       method: "GET",
//     })
//       .then(response => response.json())
//       .then(response => {
//         console.log("GetDocInfo response: " + response);
//         setData(response.map(({_id: value, docID: label})=>({value,label})));
//         return response;
//       })

//   } catch (error) {
//     console.log("ERROR at 'getDocumentNames'");
//     console.log(error);
//     return [];
//   } 
// } 

export { addDocument, getDocumentInfo, putDocument};