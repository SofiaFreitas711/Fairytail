login();
onLoadCartNumbers();
displayCart();
removeProduct();


let cart = document.querySelectorAll(".comprar");
let produtoID = cart[0].getAttribute("id")

let produtos = [
    {
        name: "Coleira Rucs",
        tag: "coleira",
        price: 13.99,
        inCart: 0
    },
    {
        name: "Trela Mis",
        tag: "trela",
        price: 14.99,
        inCart: 0
    },
    {
        name: "Bola Lucks",
        tag: "bola",
        price: 10.99,
        inCart: 0
    }
];

cart[0].addEventListener("click", () => {
    cartNumbers(produtos[produtoID]);
    totalCost(produtos[produtoID])
})

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers) {
        document.querySelector("#comprar-counter").textContent = productNumbers
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem("cartNumbers");
    let quantidadeSelected = document.getElementsByClassName("selected")
    quantidadeSelected = parseInt(quantidadeSelected[0].innerHTML)
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + quantidadeSelected);
        document.querySelector("#comprar-counter").textContent = productNumbers + quantidadeSelected
    } else {
        localStorage.setItem("cartNumbers", quantidadeSelected);
        document.querySelector("#comprar-counter").textContent = quantidadeSelected
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart")
    let quantidadeSelected = document.getElementsByClassName("selected")
    quantidadeSelected = parseInt(quantidadeSelected[0].innerHTML)
    cartItems = JSON.parse(cartItems)

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += quantidadeSelected
    } else {
        product.inCart = quantidadeSelected;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");
    let quantidadeSelected = document.getElementsByClassName("selected")
    quantidadeSelected = parseInt(quantidadeSelected[0].innerHTML)

    if (cartCost != null) {
        cartCost = parseFloat(cartCost);
        console.log(cartCost);
        localStorage.setItem("totalCost", cartCost + (product.price * quantidadeSelected));
    } else {
        localStorage.setItem("totalCost", product.price * quantidadeSelected);
    }
}

function displayCart() {
    let precoTotal = document.querySelector("#precoTotal")
    let LSprecoTotal = localStorage.getItem("totalCost")
    let precoIVA = document.querySelector("#precoIVA")
    let precoProduto = document.querySelector("#precoProduto")
    let cartItems = localStorage.getItem("productsInCart");
    let produtosCont = document.querySelector("#produtos");

    cartItems = JSON.parse(cartItems)

    if (cartItems && produtosCont) {
        produtosCont.innerHTML = "";
        Object.values(cartItems).map(item => {
            produtosCont.innerHTML += `
            <div class="itemContainer">
                <div class="nomeContainer">
                    <img class="imgProduto" src="./img/${item.tag}.png">
                    <p class="itemNome">${item.name}</p>
                </div>
                <p class="itemQuantidade">${item.inCart}</p>
                <p class="itemPreco">${item.inCart * item.price}€</p>
                <ion-icon name="trash-outline" id="trash${item.tag}"></ion-icon>
            </div>
            `
        });
        precoTotal.innerHTML = LSprecoTotal + "€"
        precoProduto.innerHTML = (LSprecoTotal * 0.77).toFixed(2) + "€"
        precoIVA.innerHTML = (LSprecoTotal * 0.23).toFixed(2) + "€"
    }
}

function removeProduct() {
    let trash = document.getElementsByTagName("ion-icon")

    for (let i = 0; i < trash.length; i++) {
        trash[i].addEventListener("click", () => {
            let cartItems = localStorage.getItem("productsInCart");
            let totalCost = localStorage.getItem("totalCost")
            let string = trash[i].id
            let cartNumbers = localStorage.getItem("cartNumbers")

            string = string.substring("trash".length)
            cartItems = JSON.parse(cartItems)
            let novoTotalCost = Math.round((totalCost - parseFloat(parseFloat(cartItems[string].price) * parseInt(cartItems[string].inCart))) * 100) / 100
            localStorage.setItem("totalCost", novoTotalCost)
            localStorage.setItem("cartNumbers", cartNumbers - parseInt(cartItems[string].inCart))
            delete cartItems[string];
            localStorage.setItem("productsInCart", JSON.stringify(cartItems))
            if (novoTotalCost == 0) {
                localStorage.removeItem("productsInCart")
                localStorage.removeItem("totalCost")
                localStorage.removeItem("cartNumbers")
            }
            location.reload()
        })
    }
}

function login() {
    let loginBtn = document.getElementById("login");
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            let input = document.getElementsByTagName("input")
            if (input[0].value == "admin" && input[1].value == "admin") {
                location.replace("utilizador.html")
            }
        })
    }
}


document.querySelector('.custom-select-wrapper').addEventListener('click', function () {
    this.querySelector('.custom-select').classList.toggle('open');
});
for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
        }
    })
}
window.addEventListener('click', function (e) {
    const select = document.querySelector('.custom-select')
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});




