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

//! VARIABLES **********************************
const navbar = document.querySelector(".main__navbar")
const navbar__menu = document.querySelector(".navbar__menu")
const navbar__shoppingCart = document.querySelector(".navbar__cart")
const container = document.querySelector(".main__container")

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

