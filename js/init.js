const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

let user = sessionStorage.getItem("username");

function loginCheck() {
  let username = sessionStorage.getItem("username");
  let logButton = document.getElementById("loginbtn");

  if(username === null) {
    alert("Redireccionando a Login");
    location.href = "login.html";
  }
  else {
    logButton.id = "myprofilebtn";
    logButton.href = "";
    logButton.innerHTML =`
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        ${username}
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
        <li><a class="dropdown-item" href="#" id="logoutbtn">Cerrar sesión</a></li>
      </ul>
    </div>
    `
  }
}

//

document.addEventListener("DOMContentLoaded", ()=> {
  loginCheck();

   document.getElementById("logoutbtn").addEventListener("click", ()=> {
     sessionStorage.removeItem("username");
     location.href = "login.html"
   })
})