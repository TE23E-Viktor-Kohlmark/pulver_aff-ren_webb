// ======== ======== Shop ======== ========
let shop = document.getElementById('shop');

let shopItemsData = [
    {
        id: "LIM",
        name: "Lim",
        price: 100,
        img: "img/E85.webp",
        popular: false,
    },
    {
        id: "TROD",
        name: "T-röd",
        price: 100,
        img: "img/T-sprit.webp",
        popular: true
    },
    {
        id: "SEA",
        name: "Sea",
        price: 100,
        img: "img/Sea.webp",
        popular: false
    },
    {
        id: "GLUE2",
        name: "Glue2",
        price: 100,
        img: "img/glue2.webp",
        popular: false
    },
    {
        id: "GLUE",
        name: "Glue",
        price: 100,
        img: "img/glue.webp",
        popular: false
    },
    {
        id: "SWEAT",
        name: "Sweat",
        price: 100,
        img: "img/sweat.webp",
        popular: true
    }
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Main page
function generateShop() {
    shop.innerHTML = shopItemsData.map((x) => {
        let search = basket.find((y) => y.id === x.id) || [];
        return `
            <div class="item">
                ${x.popular ? '<div class="popular-tag">Popular</div>' : ''}
                <div class="details">
                    <img src="${x.img}" alt="">
                    <div class="text">
                        <h3>${x.name}</h3>
                        <div class="price-buy">
                            <button onclick="increment('${x.id}')">Köp</button>
                            <p>Pris: ${x.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

generateShop();
// ======== ======== Cart ======== ========

let label = document.getElementById('label');

function generateCartItems() {
    let cartItems = document.getElementById('cartItems'); // Corrected ID
    if (basket.length !== 0) {
        cartItems.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            <div class="cartItem">
                <img src="${search.img}" alt="">
                <div class="title">
                    <div class="cartName">
                        <h3>${search.name}</h3>
                        <i onclick="removeItem('${id}')" class="bi bi-x-lg"></i>
                    </div>    
                    <div class="buttons">
                        <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="amount">${item}</div>
                        <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
            `;
        }).join("");
    } else {
        console.log("Cart is empty");
        cartItems.innerHTML = "";
    }
}

function searchItems() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let filteredItems = shopItemsData.filter(item => item.name.toLowerCase().includes(searchInput));
    displayShopItems(filteredItems);
}

function displayShopItems(items) {
    let shop = document.getElementById('shop');
    shop.innerHTML = items.map((x) => {
        let search = basket.find((y) => y.id === x.id) || [];
        return `
            <div class="item">
                <div class="details">
                    <img src="${x.img}" alt="">
                    <div class="text">
                        <h3>${x.name}</h3>
                        <div class="price-buy">
                            <button onclick="increment('${x.id}')">Köp</button>
                            <p>Pris: ${x.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

// Call displayShopItems initially to display all items
displayShopItems(shopItemsData);

// ======== ======== Functions ======== ========

let price = document.getElementById('totalPrice')
function totalPrice() {
    if (basket.length > 0) {
        let total = basket.reduce((sum, item) => {
            let product = shopItemsData.find((y) => y.id === item.id);
            return sum + (product.price * item.item);
        }, 0);
        price.innerHTML = `<h3>Total Price: $${total.toFixed(2)}</h3>`;
    } else {
        price.innerHTML = `<h3>Total Price: $0.00</h3>`;
    }
}

function increment(id) {
    let selectedItem = shopItemsData.find((x) => x.id === id);

    if (selectedItem) {
        let search = basket.find((x) => x.id === selectedItem.id);
        if (search === undefined) {
            basket.push({
                id: selectedItem.id,
                item: 1,
            });
        } else {
            search.item++;
        }
        update(selectedItem.id);
        localStorage.setItem("data", JSON.stringify(basket));
    }
    update(id);
}

function decrement(id) {
    let selectedItem = basket.find((x) => x.id === id);

    if (selectedItem === undefined || selectedItem.item === 0) return;

    selectedItem.item--;
    if (selectedItem.item === 0) {
        basket = basket.filter((x) => x.id !== id);
    }

    update(id);
}

function update(id) {
    let search = basket.find((x) => x.id === id);
    let element = document.getElementById(id);
    if (element) {
        element.innerHTML = search ? search.item : 0;
    }
    calculation();
    totalPrice();
    generateCartItems();
}

function removeItem(id) {
    basket = basket.filter((x) => x.id !== id);
    localStorage.setItem("data", JSON.stringify(basket));
    update(id);
}

function calculation() {
    let carticon = document.getElementById('cartAmount');
    if (carticon) {
        let totalItems = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
        carticon.innerHTML = totalItems;
        localStorage.setItem("data", JSON.stringify(basket));
    }
}

update();
// ========= Button =========
function CartHide() {
    var x = document.getElementById("cart");
    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

function MenuHide() {
    var x = document.getElementById("menu");
    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}