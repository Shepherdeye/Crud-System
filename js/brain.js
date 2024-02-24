let productName = document.getElementById("productName"),
    productCategory = document.getElementById("productCategory"),
    productPrice = document.getElementById("productPrice"),
    productDescription = document.getElementById("productDescription");

// localStorage.clear("Data");
if (localStorage.getItem("Data") == null) {
    var allProduct = [];

} else {
    allProduct = JSON.parse(localStorage.getItem("Data"));

}



function addProduct() {
    // alert("sayed")
    if (validateInput() == true &&
        validateCategory() == true &&
        validatePrice() == true &&
        validateDescription() == true) {

        let addprodoj = {
            ProName: productName.value,
            proCategory: productCategory.value,
            proPrice: productPrice.value,
            proDescription: productDescription.value
        }

        allProduct.push(addprodoj);

        localStorage.setItem("Data", JSON.stringify(allProduct));
        // console.log(allProduct);
        displayProduct();

        ClearValue()
        removeValidStyle()
    }
}

let tbody = document.getElementById("tbody");

function displayProduct() {
    let displayTable = "";
    for (let i = 0; i < allProduct.length; i++) {
        displayTable += `
        
        <tr>
        <td>${i + 1}</td>
        <td>${allProduct[i].ProName}</td>
        <td>${allProduct[i].proCategory}</td>
        <td>${allProduct[i].proPrice}</td>
        <td>${allProduct[i].proDescription}</td>
        <td><button onclick=deleteProduct(${i}) class=" btn btn-danger ">Delete</button> </td>
        <td><button onclick=updateProduct(${i})  class="btn btn-warning ">Update</button> </td>
    </tr>
        
        
        `
    }

    tbody.innerHTML = displayTable;

}
displayProduct();

// Search Function
let SearchInput = document.getElementById("search");

SearchInput.onkeyup = function () {
    // console.log(SearchInput.value)
    let result = "";
    for (let i = 0; i < allProduct.length; i++) {
        if (allProduct[i].ProName.includes(this.value)) {
            result += `
            
            
            <tr>
            <td>${i + 1}</td>
            <td>${allProduct[i].ProName.replace(`${this.value}`, `<span style="color: red; font-weight: bolder;">${this.value}</span>`)}</td>
            <td>${allProduct[i].proCategory}</td>
            <td>${allProduct[i].proPrice}</td>
            <td>${allProduct[i].proDescription}</td>
            <td><button onclick=deleteProduct(${i}) class=" btn btn-danger ">Delete</button> </td>
            <td><button onclick=updateProduct(${i})  class="btn btn-warning ">Update</button> </td>
        </tr>
            
            
            
            `



        } else {
            // console.log('no');
        }

        tbody.innerHTML = result;



    }





}


//delefunction

function deleteProduct(index) {
    // alert("hello")

    allProduct.splice(index, 1);

    localStorage.setItem("Data", JSON.stringify(allProduct));
    displayProduct()

}

let addBtn = document.getElementById("add");

// Update Function
function updateProduct(index) {

    productName.value = allProduct[index].ProName

    productCategory.value = allProduct[index].proCategory
    productPrice.value = allProduct[index].proPrice
    productDescription.value = allProduct[index].proDescription
    addBtn.innerHTML = "Update";
    addBtn.onclick = function () {

        allProduct[index].ProName = productName.value;
        allProduct[index].proCategory = productCategory.value;
        allProduct[index].proPrice = productPrice.value;
        allProduct[index].proDescription = productDescription.value;
        addBtn.innerHTML = "Add";
        localStorage.setItem("Data", JSON.stringify(allProduct));
        removeValidStyle();
        ClearValue();
      displayProduct();



    }


};


// clear  value 
function ClearValue() {



    productName.value = '';
    productCategory.value = '';
    productPrice.value = '';
    productDescription.value = '';





}
// function to  validate the  products
let alertName = document.getElementById("alertName");


function validateInput() {
    // name input validate
    var nammeRegex = /^[A-Z][a-z 0-9]{2,15}$/;
    let namevalidate = productName.value;



    if (nammeRegex.test(namevalidate)) {
        // console.log("yes");
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        alertName.classList.add("d-none");
        // addBtn.removeAttribute("disabled");




        return true;


    } else {
        // console.log("no");
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        alertName.classList.remove("d-none");
        // addBtn.setAttribute("disabled", "true");
        return false;






    }


};
// document.addEventListener("keyup", validateInput);

productName.addEventListener("keyup", validateInput);



// category validation 
let alertCategory = document.getElementById("alertCategory");

function validateCategory() {
    // name input validate
    var categoryRegex = /^[A-Z][a-z 0-9]{2,15}$/;
    let categoryvalidate = productCategory.value;
    if (categoryRegex.test(categoryvalidate)) {
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid");
        alertCategory.classList.add("d-none");
        return true;
    } else {
        productCategory.classList.remove("is-valid");
        productCategory.classList.add("is-invalid");
        alertCategory.classList.remove("d-none");
        return false;
    }
}
productCategory.addEventListener("keyup", validateCategory);


// Price validation 
let alertPrice = document.getElementById("alertPrice");

function validatePrice() {
    // name input validate
    var priceRegex = /^(?:[1-9][0-9]{2,3}|10000)$/;
    let pricevalidate = productPrice.value;
    if (priceRegex.test(pricevalidate)) {
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        alertPrice.classList.add("d-none");
        return true;
    } else {
        productPrice.classList.remove("is-valid");
        productPrice.classList.add("is-invalid");
        alertPrice.classList.remove("d-none");
        return false;
    }
}
productPrice.addEventListener("keyup", validatePrice);


// Description validation 
let alertDescription = document.getElementById("alertDescription");

function validateDescription() {
    // name input validate
    var DescriptionRegex = /^[A-Z][a-z 0-9]{2,40}$/;
    let Descriptionvalidate = productDescription.value;
    if (DescriptionRegex.test(Descriptionvalidate)) {
        productDescription.classList.add("is-valid");
        productDescription.classList.remove("is-invalid");
        alertDescription.classList.add("d-none");
        return true;
    } else {
        productDescription.classList.remove("is-valid");
        productDescription.classList.add("is-invalid");
        alertDescription.classList.remove("d-none");
        return false;
    }
}
productDescription.addEventListener("keyup", validateDescription);

// remove  style  after validation 
function removeValidStyle(){
    productName.classList.remove("is-valid");
    productCategory.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productDescription.classList.remove("is-valid");
   

}
