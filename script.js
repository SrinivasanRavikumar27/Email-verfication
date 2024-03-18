function emailVerification() {
  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };

  const emailInput = document.getElementsByClassName('email')[0];
  const email = emailInput.value;

  console.log(email);

  fetch(`https://api.eva.pingutil.com/email?email=${email}`, requestOptions)
      .then(response => response.json())  // Parse the response as JSON
      .then(result => {
          console.log(result);
          emailInput.value = "";

          displayResult(result);  // Call the resultDiv function with the parsed JSON result
      })
      .catch(error => console.log('error', error));
}

function displayResult(result) {
  const data = result.data;

  let div = document.createElement("div");

  if (result.status == "success") {
      div.className = "valid-email";
      div.innerHTML = `This is a valid email address.`;

      let ulTag = document.createElement('ul');
      for (let key in data) {
          let liTag = document.createElement('li');
          liTag.appendChild(document.createTextNode(`${key}: ${data[key]}`));
          ulTag.appendChild(liTag);
      }

      div.appendChild(ulTag);
  } else {
      div.className = "invalid-email";
      div.innerHTML = `Invalid email entered!`;
  }

  var resultDiv = document.getElementById('resultDiv');
  resultDiv.innerHTML = ''; // Clear previous result
  resultDiv.appendChild(div);
}

let divTag1 = document.createElement('div');
divTag1.setAttribute("class", "displayDiv");

let h1Tag = document.createElement('h1');
h1Tag.innerHTML = "E-mail Verification";

let divTag2 = document.createElement('div');

let labelTag = document.createElement('label');
labelTag.setAttribute("for", "email");
labelTag.innerHTML = "Please enter your e-mail address below to verify it.";

let inputTag = document.createElement('input');
inputTag.type = "email";
inputTag.className = "email";

let submitButton = document.createElement('button');
submitButton.type = "button";
submitButton.innerHTML = 'Submit';
submitButton.onclick = emailVerification;

divTag2.append(labelTag, inputTag, submitButton);

divTag1.append(h1Tag, divTag2);

document.body.append(divTag1);

var resultDiv = document.createElement('div');
resultDiv.setAttribute("id", "resultDiv");
document.body.appendChild(resultDiv);
