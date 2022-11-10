mixitup(".shop__products" , {
    selectors: {
        target: ".products__card"
    },
    animation: {
        duration: 300
    }
}).filter("all")

// *****************************************************************************************************
//! FUNCIONES **********************************
function translateContainer(condition, classEnter, currentHTML) {
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

//! VARIABLES **********************************
const navbar = document.querySelector(".main__navbar")
const navbar__menu = document.querySelector(".navbar__menu")
const navbar__shoppingCart = document.querySelector(".navbar__cart")
const container = document.querySelector(".main__container")
const cart__contentProducts = document.querySelector(".content__products")

let menuActive = false
let shoppingCartActive = false

//* WINDOW **********************************
window.addEventListener("scroll", (e) => {
    changeNavBg()
})

window.addEventListener("load", (e) => {
    changeNavBg()
})

//* NAVBAR **********************************
navbar.addEventListener("click", (e) => {
    if (e.target.classList.contains("bx-grid-alt")) 
        menuActive = translateContainer(!menuActive , "navbar__menuShow", navbar__menu)
    if (e.target.classList.contains("hideMenu")) {
        menuActive = translateContainer(menuActive , "navbar__menuShow", navbar__menu)
        shoppingCartActive = translateContainer(shoppingCartActive , "navbar__cartShow", navbar__shoppingCart)
    }

    if (e.target.classList.contains("showCart") || e.target.classList.contains("shoppingBagIcon__count"))
        shoppingCartActive = translateContainer(!shoppingCartActive , "navbar__cartShow", navbar__shoppingCart)

})

//* PINTAR CARRITO ACTUAL (funcUno)

printEmptyCart()

//* Evento que al darle click a los botones del shop card, disminuyan los stocks