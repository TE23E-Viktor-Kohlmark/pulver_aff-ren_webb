let shop = document.getElementById('shop');

let shopItemsData = [
    {
        id: "asdasd",
        name: "Lim",
        price: 100,
        img: "img/E85.png"
    },
    {
        id: "asdasasdd",
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
        localStorage.setItem("data", JSON.stringify(basket));
        console.log(basket);
        update(selectedItem.id);
    } 
};

let dncrement = () => { };
let update = (id) => { 
    let search = basket.find((x) => x.id === id);
    console.log(search.item);
    console.log("update is running");
    calculation();
};

let calculation = () => {
    let carticon = document.getElementById('cartAmount');
    carticon = document.getElementById('cartAmount');
    console.log(basket.map((x) => x.item).reduce((x, y) => x + y, 0));
};

calculation();

// ======== ======== Button ======== ======== 

document.getElementById('menuButton').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
});

