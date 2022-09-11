// Send the data to Mongo using an API
export default async function addDocument(formData, setFormData) {
  console.log("'addDocument' QUERY: " + JSON.stringify(formData));
  try {
    await fetch('/api/adddoc', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(formData)
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