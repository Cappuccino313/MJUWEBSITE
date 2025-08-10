
const products = [
    {
        img: 'image/coffee1.webp',
        hoverImg: 'image/coffee1-hover.webp',
        title: 'Ethiopia Single Origin',
        desc: 'Bright, floral, and citrusy. Perfect for pour-over.',
        price: '$18.00'
    },
    {
        img: 'image/coffee2.jpeg',
        hoverImg: 'image/coffee2-hover.jpeg',
        title: 'Colombia Blend',
        desc: 'Smooth, nutty, and balanced. Great for espresso.',
        price: '$16.00'
    },
    {
        img: 'image/coffee3.jpg',
        hoverImg: 'image/coffee3-hover.jpg',
        title: 'Sumatra Dark Roast',
        desc: 'Rich, earthy, and bold. Perfect for French press.',
        price: '$17.00'
    }
    ,
    {
        img: 'image/coffee4.jpg',
        hoverImg: 'image/coffee4-hover.jpg',
        title: 'Guatemala Medium Roast',
        desc: 'Chocolatey, caramel notes with a smooth finish.',
        price: '$15.00'
    },
    {
        img: 'image/coffee5.jpg',
        hoverImg: 'image/coffee5-hover.jpg',
        title: 'Kenya AA',
        desc: 'Bright acidity with berry and citrus flavors.',
        price: '$20.00'
    },
    {
        img: 'image/coffee6.jpg',
        hoverImg: 'image/coffee6-hover.jpg',
        title: 'Brazil Santos',
        desc: 'Sweet, mild, and low acidity. Perfect for cold brew.',
        price: '$14.00'
    }
    ,
    {
        img: 'image/coffee7.jpg',
        hoverImg: 'image/coffee7-hover.jpg',
        title: 'Costa Rica Tarrazu',
        desc: 'Fruity, bright, and well-balanced. Great for drip coffee.',
        price: '$19.00'
    },
    {
        img: 'image/coffee8.jpg',
        hoverImg: 'image/coffee8-hover.jpg',
        title: 'Honduras Marcala',
        desc: 'Floral, sweet, and medium-bodied. Perfect for espresso.',
        price: '$18.50'
    }
    ,
    {
        img: 'image/coffee9.jpg',
        hoverImg: 'image/coffee9-hover.jpg',
        title: 'Peru Organic',
        desc: 'Smooth, chocolatey, and low acidity. Great for pour-over.',
        price: '$16.50'
    },
    {
        img: 'image/coffee10.jpg',
        hoverImg: 'image/coffee10-hover.jpg',
        title: 'Panama Geisha',
        desc: 'Floral, fruity, and complex. A premium choice.',
        price: '$45.00'
    }
    // Add more products here
];

const productList = document.getElementById('product-list');
productList.innerHTML = products.map((p, i) => `
    <div class="col">
        <div class="card h-100 shadow-sm">
            <img src="${p.img}" 
                 class="card-img-top product-img" 
                 alt="${p.title}" 
                 data-index="${i}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${p.title}</h5>
                <p class="card-text">${p.desc}</p>
                <div class="mt-auto">
                    <span class="fw-bold">${p.price}</span>
                    <button class="btn my-btn ms-3">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
`).join('');

// Add hover event listeners
document.querySelectorAll('.product-img').forEach(img => {
    const idx = img.getAttribute('data-index');
    img.addEventListener('mouseenter', function () {
        if (products[idx].hoverImg) img.src = products[idx].hoverImg;
    });
    img.addEventListener('mouseleave', function () {
        img.src = products[idx].img;
    });
});
