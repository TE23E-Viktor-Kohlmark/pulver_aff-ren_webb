// ======== ======== Shop ======== ========
let shop = document.getElementById('shop');

let shopItemsData = [
    {
        id: "LIM",
        name: "Lim",
        price: 100,
        img: "img/E85.webp",
        popular: true,
    },
    {
        id: "TROD",
        name: "T-röd",
        price: 100,
        img: "img/T-sprit.webp",
        popular: false
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
        img: "img/Glue2.webp",
        popular: false
    },
    {
        id: "GLUE",
        name: "Glue",
        price: 100,
        img: "img/Glue.webp",
        popular: false
    },
    {
        id: "SWEAT",
        name: "Sweat",
        price: 100,
        img: "img/Sweat.webp",
        popular: false
    }
];

let basket = JSON.parse(localStorage.getItem("data")) || [];



// ======== ======== Cart ======== ========

let label = document.getElementById('label');

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
            ${x.popular ? '<div class="popular-tag">Popular</div>' : ''}
                <div class="details">
                    <img src="${x.img}" alt="">
                    <div class="text">
                        <h2>${x.name}</h2>
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

function generateCartItems() {
    let cartItems = document.getElementById('cartItems');
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
        cartItems.innerHTML = ""
    }
}

// ======== ======== Functions ======== ========

let price = document.getElementById('totalPrice')
function totalPrice() {
    if (basket.length > 0) {
        let total = basket.reduce((sum, item) => {
            let product = shopItemsData.find((y) => y.id === item.id);
            return sum + (product.price * item.item);
        }, 0);
        price.innerHTML = `<h3>Total Price: ${total.toFixed(2)} kr</h3>`;
    } else {
        price.innerHTML = `<h3>Total Price: 0.00 kr</h3>`;
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
    localStorage.setItem("data", JSON.stringify(basket));
    update(id);
    
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