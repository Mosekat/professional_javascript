'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

document.addEventListener("DOMContentLoaded", function(event) {

    const app = new Vue({
        el: '#app',
        data: {
            catalogUrl: '/catalogData.json',
            cartUrl: '/getBasket.json',
            products: [],
            cartItems: [],
            filtered: [],
            imgCatalog: 'https://via.placeholder.com/360x299',
            searchLine: '',
            isVisibleCart: false,
            totalCart:0,
        },
        methods: {
            FilterGoods(searchLine) {
                const regExp = new RegExp(searchLine, 'i');
                this.filtered = this.products.filter(product => regExp.test(product.product_name));
            },

            getJson(url) {
                return fetch(url)
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error);
                    })
            },
            getSumOfPosition(product) {
                let sum = product.price * product.quantity;
                return sum;

            },
            getSumAllProducts() {

                for (let product of this.cartItems) {
                    this.totalCart+=this.getSumOfPosition(product);
                }

            },
            addProducts(product) {
                for (let prodCart of this.cartItems) {
                    if (prodCart.id_product == product.id_product) {
                        prodCart.quantity++;
                    }
                }
                this.getSumAllProducts();

            }
        },
        mounted() {
            this.getJson(`${API + this.catalogUrl}`)
                .then(catalog => {
                    for (let el of catalog) {
                        this.products.push(el);
                        this.filtered.push(el);
                    }
                });
            this.getJson(`${API + this.cartUrl}`)
                .then(data => {

                    for (let product of data.contents) {
                        this.cartItems.push(product);
                    }
                    this.getSumAllProducts();
                })

            // this.getSumOfPosition();
            // this.getSumAllProducts();
        }

    })
});
