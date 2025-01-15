
// ======== ======== Shop ======== ========
let shop = document.getElementById('shop');

let shopItemsData = [
    {
        id: "LIM",
        name: "Lim",
        price: 100,
        img: "img/E85.png"
    },
    {
        id: "TROD",
        name: "T-röd",
        price: 100,
        img: "img/T-sprit.png"
    },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Make in to a function insted of a var 
function generateShop() {
    shop.innerHTML = shopItemsData.map((x) => {
        let search = basket.find((x) => x.id === x.id) || [];
        return `
            <div class="item">
                <div class="details">
                    <img src="${x.img}" alt="">
                    <div class="text">
                        <h3>${x.name}</h3>
                        <div class="price-buy">
                            <button onclick="increment('${x.id}')"> Köp</button>
                            <p>Pris : ${x.price}</p>
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

let cartOut = document.getElementById('cartOut');
let generateCartItems = () => {
    if (basket.length !== 0) {
        cartOut.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            <div class="cartItem">
                <img src="${search.img}" alt="">
                <div class="title">
                    <div class="cartName">
                        <h3>${search.name}</h3>
                        <i class="bi bi-x-lg" onclick="removeItem('${id}')"></i>
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
        cartOut.innerHTML = "";
        label.innerHTML = `
            <h2>Varukorgen är tom</h2>
            <button class="CloseCart">Stäng</button>
        `;
    }
}
generateCartItems();

// ======== ======== Functions ======== ========

let increment = (id) => {
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
    calculation();
};

let decrement = (id) => {
    let selectedItem = basket.find((x) => x.id === id);
   
    if (selectedItem === undefined || selectedItem.item === 0) return;
    
    selectedItem.item--;
    if (selectedItem.item === 0) {
        basket = basket.filter((x) => x.id !== id);
    }

    localStorage.setItem("data", JSON.stringify(basket));
    update(id);
    calculation();

};


let update = (id) => {
    let search = basket.find((x) => x.id === id);
    let element = document.getElementById(id);
    if (element) {
        element.innerHTML = search ? search.item : 0;
    }
    generateCartItems();
    calculation();

};

let calculation = () => {
    let carticon = document.getElementById('cartAmount');
    if (carticon) {
        let totalItems = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
        carticon.innerHTML = totalItems;
        generateCartItems(basket);
    }
};
calculation();  

// // ======== ======== Button ======== ======== 

// document.getElementById('menuButton').addEventListener('click', function () {
//     var menu = document.getElementById('menu');
//     if (menu.style.display === 'none' || menu.style.display === '') {
//         menu.style.display = 'flex';
//     } else {
//         menu.style.display = 'none';
//     }
// });
