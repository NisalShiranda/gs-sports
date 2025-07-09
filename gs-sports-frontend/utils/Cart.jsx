export default function getCart(){
    let cart = localStorage.getItem("cart");

    if(cart == null){
        cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        return []
    }
    cart = JSON.parse(cart)
    return cart
}

export function addToCart(product, qty){

    let cart = getCart();

    const productIndex = cart.findIndex((prdct) => prdct.productID === product.productID);
    //-1 means not found
    if(productIndex === -1){
        cart.push(  
            {
            productID: product.productID, 
            name : product.name,
            altNames : product.altNames,
            price : product.price,
            labeledPrice : product.labeledPrice,
            image : product.images[0],
            quantity : qty

        }
        )
    }else{
        cart[productIndex].quantity += qty
        if(cart[productIndex].quantity <= 0){
            cart = cart.filter((product) => product.productID !== product.productID)
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    return cart
}

export function removeFromCart(productID){
    let cart = getCart();
    cart = cart.filter((prdct) => prdct.productID !== productID)
    localStorage.setItem("cart", JSON.stringify(cart))
    return cart

}

export function getTotal(){
    let cart = getCart();
    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity
    })
    return total
}

export function getTotalForLabeledPrice(){
    let cart = getCart();
    let total = 0;
    cart.forEach((item) => {
        total += item.labeledPrice * item.quantity
    })
    return total
}