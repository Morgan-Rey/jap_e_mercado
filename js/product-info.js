let prodIDVar = "";
let productInfoData = "";
let productCommentsData = [];

function showProductInfo(productInfoData){
    let htmlContentToAppend = `
    <br>
    <h2>${productInfoData.name}</h2>
    <button class="btn btn-primary" onclick="addToCart(${productInfoData.id})">Comprar</button>
    <br>
    <hr>
    <h5 class="fw-bold">Precio</h5>
    <span>${productInfoData.currency} ${productInfoData.cost}</span><br><br>
    <h5 class="fw-bold">Descripción</h5>
    <span>${productInfoData.description}</span><br><br>
    <h5 class="fw-bold">Categoría</h5>
    <span>${productInfoData.category}</span><br><br>
    <h5 class="fw-bold">Cantidad vendidos</h5>
    <span>${productInfoData.soldCount}</span><br><br>
    <h5 class="fw-bold">Imágenes ilustrativas</h5><br>
    <div class="container text-center">
        <div class="row">
            <div class="col">
                <img class="img-thumbnail" style="width: 300px" src="${productInfoData.images[0]}">
            </div>
            <div class="col">
                <img class="img-thumbnail" style="width: 300px" src="${productInfoData.images[1]}">
            </div>
            <div class="col">
                <img class="img-thumbnail" style="width: 300px" src="${productInfoData.images[2]}">
            </div>
            <div class="col">
                <img class="img-thumbnail" style="width: 300px" src="${productInfoData.images[3]}">
            </div>
        </div>
    </div>
    <hr>`
    
    document.getElementById("product-info-container").innerHTML = htmlContentToAppend;
};

function showRelated(productInfoData){
    let previousProductID = productInfoData.id - 1;
    let nextProductID = productInfoData.id + 1;
    
    getJSONData(PRODUCT_INFO_URL + previousProductID + EXT_TYPE).then(function(resultObj){
        if(resultObj.status === "ok"){
            let previousProduct = resultObj.data;
            let htmlContentToAppend = `
            <div onclick="setProdID(${previousProduct.id})" class="img-thumbnail cursor-active" style="width: 310px; display: inline-block;">
                <h6 style="text-align: center; user-select: none;">${previousProduct.name} // ${previousProduct.currency}${previousProduct.cost}</h6>
                <img style="width: 300px" src="${previousProduct.images[0]}">
            </div>
            `
            document.getElementById("related-product-container").innerHTML += htmlContentToAppend;
        }
    }); 

    getJSONData(PRODUCT_INFO_URL + nextProductID + EXT_TYPE).then(function(resultObj){
        if(resultObj.status === "ok"){
            let nextProduct = resultObj.data;
            let htmlContentToAppend = `
            <div onclick="setProdID(${nextProduct.id})" class="img-thumbnail cursor-active" style="width: 310px; display: inline-block;">
            <h6 style="text-align: center; user-select: none;">${nextProduct.name} // ${nextProduct.currency}${nextProduct.cost}</h6>
                <img style="width: 300px" src="${nextProduct.images[0]}">
            </div>
            <hr>
            `
            document.getElementById("related-product-container").innerHTML += htmlContentToAppend;
        }
    });
}

function setProdID(id) {// copiada de products.js para que funcione el onclick de los productos relacionados
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}

function showComments(productCommentsData){
    let htmlContentToAppend = "";
    for(let i = 0; i < productCommentsData.length; i++){
        let comment = productCommentsData[i];
        htmlContentToAppend += `
        <li class="list-group-item">
        <span class="fw-bold text-wrap" style="color: #8000ff;">${comment.user}</span><span> - ${comment.dateTime} - </span><span>${makeMoons(comment.score)}</span><br>
        <span class="text-break">${comment.description}</span>
        </li>`
    }

    document.getElementById("product-comments-container").innerHTML = htmlContentToAppend;
}

function commentDate(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (month < 10){
        month = "0" + month;
    }
    let year = date.getFullYear();
    let hour = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let fullDate = year + "-" + month + "-" + day + " " + hour;

    return fullDate;
};

function makeMoons(score){
    let moons = "";
    for(let i = 1; i <= 5; i++){
        if(i <= score){
            //moons += "&#9899;";
            moons += `<i class="fas fa-moon" style="color: #8000FF;"></i>`
        }else{
            //moons += "&#9898;";
            moons += `<i class="far fa-moon" style="color: #222A"></i>`
        }
    }
    return moons;
}

function postComment(){
    //let allComments = productCommentsData; 
    let userComment = document.getElementById("commentBox");
    let userScore = "";
    let myComment = "";

    if(document.getElementById("radio1").checked){
        userScore = document.getElementById("radio1").value;
    }else if(document.getElementById("radio2").checked){
        userScore = document.getElementById("radio2").value;
    }else if(document.getElementById("radio3").checked){
        userScore = document.getElementById("radio3").value;
    }else if(document.getElementById("radio4").checked){
        userScore = document.getElementById("radio4").value;
    }else if(document.getElementById("radio5").checked){
        userScore = document.getElementById("radio5").value;
    };

    myComment = {
        "product": prodIDVar,
        "score": userScore,
        "description": userComment.value,
        "user": sessionStorage.getItem("username"),
        "dateTime": commentDate()
    }

    productCommentsData.push(myComment);
    localStorage.setItem("allComments", JSON.stringify(productCommentsData));
    //reseteando valores
    userComment.value = "";
    document.getElementById("sendCommentBtn").disabled = true;
    showComments(productCommentsData);
    document.getElementById("radio5").checked = "checked";
};

function addToCart(id) {
    localStorage.setItem("nuProduct", id);
    window.location = "cart.html";
}

// DOMContentLoaded

document.addEventListener("DOMContentLoaded", ()=>{
    localStorage.getItem("allComments");
    prodIDVar = localStorage.getItem("prodID");
    if(!(prodIDVar === null)){
        getJSONData(PRODUCT_INFO_URL + prodIDVar + EXT_TYPE).then(function(resultObj){
            if(resultObj.status === "ok"){
                productInfoData = resultObj.data;
                showProductInfo(productInfoData);
                showRelated(productInfoData);
            }
        });

        getJSONData(PRODUCT_INFO_COMMENTS_URL + prodIDVar + EXT_TYPE).then(function(resultObj){
            if(resultObj.status === "ok"){
                if((localStorage.getItem("allComments") === null) || !(resultObj.data[0].product === JSON.parse(localStorage.getItem("allComments"))[0].product)){
                    //esta es la manera en la que logre mantener los comentarios del usuario cuando se recarga la pagina. tiene sus limites, pero estoy contento por ahora =(UwU)=
                    //console.log("localStorage product: " + JSON.parse(localStorage.getItem("allComments"))[0].product); //esta linea rompe el programa si el json es null
                    localStorage.setItem("allComments", JSON.stringify(resultObj.data));
                    //console.log("resultObj product: " + resultObj.data[0].product);
                    console.log("Comentarios de json y localStorage son de productos diferentes, SE SOBREESCRIBIO el localStorage");
                }else{
                    console.log("Comentarios de json y localStorage (json + comentarios de usuario) son del mismo producto, NO SE SOBREESCRIBIO el localStorage");
                    console.log("Los comentarios deberian ser los del json + los del usuario");
                }

                productCommentsData = JSON.parse(localStorage.getItem("allComments"));
                showComments(productCommentsData);
            }
        });

    }else{
        window.location = "categories.html"
    }

    document.getElementById("commentBox").addEventListener("keyup", ()=>{
        if(document.getElementById("commentBox").value === ""){
            document.getElementById("sendCommentBtn").disabled = true;
        }else{
            document.getElementById("sendCommentBtn").disabled = false;
        }
    });

    document.getElementById("sendCommentBtn").addEventListener("click", function(){
        postComment();
    });
});