function login(){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    if(username === "" || password === ""){
        alert("Ingrese usuario y contraseña!")
    } else {
        sessionStorage.setItem("username", username); // por ahora solo se guarda el nombre de usuario, lo cambiaré más tarde cuando sea necesario
        location.href = "index.html";
    }
}

function loginCheck() {
    let username = sessionStorage.getItem("username");
    let accButton = document.getElementById("newaccbtn");
    let logButton = document.getElementById("loginbtn");
  
    if(username === null) {
      alert("Redireccionando a Login")
      location.href = "login.html"
    }
    else {
      accButton.id = "myprofilebtn";
      accButton.href = "my-profile.html";
      accButton.innerHTML = username;
  
      logButton.id = "logoutbtn"
      logButton.innerHTML = "Logout";
    }
  }

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("login_btn").addEventListener("click", ()=>{
        login();
    })
})