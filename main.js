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



let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        return `
            <div class="item">
                <div class="details">
                    <img src="${x.img}" alt="">
                    <div class="text">
                        <h3>${x.name}</h3>
                        <div class="price-buy">
                            <button>Köp</button>
                            <p>Pris : ${x.price}</p>
                        </div>                    
                    </div> 
                </div>
            </div>
        `
    }).join(""));
};

generateShop();