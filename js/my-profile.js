// validacion de bootstrap

(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

// funciones

let retrievedProfile = "";
let primerNombre = document.getElementById("primer-nombre");
let segundoNombre = document.getElementById("segundo-nombre");
let primerApellido = document.getElementById("primer-apellido");
let segundoApellido = document.getElementById("segundo-apellido");
let email = sessionStorage.getItem("username");
let telefono = document.getElementById("telefono");

function saveChanges() {
    if (primerNombre.value == "" || primerApellido.value == "" || telefono.value == "") {
        //no sucede nada
    } else {
        perfilData = {
            "primerNombre": primerNombre.value,
            "segundoNombre": segundoNombre.value,
            "primerApellido": primerApellido.value,
            "segundoApellido": segundoApellido.value,
            "e-mail": email,
            "telefono": telefono.value
        }
        sessionStorage.setItem("userProfile", JSON.stringify(perfilData))
    }
}

// DOMContentLoaded

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("e-mail").value = sessionStorage.getItem("username");

    if (sessionStorage.getItem("userProfile") !== null) {
        retrievedProfile = JSON.parse(sessionStorage.getItem("userProfile"));
        primerNombre.value = retrievedProfile.primerNombre;
        segundoNombre.value = retrievedProfile.segundoNombre;
        primerApellido.value = retrievedProfile.primerApellido;
        segundoApellido.value = retrievedProfile.segundoApellido;
        telefono.value = retrievedProfile.telefono;
    } else {
        //no sucede nada en particular, los campos siguen vacios
    }

    document.getElementById("btn-submit").addEventListener("click", () => {
        saveChanges();
    })
})