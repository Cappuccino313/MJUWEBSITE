// ----- Base products -----
const baseProducts = [
    { img: "image/productsimg/sc.avif", title: "SUGARCANE", desc: "Single Origin Colombia Decaf | Arabica Coffee Bean | Medium Dark", price: "RM52.00", country: "Brazil" },
    { img: "image/productsimg/brewsets.avif", title: "Premium Coffee 2", desc: "Smooth and balanced flavor", price: "$21.99", country: "Colombia" },
    { img: "image/productsimg/by.avif", title: "Premium Coffee 3", desc: "Bold and intense taste", price: "$23.99", country: "Ethiopia" },
    { img: "image/productsimg/clb.jpg", title: "Premium Coffee 4", desc: "Light and fruity notes", price: "$20.99", country: "Kenya" },
    { img: "image/coffee5.jpg", title: "Premium Coffee 5", desc: "A delightful morning brew", price: "$18.99", country: "Costa Rica" },
    { img: "image/coffee6.jpg", title: "Premium Coffee 6", desc: "A perfect afternoon pick-me-up", price: "$22.99", country: "Guatemala" },
    { img: "image/coffee7.jpg", title: "Premium Coffee 7", desc: "A robust and full-bodied flavor", price: "$24.99", country: "Honduras" },
    { img: "image/coffee8.jpg", title: "Premium Coffee 8", desc: "A smooth and creamy blend", price: "$19.49", country: "Mexico" },
    { img: "image/coffee9.jpg", title: "Premium Coffee 9", desc: "A rich and nutty aroma", price: "$20.49", country: "Peru" }
];

// ----- Generate full products list ----- //
const products = Array.from({ length: 21 }, (_, i) => {
    const base = baseProducts[i % baseProducts.length];
    return {
        img: base.img,
        title: `Premium Coffee ${i + 1}`,
        desc: base.desc,
        price: `$${(15 + Math.random() * 10).toFixed(2)}`,
        country: base.country
    };
});

// ----- Carousel logic ----- //
document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const cardsPerPage = 4;
    const visibleDots = 5;

    const cardGroup = document.getElementById('product-card-group');
    const pagination = document.getElementById('product-pagination');
    const prevBtn = document.getElementById('prev-products');
    const nextBtn = document.getElementById('next-products');

    function escapeHtml(str = '') {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function renderCards() {
        cardGroup.innerHTML = '';
        for (let i = 0; i < cardsPerPage; i++) {
            const productIndex = (currentIndex + i) % products.length;
            const p = products[productIndex];
            cardGroup.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div class="card">
                    <img src="${p.img}" class="card-img-top" alt="${escapeHtml(p.title)}">
                    <div class="card-body">
                        <h5 class="card-title">${escapeHtml(p.title)}</h5>
                        <p class="card-text">${escapeHtml(p.desc)}</p>
                        <p class="card-text fw-bold">${escapeHtml(p.price)}</p>
                        <p class="card-text text-muted small">${escapeHtml(p.country)}</p>
                        <button class="btn my-btn view-product mt-2" data-index="${productIndex}">Add-to-cart</button>
                    </div>
                </div>
            </div>
            `;
        }
        renderPaginationDots();
    }

    function renderPaginationDots() {
        pagination.innerHTML = '';
        const total = products.length;

        // Keep current dot in the middle unless near start or end
        let start = currentIndex - Math.floor(visibleDots / 2);
        if (start < 0) start = 0;
        if (start > total - visibleDots) start = total - visibleDots;

        const end = start + visibleDots;

        for (let i = start; i < end; i++) {
            const dot = document.createElement('span');
            dot.className = 'product-dot';

            // Active dot = always the middle one in the window
            const middleDotIndex = start + Math.floor(visibleDots / 2);
            if (i === middleDotIndex) dot.classList.add('active');

            dot.addEventListener('click', () => {
                // Jump so that clicked dot becomes middle
                currentIndex = i;
                renderCards();
            });

            pagination.appendChild(dot);
        }
    }


    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        renderCards();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % products.length;
        renderCards();
    });

    renderCards();
});




// ----- Cart sidebar logic ------------------- //
// cart-sidebar
document.addEventListener('DOMContentLoaded', function () {
    // Cart open
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.onclick = function (e) {
            e.preventDefault();
            var cartSidebar = new bootstrap.Offcanvas(document.getElementById('cartSidebar'));
            cartSidebar.show();
        };
    }

    // Suggested products logic
    const suggestedProducts = products.slice(0, 6);
    let cartSuggestIndex = 0;

    function renderCartSuggestions() {
        const container = document.getElementById('cart-suggested-products');
        container.innerHTML = '';
        for (let i = cartSuggestIndex; i < cartSuggestIndex + 2 && i < suggestedProducts.length; i++) {
            const p = suggestedProducts[i];
            container.innerHTML += `
                <div class="card me-2" style="width: 200px; min-width:90px;height: 270px;">
                    <img src="${p.img}" class="card-img-top" style="height:170px;object-fit:cover;margin-bottom:2px;margin-top:2px;" alt="${p.title}">
                    <div class="card-body p-1">
                        <h6 class="card-title mb-1" style="font-size:0.85rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.title}</h6>
                        <button class="btn btn-sm my-btn cart-order-btn mt-2" data-index="${i}">Order</button>
                    </div>
                </div>
            `;
        }
    }

    function attachCartOrderModalEvents() {
        document.querySelectorAll('.cart-order-btn').forEach(btn => {
            btn.onclick = function () {
                const idx = btn.getAttribute('data-index');
                const p = suggestedProducts[idx];
                document.getElementById('modalProductImg').src = p.img;
                document.getElementById('modalProductName').textContent = p.title;
                document.getElementById('modalProductDesc').textContent = p.desc || '';
                document.getElementById('modalProductPrice').textContent = p.price || '';
                document.getElementById('modalProductCountry').textContent = p.country || '';
                document.getElementById('modalGrams').selectedIndex = 0;
                document.getElementById('modalGrind').selectedIndex = 0;
                document.getElementById('modalQty').value = 1;
                const modal = new bootstrap.Modal(document.getElementById('productModal'));
                modal.show();
            };
        });
    }

    document.getElementById('cart-next').onclick = function () {
        cartSuggestIndex = (cartSuggestIndex + 2) % suggestedProducts.length;
        renderCartSuggestions();
        attachCartOrderModalEvents();
    };
    document.getElementById('cart-prev').onclick = function () {
        cartSuggestIndex = (cartSuggestIndex - 2 + suggestedProducts.length) % suggestedProducts.length;
        renderCartSuggestions();
        attachCartOrderModalEvents();
    };
    document.getElementById('return-shop').onclick = function () {
        document.querySelector('.btn-close[data-bs-dismiss="offcanvas"]').click();
    };

    // Initial render for cart suggestions
    renderCartSuggestions();
    attachCartOrderModalEvents();

    // Header-scroll
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header.sticky-top');
    function updateHeaderBg() {
        if (!header) return;
        if (window.scrollY < 10) {
            header.classList.add('transparent-header');
            header.classList.remove('solid-header');
        } else {
            header.classList.remove('transparent-header');
            header.classList.add('solid-header');
        }
    }
    function onScroll() {
        if (!header) return;
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
            header.classList.add('hide-header');
        } else {
            header.classList.remove('hide-header');
        }
        lastScrollY = window.scrollY;
        updateHeaderBg();
    }
    window.addEventListener('scroll', onScroll);
    updateHeaderBg();

    // Product modal
    function attachProductModalEvents() {
        document.querySelectorAll('.view-product').forEach(btn => {
            btn.onclick = function () {
                const idx = btn.getAttribute('data-index');
                const p = products[idx];
                document.getElementById('modalProductImg').src = p.img;
                document.getElementById('modalProductName').textContent = p.title;
                document.getElementById('modalProductDesc').textContent = p.desc;
                document.getElementById('modalProductPrice').textContent = p.price;
                document.getElementById('modalProductCountry').textContent = p.country || 'Unknown';
                document.getElementById('modalGrams').selectedIndex = 0;
                document.getElementById('modalGrind').selectedIndex = 0;
                document.getElementById('modalQty').value = 1;
                const modal = new bootstrap.Modal(document.getElementById('productModal'));
                modal.show();
            };
        });
    }


    document.getElementById('next-products').onclick = function () {
        currentIndex = (currentIndex + 1) % products.length;
        // Prevent overflow: if at the end, wrap so always 3 cards
        if (currentIndex > products.length - cardsPerPage) currentIndex = 0;
        renderCards();
        attachProductModalEvents();
        renderPaginationDots();
    };

    document.getElementById('prev-products').onclick = function () {
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        // Prevent overflow: if at the end, wrap so always 3 cards
        if (currentIndex > products.length - cardsPerPage) currentIndex = products.length - cardsPerPage;
        renderCards();
        attachProductModalEvents();
        renderPaginationDots();
    };

    document.getElementById('shop-all').onclick = function () {
        window.location.href = 'product.html';
    };

    setInterval(() => {
        currentIndex = (currentIndex + cardsPerPage) % products.length;
        renderCards();
        attachProductModalEvents();
    }, 5000);

    // Initial render
    renderCards();
    attachProductModalEvents();
});
