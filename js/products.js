const ORDER_ASC_BY_COST = "+$";
const ORDER_DESC_BY_COST = "-$";
const ORDER_BY_PROD_SOLD = "Amount Sold";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

            htmlContentToAppend += `
            <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>${product.name} - ${product.cost} ${product.currency}</h4> 
                            <p>${product.description}</p> 
                            </div>
                            <small class="text-muted">${product.soldCount} artículos vendidos</small> 
                        </div>

                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, array){
    currentSortCriteria = sortCriteria;

    if(array != undefined){
        currentProductsArray = array;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList(currentProductsArray);
}

// function searchProducts(array){//en desarrollo
//     let searchValue = document.getElementById("searchBox").value.toLowerCase();
//     console.log(searchValue);

//     for(let i = 0; i < array.length; i++){
//         let product = array[i];

//         if((!product.name.includes(searchValue)) || (!product.description.includes(searchValue))){
//             showProductsList();
//         }else{
//             showProductsList();
//         }
//     }
// }

function clearFilter() {
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductsList(currentProductsArray);
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}

document.addEventListener("DOMContentLoaded", ()=> {
    let catIdVar = localStorage.getItem("catID");
    if (!(catIdVar === null)) {
        getJSONData(PRODUCTS_URL + catIdVar + EXT_TYPE).then(function(resultObj){// modificado para que agarre cualquier categoria
            if (resultObj.status === "ok") {
                document.getElementById("cat-name").innerHTML = resultObj.data.catName;
                currentProductsArray = resultObj.data.products;
                showProductsList(currentProductsArray);
            }
        });
    } else {
        window.location = "categories.html"//asegurandome que el usuario no pueda entrar a products.html sin clickear una categoria primero
    }

    //sorts of sorts ;)

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    //filtros

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        };

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }else{
            maxCost = undefined;
        };

        showProductsList(currentProductsArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        clearFilter();
    });

    // document.getElementById("searchBox").addEventListener("keyup", ()=>{//en desarrollo
    //     searchProducts(currentProductsArray);
    // })
});