let cartItems = "";
let newestProduct = "";
let deliveryTypes = document.getElementsByName("envio");

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

function showCartItems(cartItems) {
    let htmlContentToAppend = "";

    for (let i = 0; i < cartItems.length; i++) {
        let cartItemsIndex = cartItems[i];
        htmlContentToAppend = `
        <tr>
            <td><img src="${cartItemsIndex.image}" style="width: 60px;"></td>
            <td>${cartItemsIndex.name}</td>
            <td>${cartItemsIndex.currency} <span class="unitCost">${cartItemsIndex.unitCost}</span></td>
            <td><input onchange="doMath()" type="number" id="countInput${i}" value="${cartItemsIndex.count}" min="1" max="99" class="form-control quantity" style="width: 60px; -moz-appearance:textfield;"></td>
            <td style="font-weight: bold;">${cartItemsIndex.currency} <span id="subtotal${i}" class="itemSubtotal">${cartItemsIndex.unitCost}</span></td>
        </tr>
    `
    }

    document.getElementById("cartItemsHTML").innerHTML = htmlContentToAppend;

    doMath();
}

function doMath() {
    let articleUnitCost = document.getElementsByClassName("unitCost");
    let currentArticleCount = document.getElementsByClassName("quantity");
    let articleSubtotalInnerHTML = document.getElementsByClassName("itemSubtotal");
    let subtotal = 0;
    //let allSubtotal = 0;

    for (let i = 0; i < articleUnitCost.length; i++) {
        subtotal += parseInt(articleUnitCost[i].innerHTML) * parseInt(currentArticleCount[i].value);
        articleSubtotalInnerHTML[i].innerHTML = subtotal;
        document.getElementById("finalSubtotal").innerHTML = subtotal;
    }

    let deliveryCost = 0;

    for (let j = 0; j < deliveryTypes.length; j++) {
        if (deliveryTypes[j].checked) {
            deliveryCost = Math.round(subtotal * deliveryTypes[j].value);
        }
    }

    if (deliveryCost !== 0) {
        document.getElementById("deliverySelect").innerHTML = deliveryCost;

    } else {
        document.getElementById("deliverySelect").innerHTML = "Seleccione un tipo de envío";
    }

    document.getElementById("finalTotal").innerHTML = subtotal + deliveryCost;
}

function validity(){
    let boolean = true;

    if ((!document.getElementsByName("forma")[0].checked) || (!document.getElementsByName("forma")[1].checked)) {
        boolean = false;
        document.getElementById("formaWarning").style.display = "inline";
    } else {
        document.getElementById("formaWarning").style.display = "none";
    }

    console.log("validity() check!")
    return boolean;
}

// DOMContentLoaded

document.addEventListener("DOMContentLoaded", () => {
    newestProduct = localStorage.getItem("nuProduct");

    getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            localStorage.setItem("allCartItems", JSON.stringify(resultObj.data.articles));
            console.log("El JSON fue cargado en allCartItems");
            cartItems = JSON.parse(localStorage.getItem("allCartItems"));
            console.log("allCartItems fue cargado en cartItems");
            showCartItems(cartItems);
        } else {
            document.getElementById("table-container").innerHTML = `
                <h2 style="width: 666px; margin-left: auto; margin-right: auto;">El Carrito de compras se encuentra vacío</h2>`
        }
    });

    for (let i = 0; i < deliveryTypes.length; i++) {
        deliveryTypes[i].addEventListener('click', () => {
            doMath();
        })
    }

    // document.getElementById('formMaster').addEventListener('submit', e=>{
    //     if(!validity() || !this.checkValidity()){
    //         e.preventDefault();
    //         e.stopPropagation();
    //         console.log("test!")
    //     }

    //     document.body.classList.add('was-validated');

    // });

    document.getElementById("btn-submit").addEventListener("click", () => {
        if ((!document.getElementsByName("envio")[0].checked) || (!document.getElementsByName("envio")[1].checked)) {
            document.getElementById("formaWarning").style.display = "inline";
        } else {
            document.getElementById("formaWarning").style.display = "hidden";
        }

        // if (document.getElementById("finalSubtotal").innerHTML === 0){
        //     preventDefault();
        //     stopPropagation();
        // }
    })

    document.getElementById("formaCredito").addEventListener("click", () => {
        document.getElementById("tarjetaNumero").disabled = false;
        document.getElementById("tarjetaVencimiento").disabled = false;
        document.getElementById("tarjetaCodigo").disabled = false;

        document.getElementById("bancariaNumero").disabled = true;
    });

    document.getElementById("formaBancaria").addEventListener("click", () => {
        document.getElementById("tarjetaNumero").disabled = true;
        document.getElementById("tarjetaVencimiento").disabled = true;
        document.getElementById("tarjetaCodigo").disabled = true;

        document.getElementById("bancariaNumero").disabled = false;
    });
})