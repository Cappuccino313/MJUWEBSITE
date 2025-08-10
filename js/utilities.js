// Shared data
const products = [
    // ...existing products array...
];

// Shared utilities
const utils = {
    initCart: function() {
        const cartBtn = document.getElementById('cart-btn');
        if (cartBtn) {
            cartBtn.onclick = function (e) {
                e.preventDefault();
                var cartSidebar = new bootstrap.Offcanvas(document.getElementById('cartSidebar'));
                cartSidebar.show();
            };
        }
    },

    initHeader: function() {
        let lastScrollY = window.scrollY;
        const header = document.querySelector('header.sticky-top');
        // ...existing header scroll logic...
    },

    showProductModal: function(product) {
        document.getElementById('modalProductImg').src = product.img;
        document.getElementById('modalProductName').textContent = product.title;
        document.getElementById('modalProductDesc').textContent = product.desc;
        document.getElementById('modalProductPrice').textContent = product.price;
        document.getElementById('modalProductCountry').textContent = product.country || 'Unknown';
        document.getElementById('modalGrams').selectedIndex = 0;
        document.getElementById('modalGrind').selectedIndex = 0;
        document.getElementById('modalQty').value = 1;
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    }
};

export { products, utils };
