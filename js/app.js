import { products, utils } from './utilities.js';

const app = {
    init: function() {
        // Common initialization for all pages
        utils.initCart();
        utils.initHeader();

        // Page specific initialization
        const pageName = document.body.getAttribute('data-page');
        switch(pageName) {
            case 'home':
                this.initHome();
                break;
            case 'product':
                this.initProduct();
                break;
            // Add more pages as needed
        }
    },

    initHome: function() {
        // Home page specific code
        // ...existing home page carousel and product logic...
    },

    initProduct: function() {
        // Product page specific code
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());

export default app;
