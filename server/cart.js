let add = (cart, req) => {
    if (typeof cart.contents === 'undefined') {
        cart = {};
        cart.contents = [];
    }
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

let deleteCartItem = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    if (find) {
        find.quantity -= 1;
    }
    cart.contents = cart.contents.filter(el => el.quantity > 0)
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    deleteCartItem
};