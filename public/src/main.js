'use strict';
const API = '';

document.addEventListener("DOMContentLoaded", function(event) {

    const app = new Vue({
        el: '#app',
        data: {
            catalogUrl: '/api/products',
            cartUrl: '/api/cart',
            products: [],
            cartItems: [],
            filtered: [],
            imgCatalog: 'https://via.placeholder.com/360x299',
            searchLine: '',
            isVisibleCart: false,
            isError: false,

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
                        this.isError = true;
                        console.log(error);
                    })

            },
            postJson(url, data) {
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error)
                        this.isError = true;
                    })
            },
            putJson(url, data) {
                return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error)
                        this.isError = true;
                    })
            },
            deleteJson(url, data) {
                return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error)
                        this.isError = true;
                    })
            },
            getSumOfPosition(product) {
                let sum = product.price * product.quantity;
                return sum;

            },
            getSumAllProducts() {
                let totalCart = 0;
                for (let product of this.cartItems) {
                    totalCart += this.getSumOfPosition(product);
                }
                return totalCart;

            },
            addProducts(product) {
                let find = false;
                for (let prodCart of this.cartItems) {
                    if (prodCart.id_product == product.id_product) {
                        find = true;
                        this.putJson(`/api/cart/${product.id_product}`, {quantity: 1}).then(data => {
                            this.getJson(`${API + this.cartUrl}`)
                                .then(data => {
                                    this.cartItems = data.contents;
                                    this.getSumAllProducts();
                                });
                        });
                    }
                }
                if (find == false) {
                    const prod = Object.assign({quantity: 1}, product);
                    this.postJson(`/api/cart`, prod).then(() => {
                        this.getJson(`${API + this.cartUrl}`)
                            .then(data => {
                                if (data && data.contents) {
                                    this.cartItems = data.contents;
                                    this.getSumAllProducts();
                                }

                            });
                    });
                }
            },
            removeProduct(product) {
                this.deleteJson(`/api/cart/${product.id_product}`, {quantity: 1})
                    .then(() => {
                        this.getJson(`${API + this.cartUrl}`)
                            .then(data => {
                                this.cartItems = data.contents;
                                this.getSumAllProducts();
                            });

                    });

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
                    if (typeof data.contents === 'object') {
                        for (let product of data.contents) {
                            this.cartItems.push(product);
                        }
                        this.getSumAllProducts();
                    }

                });

            // this.getSumOfPosition();
            // this.getSumAllProducts();
        }

    })
});
