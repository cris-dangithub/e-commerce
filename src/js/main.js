
// *****************************************************************************************************
//! FUNCIONES **********************************
function actionRightMenus(condition, classEnter, currentHTML) {
    if (condition) return currentHTML.classList.toggle(classEnter)
}

function changeNavBg(){
    container.getBoundingClientRect().top >= -40 ? 
    navbar.classList.add("main__navbarTransparent") : navbar.classList.remove("main__navbarTransparent")
}

function printEmptyCart(){
    html = `
        <img class="vacioImg" src="./src/img/empty-cart.png" alt="carritoVacío" style="width: 100%"> 
        <div class="content__products-empty__cardEmpty">
            <h3 class="f-roboto-500">Your cart is empty</h3>
            <p>
                You can add items to your cart by clicking on the "+"
                button on the product page.
            </p> 
        </div>
    `   
    cart__contentProducts.innerHTML = html
}

function printNumberIconNav(length) {
    navbar__iconShCrt.textContent = length
}

function reduceStock(idProd) { //! Checked
    console.log("entraPLUSSSSSSS")
    const positionProduct =  products.findIndex(product => product.id === idProd)
    if (products[positionProduct].stock > 0) {
        products[positionProduct].stock -= 1
        products[positionProduct].shopCant += 1 
        printNewStock(idProd)
    }
}

function printNewStock(idProd) {
    let html = ``
    container__stockProduct.forEach((stockSpan, index) => {
        html = `| Stock: ${products[stockSpan.id - 1].stock}`
        if(Number(stockSpan.id) === idProd) 
            container__stockProduct[index].textContent = html
    })
}

function addToCart__Object(idProd) { //! checked
    console.log("esto")

    let condition = false;
    for (let productShCrt of shoppingCart) {
        if (productShCrt.id === idProd){
            condition = true
            break
        }
    }
    if (!condition) 
        for (let product of products) {
            if (product.id === idProd) {
                console.log("hola")
                shoppingCart.push({...product})
                console.log("shoppingCart")
                break
            }
        } else {
            const posProduct = shoppingCart.findIndex(productShCrt => productShCrt.id === idProd)
            if (shoppingCart[posProduct].stock > 0) {
                shoppingCart[posProduct].stock -= 1
                shoppingCart[posProduct].shopCant += 1 
            }
        }



       /*  products.forEach(product => {
            if (product.id === idProd) shoppingCart.push(product)
            console.log(shoppingCart)
        }) */
}

function addToCart__Display() { //!checked
    html = ``
    shoppingCart.forEach(({id, name, price, stock, src, alt, shopCant}) => {
        html += `
        <div class="withProducts__cardShopping">
            <img class="cardShopping__itemImg" src=${src} alt=${alt}>
            <div class="cardShopping__description">
                <h4 class="f-roboto-500">${name}</h4>
                <p>
                    Stock: ${stock} | <span>$${price}.00 </span><br>
                </p>
                <p>Subtotal: $${price * shopCant}.00</p>
                <div class="description__amount">
                    <button class="btn_basic btn_basic-Reduce" id="${id}">
                        <i class='bx bx-minus btn_basic-Reduce' id="${id}"></i>
                    </button>
                    <p>${shopCant} units</p>
                    <button class="btn_basic btn_basic-Plus" id="${id}">+</button>
                </div>
            </div>
            <a><i class='bx bx-trash-alt'></i></a>
        </div>
        `
    })
    cart__contentProducts.classList.add("content__products-withProducts")
    cart__contentProducts.innerHTML = html 
    
}

function aumentStock(idProd) {
    console.log("En aumentStock inicos", shoppingCart[0].shopCant)

    const positionProduct =  products.findIndex(product => product.id === idProd)
    if (products[positionProduct].shopCant > 0) {
        products[positionProduct].stock += 1
        console.log(products === shoppingCart)
        console.log(products)
        console.log(shoppingCart)

        products[positionProduct].shopCant -= 1 //aca esta el problema
        console.log(shoppingCart[0].shopCant)
        printNewStock(idProd)
    } 
    console.log("En aumentStock", shoppingCart[0].shopCant)
}

function reduceInCart__Object(idProd) {
    console.log(shoppingCart)
    console.log(shoppingCart[0].shopCant)
    for (let i = 0; i < shoppingCart.length; i++) {
        
        if (shoppingCart[i].id === idProd) {
            
                if (shoppingCart[i].shopCant > 1){
                shoppingCart[i].stock += 1
                shoppingCart[i].shopCant -= 1
            } else {
                shoppingCart.splice(i, 1)
            }
            break
        } 
    }
}
function printProducts() {
    let html = ``

    products.forEach(({id, name, price, stock, src, alt, filterName}) => {
        html += `
            <div class="mix products__card ${filterName}">
                <div class="card__image">
                    <img src=${src} alt=${alt}>
                </div>
                <div class="card__description">
                    <p>$${price}.00 <span class="stockProduct" id="${id}">| Stock: ${stock}</span></p>
                    <p>${name}</p>
                </div>
                <a class="cardStock pointerCurs" id="${id}">+</a>
            </div>
        `
    })
    container__shopProducts.innerHTML = html

}
//! VARIABLES **********************************
const navbar = document.querySelector(".main__navbar")
const navbar__menu = document.querySelector(".navbar__menu")
const navbar__shoppingCart = document.querySelector(".navbar__cart")
const navbar__iconShCrt = document.querySelector(".shoppingBagIcon__count")
const navbar__cartCount = document.querySelector(".content__count")
const cart__contentProducts = document.querySelector(".content__products")
const container = document.querySelector(".main__container")
const container__shopProducts = document.querySelector(".shop__products")

let menuActive = false
let shoppingCartActive = false
let idProduct = null
let statusButtonCheck = false
const products = [
    {
        id: 1,
        name: "Hoodies",
        price: 14.00,
        stock: 10,
        src: "./src/img/featured1.png",
        alt: "redHoodie",
        filterName: "hoodies",
        shopCant: 0
    },
    {
        id: 2,
        name: "Shirts",
        price: 24.00,
        stock: 15,
        src: "./src/img/featured2.png",
        alt: "blackShirt",
        filterName: "shirts",
        shopCant: 0
    },
    {
        id: 3,
        name: "Sweatshirts white",
        price: 24.00,
        stock: 20,
        src: "./src/img/featured3.png",
        alt: "whiteSweatshirt",
        filterName: "sweatshirts",
        shopCant: 0
    },
    {
        id: 4,
        name: "Sweatshirts (New)",
        price: 14.00,
        stock: 10,
        src: "./src/img/home.png",
        alt: "blackSweatshirt",
        filterName: "sweatshirts",
        shopCant: 0
    }
]
const shoppingCart = []
//* WINDOW **************************************************************************************************************
window.addEventListener("scroll", (e) => {
    changeNavBg()
})

window.addEventListener("load", (e) => {
    changeNavBg()
})

//* NAVBAR **********************************




navbar.addEventListener("click", (e) => {
    if (e.target.classList.contains("bx-grid-alt")) 
        menuActive = actionRightMenus(!menuActive , "navbar__menuShow", navbar__menu)
    if (e.target.classList.contains("hideMenu")) {
        menuActive = actionRightMenus(menuActive , "navbar__menuShow", navbar__menu)
        shoppingCartActive = actionRightMenus(shoppingCartActive , "navbar__cartShow", navbar__shoppingCart)
    }

    if (e.target.classList.contains("showCart") || e.target.classList.contains("shoppingBagIcon__count"))
        shoppingCartActive = actionRightMenus(!shoppingCartActive , "navbar__cartShow", navbar__shoppingCart)

    if (e.target.classList.contains("btn_basic-Plus")) {
        idProduct = Number(e.target.id)
        reduceStock(idProduct)
        addToCart__Object(idProduct)
        addToCart__Display()
        countTotal()
    }

    if (e.target.classList.contains("btn_basic-Reduce")) {
        idProduct = Number(e.target.id)
        aumentStock(idProduct)
        reduceInCart__Object(idProduct)
        addToCart__Display()
        printNumberIconNav(shoppingCart.length)
        countTotal()
        if (shoppingCart.length === 0) printEmptyCart()
    }
    if (statusButtonCheck && e.target.classList.contains("btn-checked"))
        alert("Seguro que quieres comprar estos productos?")

})

//* PINTAR CARRITO ACTUAL (funcUno)

printEmptyCart()
countTotal()
//* Evento que al darle click a los botones del shop card, disminuyan los stocks (funDos)
//* CONTAINER **********************************
// Primero, pintaré las cartas desde la base de datos!!




printProducts() /* Se tiene que llamar antes de asignar container__stockproduct */
printNumberIconNav(shoppingCart.length)
const container__stockProduct = document.querySelectorAll(".stockProduct")

function countTotal(){
    let countPrice = 0;
    let countItems = 0;
    const strngButton = ' disabled="" '
    for (let productShCrt of shoppingCart) {
        countPrice += (productShCrt.shopCant * productShCrt.price)
        countItems += productShCrt.shopCant
    }
    
    if (!(countPrice === 0)) printCountTotal(countPrice, countItems, "")
    if ((countPrice === 0)) printCountTotal(countPrice, countItems, strngButton)
    
}
function printCountTotal(price, item, statusButton) {
    html = `
    <div class="count__numbers">
        <p>${item} items</p>
        <p>$${price}.00</p>
    </div>
    <button class="btn_basic btn-checked" ${statusButton}><i class='bx bxs-check-shield'></i> Checkout</button>`
    navbar__cartCount.innerHTML = html;
    
    (price !== 0) ? statusButtonCheck = true : statusButtonCheck = false;
}

container.addEventListener("click", (e) => {
    idProduct = Number(e.target.id)
    if (e.target.classList.contains("cardStock") || e.target.classList.contains("btn-add")) {
        reduceStock(idProduct)
        addToCart__Object(idProduct)
        addToCart__Display()
        printNumberIconNav(shoppingCart.length)
        countTotal()

    } 

})


//* Agregar items al carrito (funTres)

// * Mostrar la cantidad de productos en carrito en la parte del icono del navbar (funCuataro)

// * Eventos para el carrito: Hacer ahora que el boton + del carrito funcione (funFive)

// * Eventos para el carrito: Hacer ahora que el boton - del carrito funcione y si llega a cero se quite del carrito (funSix)

// * Eventos del carrito: Sumatoria de totales y colocar el boton de comprar con alerta





//! MIXITUP **********************************
mixitup(".shop__products" , {
    selectors: {
        target: ".products__card"
    },
    animation: {
        duration: 300
    }
}).filter("all")
