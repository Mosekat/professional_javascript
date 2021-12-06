'use strict';

class Burger {
    constructor() {
        this.fullBurger = [];
    }

    addOptionInBurger(objOption) {
        this.fullBurger.push(objOption);
    }

    calculateCalories() {
        let sum = 0;
        this.fullBurger.forEach(objOption => {
            sum += objOption.callori;

        })
        return sum;
    }

    calculatePrice() {
        let sum = 0;
        this.fullBurger.forEach(objOption => {
            sum += objOption.price;
        })
        return sum;
    }
}

class Option {
    constructor(name, callori, price) {
        this.name = name;
        this.callori = callori;
        this.price = price;

    }

}

window.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelector('button');

    btn.addEventListener('click', () => {

        let burger = new Burger();

        let nameCollection = document.querySelectorAll('input:checked');
        nameCollection.forEach(nameOption => {

            let name = nameOption.value;
            let callori = +nameOption.parentNode.querySelector(`.callori`).textContent;
            let price = +nameOption.parentNode.querySelector(`.price`).textContent;
            let option = new Option(name, callori, price);
            burger.addOptionInBurger(option);
        })
        document.querySelector('#cost').innerHTML = burger.calculateCalories();
        document.querySelector('#callories').innerHTML = burger.calculatePrice();

    })

})
