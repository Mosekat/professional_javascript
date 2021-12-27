Vue.component("cart", {
        props: ['cartItems', "isVisibleCart"],
        template: `
      <div v-if="isVisibleCart" id="cart-table" class="basket">

                            <div class="basketRow basketHeader">
                                <div>Название товара</div>
                                <div>Количество</div>
                                <div>Цена за шт.</div>
                                <div>Итого</div>
                            </div>
                            <div v-if='cartItems.length>0' id="cart">


                                <cart-item :cart-item="cartItem"  v-for="cartItem of cartItems">
                       
                                </cart-item>
                            </div>
                            <div v-else="!cartItems.length">Корзина пуста</div>
                            <div class="basketTotal">
                                Товаров в корзине на сумму:
                                $<span class="basketTotalValue">{{$root.getSumAllProducts()}}</span>
                            </div>
                        </div>
    `
    }
)
Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
<div class="basketRow basketHeader">
    <div>{{cartItem.product_name}}</div>
    <div>{{cartItem.quantity}}</div>
    <div>{{cartItem.price}}</div>
    <div>{{$root.getSumOfPosition(cartItem)}}</div>
    <button class="del-btn" @click.prevent='$root.removeProduct(cartItem)'>×</button>
</div>
    
    
    `
})