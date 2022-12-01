let prodIDVar = "";
let productInfoData = "";
let productCommentsData = [];

function showProductInfo(productInfoData) {
    let htmlContentToAppend = `
    <br>
    <h2>${productInfoData.name}</h2>
    <button class="btn btn-primary" onclick="addToCart(${productInfoData.id})">Comprar</button>
    <br>
    <hr>
    <div class="row">
        <div class="col">
            <h5 class="fw-bold">Precio</h5>
            <span>${productInfoData.currency} ${productInfoData.cost}</span><br><br>
            <h5 class="fw-bold">Descripción</h5>
            <span>${productInfoData.description}</span><br><br>
            <h5 class="fw-bold">Categoría</h5>
            <span>${productInfoData.category}</span><br><br>
            <h5 class="fw-bold">Cantidad vendidos</h5>
            <span>${productInfoData.soldCount}</span><br><br>
        </div>
        <div class="col">
            <div id="carousel" class="carousel carousel-dark slide border rounded" data-bs-ride="true">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="${productInfoData.images[0]}" class="d-block w-100" alt="Imagen 1">
                    </div>
                    <div class="carousel-item">
                        <img src="${productInfoData.images[1]}" class="d-block w-100" alt="Imagen 2">
                    </div>
                    <div class="carousel-item">
                        <img src="${productInfoData.images[2]}" class="d-block w-100" alt="Imagen 3">
                    </div>
                    <div class="carousel-item">
                        <img src="${productInfoData.images[3]}" class="d-block w-100" alt="Imagen 4">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
    
    <hr>`

    document.getElementById("product-info-container").innerHTML = htmlContentToAppend;
};

function showRelated(productInfoData) {
    let relatedProducts = productInfoData.relatedProducts;
    let htmlContentToAppend = "";

    for (let i = 0; i < relatedProducts.length; i++) {
        htmlContentToAppend += `
        <div onclick="setProdID(${relatedProducts[i].id})" class="img-thumbnail cursor-active" style="width: 310px; display: inline-block;">
            <h6 style="text-align: center; user-select: none;">${relatedProducts[i].name}</h6>
            <img style="width: 300px" src="${relatedProducts[i].image}">
        </div>`
    }

    document.getElementById("related-product-container").innerHTML = htmlContentToAppend;
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}

function showComments(productCommentsData) {
    let htmlContentToAppend = "";
    for (let i = 0; i < productCommentsData.length; i++) {
        let comment = productCommentsData[i];
        htmlContentToAppend += `
        <li class="list-group-item">
        <span class="fw-bold text-wrap" style="color: #8000ff;">${comment.user}</span><span> - ${comment.dateTime} - </span><span>${makeMoons(comment.score)}</span><br>
        <span class="text-break">${comment.description}</span>
        </li>`
    }

    document.getElementById("product-comments-container").innerHTML = htmlContentToAppend;
}

function commentDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let year = date.getFullYear();
    let hour = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let fullDate = year + "-" + month + "-" + day + " " + hour;

    return fullDate;
};

function makeMoons(score) {
    let moons = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            //moons += "&#9899;";
            moons += `<i class="fas fa-moon" style="color: #8000FF;"></i>`
        } else {
            //moons += "&#9898;";
            moons += `<i class="far fa-moon" style="color: #222A"></i>`
        }
    }
    return moons;
}

function postComment() {
    let userComment = document.getElementById("commentBox");
    let userScore = "";
    let myComment = "";

    if (document.getElementById("radio1").checked) {
        userScore = document.getElementById("radio1").value;
    } else if (document.getElementById("radio2").checked) {
        userScore = document.getElementById("radio2").value;
    } else if (document.getElementById("radio3").checked) {
        userScore = document.getElementById("radio3").value;
    } else if (document.getElementById("radio4").checked) {
        userScore = document.getElementById("radio4").value;
    } else if (document.getElementById("radio5").checked) {
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

document.addEventListener("DOMContentLoaded", () => {
    localStorage.getItem("allComments");
    prodIDVar = localStorage.getItem("prodID");
    if (!(prodIDVar === null)) {
        getJSONData(PRODUCT_INFO_URL + prodIDVar + EXT_TYPE).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productInfoData = resultObj.data;
                showProductInfo(productInfoData);
                showRelated(productInfoData);
            }
        });

        getJSONData(PRODUCT_INFO_COMMENTS_URL + prodIDVar + EXT_TYPE).then(function (resultObj) {
            if (resultObj.status === "ok") {
                if ((localStorage.getItem("allComments") === null) || !(resultObj.data[0].product === JSON.parse(localStorage.getItem("allComments"))[0].product)) {
                    localStorage.setItem("allComments", JSON.stringify(resultObj.data));
                    console.log("Comentarios de json y localStorage son de productos diferentes, SE SOBREESCRIBIO el localStorage");
                } else {
                    console.log("Comentarios de json y localStorage (json + comentarios de usuario) son del mismo producto, NO SE SOBREESCRIBIO el localStorage");
                    console.log("Los comentarios deberian ser los del json + los del usuario");
                }

                productCommentsData = JSON.parse(localStorage.getItem("allComments"));
                showComments(productCommentsData);
            }
        });

    } else {
        window.location = "categories.html"
    }

    document.getElementById("commentBox").addEventListener("keyup", () => {
        if (document.getElementById("commentBox").value === "") {
            document.getElementById("sendCommentBtn").disabled = true;
        } else {
            document.getElementById("sendCommentBtn").disabled = false;
        }
    });

    document.getElementById("sendCommentBtn").addEventListener("click", function () {
        postComment();
    });
});