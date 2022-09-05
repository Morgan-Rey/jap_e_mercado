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

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("login_btn").addEventListener("click", ()=>{
        login();
    })
})