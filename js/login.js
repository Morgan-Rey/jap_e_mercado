function login(){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    if(username === "" || password === ""){
        alert("Ingrese usuario y contraseña!")
    } else {
        sessionStorage.setItem("username", username);
        location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("login_btn").addEventListener("click", ()=>{
        login();
    })
})