'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

document.addEventListener("DOMContentLoaded", function(event) {

    const app = new Vue({
        el: '#app',
        data: {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://via.placeholder.com/360x299',
            searchLine: '',
            isVisibleCart: false,
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
            addProducts(product) {
                console.log(product.id_product);

            }
        },
        mounted() {
            this.getJson(`${API + this.catalogUrl}`)
                .then(catalog => {
                    for (let el of catalog) {
                        this.products.push(el)
                        this.filtered.push(el)
                    }
                })
        }

    })
});
