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

async function addUser(userData){
  try {
    await fetch('/api/register', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        usuario: userData.usuario, 
        email: userData.email, 
        password: userData.password, 
        repPassword: userData.repPassword,
        userType: userData.userType,
        area: userData.area
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log("UserInfo response " + response);
        return response;
      })
  } catch (error) {
    console.log("ERROR at 'addUser'");
    console.log(error);
    return [];
  } 
}

async function logUser(userData){
  try {
    await fetch('/api/login', {
      mode: 'cors',
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      withCredentials: 'true',
      credentials: 'include',
      body: JSON.stringify({
        email: userData.email, 
        password: userData.password, 
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log("UserInfo response " + response);
        return response;
      })
  } catch (error) {
    console.log("ERROR at 'getDocumentNames'");
    console.log(error);
    return [];
  } 
}

async function logout(){
  try {
    await fetch('/api/logout', {
      method: "GET",
    })
      .then(response => response.json())
      .then(response => {
        console.log("Session deleted " + response);
        window.location.assign('/')
        return response;
      })
  } catch (error) {
    console.log("ERROR at logout");
    console.log(error);
    return [];
  } 
}

export { addDocument, getDocumentInfo, putDocument, addUser, logUser, logout};
