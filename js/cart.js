let cartItems = "";

function showCartItems(cartItems){
    let articleImage = cartItems.articles[0].image;
    let articleName = cartItems.articles[0].name;
    let articleCurrency = cartItems.articles[0].currency;
    let articleUnitCost = cartItems.articles[0].unitCost;
    let articleCount = cartItems.articles[0].count;

    // se que tiene que haber un loop pero no la quiero complicar todavia, vamos de a poquito
    htmlContentToAppend = `
        <tr>
            <td><img src="${articleImage}" style="width: 60px;"></td>
            <td>${articleName}</td>
            <td>${articleCurrency} ${articleUnitCost}</td>
            <td><input onchange="updateSubtotal()" type="number" id="countInput" value="${articleCount}" min="1" class="form-control" style="width: 60px; -moz-appearance:textfield;"></td>
            <td style="font-weight: bold;">${articleCurrency} <span id="subtotal">${articleUnitCost}</span></td>
        </tr>
    `

    document.getElementById("thing").innerHTML = htmlContentToAppend;
}

function updateSubtotal(){
    let currentArticleCount = document.getElementById("countInput").value;
    let subtotalInnerHTML = document.getElementById("subtotal");
    let articleUnitCost = cartItems.articles[0].unitCost;
    
    subtotalInnerHTML.innerHTML = currentArticleCount * articleUnitCost;
}

// DOMContentLoaded

document.addEventListener("DOMContentLoaded", ()=> {
    getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then(function(resultObj){
        if(resultObj.status === "ok"){
            cartItems = resultObj.data;
            showCartItems(cartItems);
        }
    });
})