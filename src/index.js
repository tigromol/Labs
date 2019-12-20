require("./styles/style.css");
const axios = require('axios');

function addElement (name) { 
    var newDiv = document.createElement("div"); 
    var newContent = document.createTextNode(name); 
    newDiv.appendChild(newContent);  
    newDiv.className = "repo";
    var currentDiv = document.getElementById("repos");
    currentDiv.appendChild(newDiv);
}

function getRepos() {
    let elements = document.getElementsByClassName('repo');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    const user = document.getElementById('user').value;
    axios.get(`https://api.github.com/users/${user}/repos`, {timeout: 1500})
    .then((response) => {
        for (let repo of response.data) {
            addElement(repo.html_url);
        }
    })
    .catch((error) => {
        addElement(error.response.status);
    });
}

window.getRepos = getRepos;
