/* Code use to send data to Mongo using an API
Mateo Herrera Lavalle, A01751912
Gerardo Gutiérrez Paniagua, A01029422
Karla Mondragón Rosas, A01025108
Ana Paula Katsuda Zalce, A01025303
*/

// Function to add document
async function addDocument(formData, setFormData) {
  let formBody = new FormData(formData);
  // Fetch backend --> to add path
  try {
    await fetch('/api/addpath', {
      method: "POST",
      body: formBody
    })
      // Response
      .then(response => response.json())
      .then( async () => {
        // Fetch backend --> to add first folio
        await fetch('/api/addFirstFolio', {
          method: "POST",
          body: formBody
        })
          // Response
          .then(response => response.json())
          .then(response => {
            console.log("addDocument response: " + response);
            window.location.reload()
          })
      })
    setFormData({ reset: true });
    // Error
  } catch(error) {
    console.log("ERROR at 'addDocument'");
    console.log(error);
  }
}

// Send the data to Mongo using an API --> put document
async function putDocument(formData, setFormData) {
  let formBody = new FormData(formData);
  console.log(formBody);
  try {
    // Fetch backend --> add folio
    await fetch('/api/addfolio', {
      method: "PUT",
      body: formBody
    })
      // Response
      .then(response => response.json())
      .then(response => {
        console.log("addDocument response: " + response);
        window.location.reload()
      })
    setFormData({ reset: true });
    // Error
  } catch(error) {
    console.log("ERROR at 'addDocument'");
    console.log(error);
  }
}

// Post data to get documents 
async function getDocs(reqBody, setData) {
  try {
    // Fetch api --> get documents
    await fetch('/api/getDocs', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
      'docType': reqBody.docType, 
      'query': {"docID" : {$regex : reqBody.inputValue}},
      'projection': reqBody.projection}),
      method: "POST",
    })
      // Response
      .then(response => response.json())
      .then(response => {
        console.log("GetDocInfo response: " + response);
        setData(response);
      })
    // Error
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

// Function to add admin --> setup of app
async function setupAdmin(adminData){
  try {
    // Fetch endpoint, specifying method and request body
    await fetch('/api/setup', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        email: adminData.email, 
        password: adminData.password,
      })
    })
    // Response
      .then(response => response.json())
      .then(response => {
        console.log("AdminSetup response " + response);
        return response;
      })
    // error
  } catch (error) {
    console.log("ERROR at 'setupAdmin'");
    console.log(error);
    return [];
  } 
}

// Function to add users
async function addUser(userData){
  try {
    // Fetch endpoint, specifying method and request body
    await fetch('/api/register', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        usuario: userData.usuario, 
        email: userData.email, 
        password: userData.password, 
        repPassword: userData.repPassword,
        userType: userData.userType,
        nulidad: userData.nulidad,
        investigacion: userData.investigacion
      })
    })
    // Response
      .then(response => response.json())
      .then(response => {
        console.log("UserInfo response " + response);
        return response;
      })
    // error
  } catch (error) {
    console.log("ERROR at 'addUser'");
    console.log(error);
    return [];
  } 
}

// Function used to login user
async function logUser(userData){
  try {
    // Fetch endpoint, specifying method and request body
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
    // Response
      .then(response => response.json())
      .then(response => {
        console.log("UserInfo response " + response);
        return response;
      })
    // Error
  } catch (error) {
    console.log("ERROR at 'login'");
    console.log(error);
    return [];
  } 
}

// Function used to logout users
async function logout(){
  try {
    // Fetch endpoint, specifying method
    await fetch('/api/logout', {
      method: "GET",
    })
    // Response
      .then(response => response.json())
      .then(response => {
        console.log("Session deleted " + response);
        window.location.assign('/')
        return response;
      })
    // Error
  } catch (error) {
    console.log("ERROR at logout");
    console.log(error);
    return [];
  } 
}

// Function used to delete users from database
async function deleteUser(userData) 
{
  try {
    // Fetch endpoint, specifying method and request body
    await fetch('/api/deleteUser', {
      mode: 'cors',
      method: "DELETE",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        usuario: userData.usuario,
        email: userData.email, 
      })
    })
      // Response
      .then(response => response.json())
      .then(response => {
        window.location.assign('/')
        return response;
      })
    // Error
  } catch (error) {
    console.log("ERROR at 'Delete user'");
    console.log(error);
    return [];
  } 
}

// Function used to edit users in database
async function editUser(ogUserData, userData) 
{
  try {
    // Fetch endpoint, specifying method and request body
    await fetch('/api/editUser', {
      mode: 'cors',
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        // Get new and original user data
        usuario: userData.usuario,
        ogEmail: ogUserData.email,
        email: userData.email,
        nulidad: userData.nulidad,
        investigacion: userData.investigacion
      })
    })
      // Response
      .then(response => response.json())
      .then(response => {
        window.location.assign("/")
        return response;
      })
    // Error
  } catch (error) {
    console.log("ERROR at 'Edit User'");
    console.log(error);
    return [];
  } 
}

// Function used to change user password
async function changePass(userPassData) 
{
  // Fetch endpoint, specifying method and request body
  try {
    await fetch('/api/changePass', {
      mode: 'cors',
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ogEmail: userPassData.email,
        email: userPassData.email,
        ogPassword: userPassData.ogPassword,
        newPassword: userPassData.newPassword,
        repPassword: userPassData.repPassword
      })
    })
      // Response
      .then(response => response.json())
      .then(response => {
        window.location.assign("/")
        return response;
      })
    // Error
  } catch (error) {
    console.log("ERROR at 'Edit Password'");
    console.log(error);
    return [];
  } 
}

// Export functions
export { addDocument, putDocument, addUser, logUser, logout, deleteUser, editUser, changePass, setupAdmin};
