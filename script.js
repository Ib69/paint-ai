// Change YOUR_KEY by the OpenAI key that you get in https://platform.openai.com/account/api-keys
// If you dont have any key, create an account then create a new key.
const OPENAI_API_KEY = "YOUR_KEY"

window.onload=function(){
    // This is to bring the button and add a envent listener, so when it get clicked it will execute the paint function
    const monBouton = document.getElementById('bpaint');
    monBouton.addEventListener('click', paint)
}

function paint() {
// Get the content of the textarea
const textarea = document.getElementById("daPhrase");
const phrase = textarea.value;

// Log the Phrase to be sure that all is working
console.log(phrase);

const url = "https://api.openai.com/v1/images/generations"

// Data to send to the API
const donnees = {
  prompt: phrase,
  n: 1,
  size: '512x512'
};

// HTTP request options
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  },
  body: JSON.stringify(donnees)
};

// Send HTTP request to DALL-E API
fetch(url, options)
  .then(response => response.json())
  .then(response => {

    // conImage is the white frame that will contain the image
    const conImage = document.getElementById('conteneur-image');

    // To create a img tag
    const img = document.createElement('img');
    
    // This will put in the image url in the SRC section of the image tag
    img.src = response.data[0].url;

    // This is to clear the old frame before puting a new image in it
    conImage.innerHTML = "";

    // To finally put the new image in the frame
    conImage.appendChild(img);

  }).catch(error => console.error(error));

// This is the clear the textarea
textarea.value = "";
}
