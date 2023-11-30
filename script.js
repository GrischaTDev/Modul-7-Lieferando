//////////////////////////////////////////////
// JSON Array für die Gerichte auf der Website
//////////////////////////////////////////////
let dishes = [
    {
        'name': 'Dönertasche',
        'description': 'Wahl aus: mit Hähnchenfleisch, mit Kalbfleisch, mit Cocktailsauce, mit Knoblauchsauce, mit Sauce, scharf und mehr.',
        'price': 6.00,
        'amount': 1,
    },
    {
        'name': 'Lahmacun Döner',
        'description': 'Wahl aus: mit Hähnchenfleisch, mit Kalbfleisch, mit Cocktailsauce, mit Knoblauchsauce, mit Sauce, scharf und mehr.',
        'price': 8.00,
        'amount': 1,
    },
    {
        'name': 'Pizza Margherita',
        'description': 'Wahl aus: Klein, Ø 24cm, Groß, Ø 30cm oder Party, 60cm x 40cm.',
        'price': 7.00,
        'amount': 1,
    },
    {
        'name': 'Pizza Salami',
        'description': 'Wahl aus: Klein, Ø 24cm, Groß, Ø 30cm oder Party, 60cm x 40cm.',
        'price': 7.50,
        'amount': 1,
    },
    {
        'name': 'Pizza Hawaii',
        'description': 'Wahl aus: Klein, Ø 24cm, Groß, Ø 30cm oder Party, 60cm x 40cm.',
        'price': 7.50,
        'amount': 1,
    },
    {
        'name': 'Pizza Vegetaria',
        'description': 'Wahl aus: Klein, Ø 24cm, Groß, Ø 30cm oder Party, 60cm x 40cm.',
        'price': 6.50,
        'amount': 1,
    }
];


let shoppingBasket = [];
let deliveryPrice = 3;

load();


function showDishes() {
    document.getElementById('dishes-list').innerHTML = '';

    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i];

        document.getElementById('dishes-list').innerHTML += /* html */`
        
        <div class="dishes-list">
            <div class="dishes-info">
                <h2>${dish['name']}</h2>
                <span>${dish['description']}</span>
                <span class="dishes-price">${dish['price'].toFixed(2)}€</span>
            </div>
            <img onclick="addtoBasket(${i})" class="add-dishes" src="./img/add.svg" alt="">
        </div>
        
        `; 
    }
}


function addtoBasket(indexDishes) {
    let dish = dishes[indexDishes];
    let indexBasket = shoppingBasket.findIndex((x) => x.name === dish.name);
     if (indexBasket == -1) {
         shoppingBasket.push(dish);
     } else {
         shoppingBasket[indexBasket]['amount'] ++;
     }
     showShoppingBasket();
     save();
    }


function renderBasket() {
    let basketArray = shoppingBasket;

    if (basketArray.length == 0) {
        document.getElementById('mobile-pay-button').classList.add('d-none-mobile')
        document.getElementById('basket-list').innerHTML = /* html */ `
        <div class="empty-basket">
            <img src="./img/shopping-bag.svg" alt="">
            <h2>Fülle deinen Warenkorb</h2>
            <span>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span>
        </div>
        `;
    } else {
        document.getElementById('mobile-pay-button').classList.remove('d-none-mobile')
    }
}
    

function showShoppingBasket() {
    document.getElementById('basket-list').innerHTML = '';
    let sum = 0;

    for (let b = 0; b < shoppingBasket.length; b++) {
        const basketList = shoppingBasket[b];
        const dishPrice = basketList.price * basketList.amount; 

        sum += dishPrice;
        const delivery = deliveryPrice + sum;

        document.getElementById('basket-list').innerHTML += /* html */`
        <div class="basket-dish">
            <div class="position-name">
                <div>
                    <span>${b+1}.</span>
                    <span>${basketList['name']}</span>
                </div>
                <span>${dishPrice.toFixed(2)} €</span>
            </div>
            <div class="dish-amount">
                <img onclick="dishAmountRemove(${b})" src="./img/remove.svg" alt="">
                <span>${basketList['amount']}</span>
                <img onclick="dishAmountAdd(${b})" src="./img/add.svg" alt="">
            </div> 
        `;

        document.getElementById('basket-list-prices').innerHTML = /* html */`
        <div class="basket-dish">
            <div class=order-price>
                <span>Zwischensumme</span>
                <span>${sum.toFixed(2)} €</span>
            </div>
            <div class="order-price2">
                <span>Lieferkosten</span>
                <span>${deliveryPrice.toFixed(2)} €</span>
            </div>
            <div class="order-price2">
                <span>Gesamt</span>
                <span>${delivery.toFixed(2)} €</span>
            </div>
            <span class="pay-button" onclick="pay(${b})">Bezahlen</span>
        </div>  
        `;

        document.getElementById('mobile-pay-button').innerHTML = /* html */`
            <span class="mobile-button" onclick="mobileBasketOn()"><img src="./img/shopping-bag-white.svg" alt="">Bezahlen ${delivery.toFixed(2)} €</span>
        `;
    }
    renderBasket()
}


function dishAmountRemove(b) {
    let removeAmount = shoppingBasket[b];

    if (removeAmount.amount > 1) {
        removeAmount.amount --;
    } else {
        shoppingBasket.splice(b, 1)
        document.getElementById('basket-list-prices').innerHTML = '';
    }

    showShoppingBasket();
    save();
}


function dishAmountAdd(b) {
    let addAmount = shoppingBasket[b];
    addAmount.amount ++;

    showShoppingBasket();
    save();
}


function pay(b) {
    shoppingBasket.splice(b.length);
    document.getElementById('basket-list').innerHTML = '';
    document.getElementById('basket-list-prices').innerHTML = '';

    document.getElementById('pay-popup').innerHTML = /* html */ `
    <div class="open-pay-popup" onclick="closePopup()">
        <div class="popup-container" onclick="doNotClose(event)">
            <h2>Vielen Dank für ihre Bestellung</h2>
            <span>Geschätze Lieferzeit <img src="./img/time.svg" alt=""> 24 min.</span>
        </div>
    </div>
    `;

    renderBasket()
    save();
}


function closePopup() {
    document.getElementById('pay-popup').innerHTML = '';
    document.getElementById('basket').classList.add('d-none-mobile')
}

function doNotClose(event) {
    event.stopPropagation();
}

function mobileBasketOn() {
    document.getElementById('basket').classList.remove('d-none-mobile')
}


function mobileBasketoff() {
    document.getElementById('basket').classList.add('d-none-mobile')
}


function save() {
    let saveShoppingBasket = JSON.stringify(shoppingBasket);
    localStorage.setItem('Dishes', saveShoppingBasket)
}


// Die Anweisung if (loadShoppingBasket) prüft, ob die Variable loadShoppingBasket einen Wert enthält. 
// Wenn loadShoppingBasket einen Wert enthält, wird der Code innerhalb des if-Blocks ausgeführt.

function load() {
    let loadShoppingBasket = localStorage.getItem('Dishes');
    if (loadShoppingBasket) {
        shoppingBasket = JSON.parse(loadShoppingBasket);
    }
    
}


