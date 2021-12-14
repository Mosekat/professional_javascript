'use strict';

class Burger {
    constructor() {
        this.options = [];
    }

    addOptions(param) {
        this.options.push(param)
    }

    calculatePrice() {
        let sum = 0;
        this.options.forEach(optionEl => {
            sum += optionEl.price;
        })

        return sum;
    }

    calculateCalories() {
        let sum = 0;
        this.options.forEach(optionEl => {
            sum += optionEl.calloric;
        })
        return sum;
    }
}

class OptionsList {
    constructor() {
        this.toppingCollection = [
            {name: "cheese", price: 10, calloric: 20},
            {name: 'potato', price: 20, calloric: 5},
            {name: 'salad', price: 15, calloric: 10},
            {name: 'small', price: 20, calloric: 20},
            {name: 'big', price: 100, calloric: 40},
            {name: 'mayonnaise', price: 20, calloric: 5},
            {name: 'spice', price: 15, calloric: 0},

        ]
    }

    findOptionByName(toppingName) {
        for (let i = 0; i < this.toppingCollection.length; i++) {
            if (this.toppingCollection[i].name === toppingName) {
                return this.toppingCollection[i];
            }

        }
        return false;
    }
}

window.addEventListener("DOMContentLoaded", function() {

        let btn = document.querySelector('button');
        btn.addEventListener('click', function(event) {

            let size = document.querySelector('input[name="size"]:checked').value;
            let toppingCollection = document.querySelectorAll('input[name="topping"]:checked');
            let otherToppingCollection = document.querySelectorAll('input[name="other-topping"]:checked');

            //Создать объект бургер
            let burger = new Burger();
            //Создать объект опшнлист
            let optionsList = new OptionsList();

            //Найдем в массиве опций опцию размера
            let optionSize = optionsList.findOptionByName(size);
            //Если она есть добавим эту опцию в массив опций
            if (optionSize) {
                burger.addOptions(optionSize);
            }

            if (toppingCollection) {
                toppingCollection.forEach(toppingEl => {
                    let option = optionsList.findOptionByName(toppingEl.value);
                    if (option) {
                        burger.addOptions(option);
                    }
                })
            }
            if (otherToppingCollection) {
                otherToppingCollection.forEach(otherToppingEl => {
                    let option = optionsList.findOptionByName(otherToppingEl.value);
                    if (option) {
                        burger.addOptions(option)
                    }
                })
            }
            document.querySelector('#cost').innerHTML = burger.calculatePrice();
            document.querySelector('#callories').innerHTML = burger.calculateCalories();

            event.preventDefault();
        })

    }
)

