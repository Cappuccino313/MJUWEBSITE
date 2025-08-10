// ----- Base products ----- //
const baseProducts = [
    {
        img: "image/productsimg/sc.avif",
        title: "SUGARCANE",
        desc: "Single Origin Colombia Decaf | Arabica Coffee Bean | Medium Dark",
        price: "RM52.00",
        country: "Columbia",
        images: [
            "image/productsimg/sc.avif",
            "image/productsimg/columbiamap.avif",
            "image/productsimg/grindsize.avif",
            "image/productsimg/coffeebenefits.avif",
            "image/productsimg/mjucup.avif"
        ]
    },
    {
        img: "image/productsimg/brewsets.avif",
        title: "Hand Brew Coffee Sets",
        desc: "MJU - 10 in 1 Coffee Brewing Gift Set Box | Hand-Brewed Coffee Filter Grinder Se",
        price: "RM249.00",
        country: "",
        images: [
            "image/productsimg/brewsets.avif"
        ]
    },
    { img: "image/productsimg/by.avif", title: "BERRY YAMMY", desc: "BERRY YAMMY Single Origin Kenya | Arabica Coffee Bean | Light Medium", price: "RM45.00", country: "Kenya", images: ["image/productsimg/by.avif"] },
    { img: "image/productsimg/clb.jpg", title: "COCOLOVEBERRY 4", desc: "COCOLOVEBERRY Blend Brazil x Ethiopia | Arabica Coffee Bean | Medium Dark", price: "RM35.00", country: "Brazil & Ethiopia", images: ["image/productsimg/clb.jpg"] },
    { img: "image/productsimg/matchapremium.avif", title: "", desc: "(ReadyStock) SHIKI / Premium Ceremonial Grade Matcha Green Tea Powder - 30g", price: "RM89.00", country: "", images: ["image/productsimg/matchapremium.avif"] },
    { img: "image/coffee6.jpg", title: "Premium Coffee 6", desc: "A perfect afternoon pick-me-up", price: "$22.99", country: "Guatemala", images: ["image/coffee6.jpg"] },
    { img: "image/coffee7.jpg", title: "Premium Coffee 7", desc: "A robust and full-bodied flavor", price: "$24.99", country: "Honduras", images: ["image/coffee7.jpg"] },
];

/* ----- Generate full products list (includes images copied from baseProducts) ----- */
const products = Array.from({ length: 21 }, (_, i) => {
    const base = baseProducts[i % baseProducts.length];
    return {
        img: base.img,
        title: base.title || `Premium Coffee ${i + 1}`,
        desc: base.desc,
        price: base.price || `$${(15 + Math.random() * 10).toFixed(2)}`,
        country: base.country,
        images: (base.images && base.images.length) ? base.images.slice() : [base.img]
    };
});

/* ----- Carousel & Quick View logic ----- */
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
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex">
          <div class="card w-100">
            <div class="product-img-wrapper position-relative">
              <img src="${p.img}" class="card-img-top" alt="${escapeHtml(p.title)}">
              <button class="quick-view-bar position-absolute bottom-0 start-0 w-100 text-center text-translate-middle-x" 
                  data-index="${productIndex}">Quick View</button>
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${escapeHtml(p.title)}</h5>
              <p class="card-text">${escapeHtml(p.desc)}</p>
              <p class="card-text fw-bold">${escapeHtml(p.price)}</p>
              <p class="card-text text-muted small">${escapeHtml(p.country)}</p>
              <button class="btn my-btn view-product mt-auto" data-index="${productIndex}">Add-to-cart</button>
            </div>
          </div>
        </div>
      `;
        }
        equalizeCardHeights();
        renderPaginationDots();
    }

    function equalizeCardHeights() {
        const cards = cardGroup.querySelectorAll('.card');
        let maxHeight = 0;
        cards.forEach(card => card.style.height = 'auto');
        cards.forEach(card => maxHeight = Math.max(maxHeight, card.offsetHeight));
        cards.forEach(card => card.style.height = maxHeight + 'px');
    }

    function renderPaginationDots() {
        pagination.innerHTML = '';
        const total = products.length;
        let start = currentIndex - Math.floor(visibleDots / 2);
        if (start < 0) start = 0;
        if (start > total - visibleDots) start = total - visibleDots;
        const end = start + visibleDots;
        for (let i = start; i < end; i++) {
            const dot = document.createElement('span');
            dot.className = 'product-dot';
            const middleDotIndex = start + Math.floor(visibleDots / 2);
            if (i === middleDotIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
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

    // Event delegation for Quick View & Add to Cart
    cardGroup.addEventListener('click', (e) => {
        const qBtn = e.target.closest('.quick-view-btn');
        if (qBtn) {
            const idx = parseInt(qBtn.getAttribute('data-index'), 10);
            openQuickView(products[idx]);
            return;
        }
        const addBtn = e.target.closest('.view-product');
        if (addBtn) {
            const idx = parseInt(addBtn.getAttribute('data-index'), 10);
            console.log('Add to cart clicked for', products[idx].title);
            return;
        }
    });

    function openQuickView(product) {
        document.getElementById('modal-product-title').textContent = product.title || '';
        document.getElementById('modal-product-desc').textContent = product.desc || '';
        document.getElementById('modal-product-price').textContent = product.price || '';

        const images = (product.images && product.images.length) ? product.images : [product.img];
        const carouselEl = document.getElementById('productCarousel');
        const carouselInner = carouselEl.querySelector('.carousel-inner');
        const carouselIndicators = carouselEl.querySelector('.carousel-indicators');
        const prevControl = carouselEl.querySelector('.carousel-control-prev');
        const nextControl = carouselEl.querySelector('.carousel-control-next');

        carouselInner.innerHTML = '';
        carouselIndicators.innerHTML = '';

        images.forEach((src, i) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-item' + (i === 0 ? ' active' : '');
            slide.innerHTML = `<img src="${src}" class="d-block w-100" alt="product image ${i + 1}" style="object-fit:cover;">`;
            carouselInner.appendChild(slide);

            if (images.length > 1) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.setAttribute('data-bs-target', '#productCarousel');
                btn.setAttribute('data-bs-slide-to', String(i));
                btn.className = (i === 0 ? 'active' : '');
                btn.setAttribute('aria-label', `Slide ${i + 1}`);
                carouselIndicators.appendChild(btn);
            }
        });

        prevControl.style.display = images.length > 1 ? '' : 'none';
        nextControl.style.display = images.length > 1 ? '' : 'none';
        carouselIndicators.style.display = images.length > 1 ? '' : 'none';

        const oldInstance = bootstrap.Carousel.getInstance(carouselEl);
        if (oldInstance) oldInstance.dispose();
        const carouselInstance = new bootstrap.Carousel(carouselEl, { interval: 3000, touch: true, wrap: true });
        if (images.length > 1) carouselInstance.cycle();
        else carouselInstance.pause();

        const modalEl = document.getElementById('quickViewModal');
        const bsModal = new bootstrap.Modal(modalEl);
        modalEl.addEventListener('shown.bs.modal', () => {
            const rightCol = modalEl.querySelector('.modal-body .row .col-md-6:last-child');
            const targetHeight = rightCol ? rightCol.clientHeight : 400;
            carouselInner.querySelectorAll('img').forEach(img => {
                img.style.height = targetHeight + 'px';
                img.style.objectFit = 'cover';
            });
        }, { once: true });

        new bootstrap.Modal(document.getElementById('quickViewModal')).show();
    }

    // Quantity buttons
    document.getElementById('qty-minus').addEventListener('click', () => {
        const qty = document.getElementById('quantity');
        qty.value = Math.max(1, parseInt(qty.value) - 1);
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
        const qty = document.getElementById('quantity');
        qty.value = parseInt(qty.value) + 1;
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
