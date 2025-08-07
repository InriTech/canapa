/**
 * Canapa Delights - Shop JavaScript
 * Production-ready eCommerce functionality for cannabis products
 */

'use strict';

// ==================== PRELOADER ====================
(function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const loadTimeout = setTimeout(hidePreloader, 4000);
    
    function hidePreloader() {
        clearTimeout(loadTimeout);
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }

    window.addEventListener('load', hidePreloader);
    document.addEventListener('DOMContentLoaded', function() {
        if (document.readyState === 'complete') hidePreloader();
    });
})();

// ==================== PRODUCT DATA ====================
const products = [
    // Cookies Category
    { id: 1, category: "cookies", name: "Choc Chip Cookies", image: "assets/img/products/product-img-1.jpg", link: "chocchip.html", desc: "20mg THC - 10 cookies", price: "R250.00" },
    { id: 2, category: "cookies", name: "Coconut Oat Cookies", image: "assets/img/products/product-img-10.jpg", link: "cookiescocooat.html", desc: "20mg THC - 10 cookies", price: "R250.00" },
    { id: 3, category: "cookies", name: "Chocolate Cookies", image: "assets/img/products/product-img-13.jpg", link: "dcookies.html", desc: "10mg THC - 10 cookies", price: "R150.00" },
    { id: 4, category: "cookies", name: "Spicy Pecan Nut Cookies", image: "assets/img/products/product-img-9.jpg", link: "spicycookies.html", desc: "10mg THC - 10 cookies", price: "R150.00" },
    { id: 5, category: "cookies", name: "Choc Cookie Chips", image: "assets/img/products/product-img-11.jpg", link: "chocookies.html", desc: "20mg THC - 5 cookies", price: "R150.00" },
    { id: 6, category: "cookies", name: "Mini Choc Cookies", image: "assets/img/products/product-img-12.jpg", link: "minicookies.html", desc: "20mg THC - 3 cookies", price: "R100.00" },
    
    // Gummies Category
    { id: 7, category: "gummies", name: "Yummy Gummies", image: "assets/img/products/product-img-2.jpg", link: "yummygummies.html", desc: "20mg THC - 10 pieces", price: "R250.00" },
	{ id: 16, category: "gummies", name: "Yummy Gummies", image: "assets/img/products/product-img-7.jpg", link: "classicgummies.html", desc: "10mg THC - 10 pieces", price: "R150.00" },
    { id: 8, category: "gummies", name: "Sugar Free Gummies", image: "assets/img/products/product-img-8.jpg", link: "freegummies.html", desc: "20mg THC - 10 pieces", price: "R250.00" },
	{ id: 10, category: "gummies", name: "Yummy Gummies 3's", image: "assets/img/products/product-img-16.jpg", link: "sourgummies.html", desc: "20mg THC - 3 pieces", price: "R100.00" },
	{ id: 13, category: "gummies", name: "Yummy Gummies 5's", image: "assets/img/products/product-img-17.jpg", link: "mixedgummies.html", desc: "20mg THC - 5 pieces", price: "R150.00" },
    { id: 9, category: "gummies", name: "Tropical Gummies", image: "assets/img/products/product-img-14.jpg", link: "sodazetropical.html", desc: "25mg THC - 10 pieces", price: "R250.00" },
    { id: 12, category: "gummies", name: "Grape Gummies", image: "assets/img/products/product-img-79.jpg", link: "sodazegrape.html", desc: "25mg THC - 10 pieces", price: "R250.00" },
	{ id: 15, category: "gummies", name: "Raspberry Gummies", image: "assets/img/products/product-img-15.jpg", link: "sodazeraspberry.html", desc: "25mg THC - 10 pieces", price: "R250.00" },
    { id: 11, category: "gummies", name: "CBD Relax Gummies", image: "assets/img/products/product-img-19.jpg", link: "cbdrelaxgummies.html", desc: "20mg CBD - 15 pieces", price: "R250.00" },
    
    
    { id: 14, category: "gummies", name: "Chillax CBD Gummies", image: "assets/img/products/product-img-20.jpg", link: "chillaxcbd.html", desc: "10mg CBD - 15 pieces", price: "R150.00" },
    
    
    { id: 54, category: "gummies", name: "Rainbow Stripz 200mg", image: "assets/img/products/product-img-84.jpg", link: "rainbowstripz.html", desc: "20mg THC - 10 gummies", price: "R250.00" },
   
    { id: 56, category: "gummies", name: "Wacky Worms 300mg", image: "assets/img/products/product-img-86.jpg", link: "wackyworms300.html", desc: "30mg THC - 10 gummies", price: "R350.00" },
    { id: 57, category: "gummies", name: "Heart Stopper 200mg", image: "assets/img/products/product-img-87.jpg", link: "heartstopper200.html", desc: "40mg THC - 5 gummies", price: "R240.00" },
    { id: 58, category: "gummies", name: "Heart Stopper 400mg", image: "assets/img/products/product-img-88.jpg", link: "heartstopper400.html", desc: "40mg THC - 10 gummies", price: "R480.00" },
    { id: 59, category: "gummies", name: "Lifted Love Bites 150mg", image: "assets/img/products/product-img-89.jpg", link: "lovebites150.html", desc: "30mg THC - 5 gummies", price: "R200.00" },
    { id: 60, category: "gummies", name: "Lifted Love Bites 300mg", image: "assets/img/products/product-img-90.jpg", link: "lovebites300.html", desc: "30mg THC - 10 gummies", price: "R350.00" },
    
    // Vapes Category
    { id: 18, category: "vapes", name: "Durban Poison Sativa", image: "assets/img/products/product-img-3.jpg", link: "durbansativa.html", desc: "1ml THC Disposable", price: "R1000.00" },
    { id: 19, category: "vapes", name: "Northern Lights Indica", image: "assets/img/products/product-img-53.jpg", link: "northernlights.html", desc: "1ml THC Disposable", price: "R1000.00" },
    { id: 20, category: "vapes", name: "Live Resin Vape", image: "assets/img/products/product-img-56.jpg", link: "liveresin.html", desc: "1ml Premium Extract", price: "R1300.00" },
    { id: 21, category: "vapes", name: "Gelato Hybrid Cartridge", image: "assets/img/products/product-img-33.jpg", link: "gelatohybrid.html", desc: "0.5ml THC", price: "R500.00" },
    { id: 22, category: "vapes", name: "Jack Herrer Cartridge", image: "assets/img/products/product-img-38.jpg", link: "jack.html", desc: "0.5ml THC", price: "R500.00" },
    { id: 23, category: "vapes", name: "Durban Poison Cartridge", image: "assets/img/products/product-img-30.jpg", link: "durbancartridge.html", desc: "0.5ml THC", price: "R500.00" },
    { id: 24, category: "vapes", name: "Mimosa Sativa Cartridge", image: "assets/img/products/product-img-42.jpg", link: "mimosasativa.html", desc: "0.5ml THC", price: "R500.00" },
    { id: 25, category: "vapes", name: "Sativa Cartridge", image: "assets/img/products/product-img-45.jpg", link: "sativa.html", desc: "1ml THC", price: "R800.00" },
    { id: 26, category: "vapes", name: "Pain CBD Cartridge", image: "assets/img/products/product-img-6.jpg", link: "paincartridge.html", desc: "300mg CBD - 0.5ml", price: "R400.00" },
    { id: 27, category: "vapes", name: "Sleep CBD Cartridge", image: "assets/img/products/product-img-71.jpg", link: "sleepcartridge.html", desc: "300mg CBD - 0.5ml", price: "R400.00" },
    { id: 28, category: "vapes", name: "Relax CBD Cartridge", image: "assets/img/products/product-img-70.jpg", link: "relaxcartridge.html", desc: "300mg CBD - 0.5ml", price: "R400.00" },
    { id: 29, category: "vapes", name: "Vape Battery Pen", image: "assets/img/products/product-img-23.jpg", link: "vapbatterypen.html", desc: "270mAh Battery", price: "R300.00" },
    
    // Oils Category
    { id: 30, category: "oil", name: "Full Spectrum CBD Oil", image: "assets/img/products/product-img-5.jpg", link: "cbdoil.html", desc: "100mg CBD - 15ml", price: "R290.00" },
    { id: 31, category: "oil", name: "Deep Sleep CBD Oil", image: "assets/img/products/product-img-58.jpg", link: "sleepoil.html", desc: "300mg CBD/CBN - 30ml", price: "R1200.00" },
    { id: 32, category: "oil", name: "Pain Relief CBD Oil", image: "assets/img/products/product-img-60.jpg", link: "painoil.html", desc: "300mg CBD - 30ml", price: "R590.00" },
    { id: 33, category: "oil", name: "Pet CBD Oil", image: "assets/img/products/product-img-61.jpg", link: "petoil.html", desc: "300mg CBD - 30ml", price: "R590.00" },
    { id: 34, category: "oil", name: "Relax CBD Oil", image: "assets/img/products/product-img-62.jpg", link: "relaxoil.html", desc: "300mg CBD - 30ml", price: "R590.00" },
    { id: 35, category: "oil", name: "Sleep Aid CBD Oil", image: "assets/img/products/product-img-63.jpg", link: "sleepaidoil.html", desc: "300mg CBD - 30ml", price: "R590.00" },
    { id: 36, category: "oil", name: "Pain Relief CBD Oil", image: "assets/img/products/product-img-60.jpg", link: "painrelief.html", desc: "600mg CBD - 30ml", price: "R790.00" },
    { id: 37, category: "oil", name: "Relax CBD Oil", image: "assets/img/products/product-img-62.jpg", link: "CBD Oils5-600mg.html", desc: "600mg CBD - 30ml", price: "R790.00" },
    { id: 38, category: "oil", name: "Sleep Aid CBD Oil", image: "assets/img/products/product-img-63.jpg", link: "CBD Oils6-600mg.html", desc: "600mg CBD - 30ml", price: "R790.00" },
    
    // Teas Category
    { id: 39, category: "tea", name: "CBD Mint Rooibos Tea", image: "assets/img/products/product-img-64.jpg", link: "minttea.html", desc: "5mg CBD - 10 bags", price: "R100.00" },
    { id: 40, category: "tea", name: "CBD Cinnamon Rooibos Tea", image: "assets/img/products/product-img-65.jpg", link: "cinnamontea.html", desc: "5mg CBD - 10 bags", price: "R100.00" },
    { id: 41, category: "tea", name: "CBD Ginger Rooibos Tea", image: "assets/img/products/product-img-66.jpg", link: "CBD Rooibos Tea2.html", desc: "5mg CBD - 10 bags", price: "R100.00" },
    { id: 42, category: "tea", name: "CBD Pomegranate Rooibos Tea", image: "assets/img/products/product-img-67.jpg", link: "pomegranatetea.html", desc: "5mg CBD - 10 bags", price: "R100.00" },
    { id: 43, category: "tea", name: "CBD Lemongrass Rooibos Tea", image: "assets/img/products/product-img-68.jpg", link: "lemongrasstea.html", desc: "5mg CBD - 10 bags", price: "R100.00" },
    { id: 44, category: "tea", name: "CBD Vanilla Rooibos Tea", image: "assets/img/products/product-img-vanilla.jpg", link: "vanillatea.html", desc: "5mg CBD - 10 bags", price: "R100.00" },
    { id: 45, category: "tea", name: "CBD Original Rooibos Tea", image: "assets/img/products/product-img-original.jpg", link: "originaltea.html", desc: "5mg CBD - 10 bags", price: "R100.00" },
    { id: 46, category: "tea", name: "CBD Honeybush Tea", image: "assets/img/products/product-img-honeybush.jpg", link: "honeybushtea.html", desc: "5mg CBD - 10 bags", price: "R100.00" },
    { id: 47, category: "tea", name: "CBD Chamomile Tea", image: "assets/img/products/product-img-chamomile.jpg", link: "chamomiletea.html", desc: "5mg CBD - 10 bags", price: "R100.00" },
    
    // Sodas Category
    { id: 48, category: "soda", name: "Berry Haze CBD Soda", image: "assets/img/products/product-img-82.jpg", link: "berrysoda.html", desc: "30mg CBD per can", price: "R70.00" },
    { id: 49, category: "soda", name: "Cherry Pop THC Soda", image: "assets/img/products/product-img-81.jpg", link: "cherrysoda.html", desc: "30mg THC per can", price: "R70.00" },
    { id: 61, category: "soda", name: "Sodaze Tropical Punch Soda", image: "assets/img/products/product-img-91.jpg", link: "tropicalpunchsoda.html", desc: "30mg THC per can", price: "R70.00" },
    
    // Treats Category
    { id: 51, category: "treats", name: "CBD Dog Treats", image: "assets/img/products/product-img-4.jpg", link: "dogtreats.html", desc: "5mg CBD - 10 pieces", price: "R200.00" },
    { id: 52, category: "treats", name: "THC Lollipops", image: "assets/img/products/product-img-75.jpg", link: "lollipops.html", desc: "20mg THC each", price: "R80.00" },
    { id: 53, category: "treats", name: "Sex Shot", image: "assets/img/products/product-img-83.jpeg", link: "sexshot.html", desc: "5mg CBD each", price: "R35.00" }
];

// ==================== AGE VERIFICATION ====================
(function initAgeVerification() {
    const agePopup = document.getElementById('ageVerificationPopup');
    const overlay = document.getElementById('overlay');
    if (!sessionStorage.getItem('ageVerified') && !localStorage.getItem('ageVerified')) {
        if (agePopup) agePopup.style.display = 'block';
        if (overlay) overlay.style.display = 'block';
    }
    
    const confirmBtn = agePopup?.querySelector('.confirmButton');
    const declineBtn = agePopup?.querySelector('.declineButton');
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            localStorage.setItem('ageVerified', 'true');
            sessionStorage.setItem('ageVerified', 'true');
            if (agePopup) agePopup.style.display = 'none';
            if (overlay) overlay.style.display = 'none';
        });
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            window.location.href = 'https://www.google.com';
        });
    }
})();

// ==================== PRODUCT DISPLAY & PAGINATION ====================
document.addEventListener('DOMContentLoaded', function() {
    const productsPerPage = 12;
    const productContainer = document.getElementById('productContainer');
    const paginationContainer = document.getElementById('pagination');
    let currentPage = 1;

    // Get current page from URL
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam && !isNaN(pageParam)) {
        currentPage = Math.max(1, parseInt(pageParam));
    }

    function displayProducts(page) {
        if (!productContainer) return;

        const startIndex = (page - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, products.length);
        let productsHTML = '';

        for (let i = startIndex; i < endIndex; i++) {
            const product = products[i];
            if (!product) continue;

            productsHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4 ${product.category}">
                    <div class="single-product-item">
                        <div class="product-image">
                            <a href="${product.link}">
                                <img src="${product.image}" alt="${product.name}" loading="lazy" class="lazy-load">
                            </a>
                        </div>
                        <h3>${product.name}</h3>
                        <p class="product-price"><span>${product.desc}</span> ${product.price}</p>
                        <button class="cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>`;
        }

        productContainer.innerHTML = productsHTML;
        initLazyLoading();
        updatePagination(page);
        new CartSystem();
    }

    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img.lazy-load');
        if (!('IntersectionObserver' in window)) {
            lazyImages.forEach(img => {
                img.src = img.getAttribute('src');
            });
            return;
        }

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '100px 0px', threshold: 0.1 });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    function updatePagination(currentPage) {
        if (!paginationContainer) return;
        
        const totalPages = Math.ceil(products.length / productsPerPage);
        let paginationHTML = '';

        // Previous button
        paginationHTML += `<a href="?page=${currentPage - 1}" ${currentPage <= 1 ? 'class="disabled"' : ''}>« Previous</a>`;

        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages/2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (startPage > 1) paginationHTML += `<a href="?page=1">1</a>`;
        if (startPage > 2) paginationHTML += `<span>...</span>`;
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `<a href="?page=${i}" ${i === currentPage ? 'class="active"' : ''}>${i}</a>`;
        }

        if (endPage < totalPages - 1) paginationHTML += `<span>...</span>`;
        if (endPage < totalPages) paginationHTML += `<a href="?page=${totalPages}">${totalPages}</a>`;

        // Next button
        paginationHTML += `<a href="?page=${currentPage + 1}" ${currentPage >= totalPages ? 'class="disabled"' : ''}>Next »</a>`;

        paginationContainer.innerHTML = paginationHTML;

        // Add click handlers
        document.querySelectorAll('#pagination a:not(.disabled)').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('href').split('=')[1];
                window.history.pushState({}, '', `?page=${page}`);
                currentPage = parseInt(page);
                displayProducts(currentPage);
            });
        });
    }

    // Initial display
    displayProducts(currentPage);
    
    window.addEventListener('popstate', () => {
        const urlParams = new URLSearchParams(window.location.search);
        currentPage = parseInt(urlParams.get('page')) || 1;
        displayProducts(currentPage);
    });
});

// ==================== CART SYSTEM ====================
class CartSystem {
    constructor() {
        try {
            this.cart = JSON.parse(localStorage.getItem('cart')) || [];
            this.initShopPage();
        } catch (e) {
            console.error('Cart initialization error:', e);
            this.cart = [];
        }
    }

    initShopPage() {
        this.updateHeaderCartCount();
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cart-btn')) this.addToCart(e);
        });
    }

    addToCart(e) {
        const button = e.target.closest('.cart-btn');
        const productCard = button?.closest('.single-product-item');
        if (!button || !productCard) return;

        const priceText = productCard.querySelector('.product-price')?.textContent;
        const price = priceText ? parseFloat(priceText.match(/R([\d.]+)/)[1]) : 0;
        const product = {
            id: button.dataset.productId,
            name: productCard.querySelector('h3')?.textContent || 'Unknown Product',
            price: price,
            image: productCard.querySelector('img')?.src || 'assets/img/default-product.png',
            quantity: 1
        };

        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push(product);
        }
        
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateHeaderCartCount();
        this.showAddedNotification(button);
    }

    updateHeaderCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountSpan = document.querySelector('.cart-count');
        if (cartCountSpan) cartCountSpan.textContent = count;
    }

    showAddedNotification(button) {
        const parentNode = button.parentNode;
        if (!parentNode) return;
        
        const existingNotif = parentNode.querySelector('.cart-notification');
        if (existingNotif) existingNotif.remove();
        
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = 'Added to cart!';
        parentNode.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }
}

// ==================== FIREBASE CONFIGURATION ====================
const firebaseConfig = {
    apiKey: "AIzaSyCiJnj-Z9TXTeMelX_CTw8KM28_BaQW6bo",
    authDomain: "canapa-delight.firebaseapp.com",
    databaseURL: "https://canapa-delight-default-rtdb.firebaseio.com",
    projectId: "canapa-delight",
    storageBucket: "canapa-delight.appspot.com",
    messagingSenderId: "35385881641",
    appId: "1:35385881641:web:846ac0863099c5c64c1838",
    measurementId: "G-6GMPH5C04L"
};

// Initialize Firebase
let auth, database;
try {
    const app = firebase.initializeApp(firebaseConfig);
    auth = firebase.getAuth(app);
    database = firebase.getDatabase(app);
    
    firebase.onAuthStateChanged(auth, (user) => {
        const loginNav = document.getElementById('loginNav');
        const signupNav = document.getElementById('signupNav');
        const accountNav = document.getElementById('accountNav');
        const logoutNav = document.getElementById('logoutNav');
        
        if (user) {
            if (loginNav) loginNav.style.display = 'none';
            if (signupNav) signupNav.style.display = 'none';
            if (accountNav) accountNav.style.display = 'inline-block';
            if (logoutNav) logoutNav.style.display = 'inline-block';
        } else {
            if (loginNav) loginNav.style.display = 'inline-block';
            if (signupNav) signupNav.style.display = 'inline-block';
            if (accountNav) accountNav.style.display = 'none';
            if (logoutNav) logoutNav.style.display = 'none';
        }
    });
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// ==================== UTILITY FUNCTIONS ====================
window.showModal = function(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        modal.querySelector('input, button')?.focus();
    }
};

window.hideModal = function(modal) {
    if (modal) modal.style.display = 'none';
};

window.closeAllModals = function() {
    window.hideModal(document.getElementById('loginModal'));
    window.hideModal(document.getElementById('signupModal'));
    document.getElementById('overlay').style.display = 'none';
};

window.displayError = function(element, error) {
    if (element) {
        element.textContent = "Error: " + error.message.replace('Firebase: ', '');
    }
};

window.setLoading = function(button, isLoading, originalText) {
    if (button) {
        button.disabled = isLoading;
        button.textContent = isLoading ? 'Processing...' : originalText;
    }
};

window.checkPasswordStrength = function(password) {
    const passwordStrengthDiv = document.getElementById('passwordStrength');
    if (!passwordStrengthDiv) return;
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    switch (strength) {
        case 0:
        case 1:
        case 2:
            passwordStrengthDiv.textContent = 'Weak';
            passwordStrengthDiv.style.color = 'red';
            break;
        case 3:
            passwordStrengthDiv.textContent = 'Medium';
            passwordStrengthDiv.style.color = 'orange';
            break;
        case 4:
        case 5:
            passwordStrengthDiv.textContent = 'Strong';
            passwordStrengthDiv.style.color = 'green';
            break;
        default:
            passwordStrengthDiv.textContent = '';
            break;
    }
    
    if (!password) passwordStrengthDiv.textContent = '';
};

window.showLogin = function() {
    window.showModal(document.getElementById('loginModal'));
    const loginError = document.getElementById('loginError');
    if (loginError) loginError.textContent = '';
};

window.showSignup = function() {
    window.showModal(document.getElementById('signupModal'));
    const signupError = document.getElementById('signupError');
    if (signupError) signupError.textContent = '';
};

window.toggleMenu = function() {
    const mainMenu = document.querySelector('.main-menu');
    if (mainMenu) mainMenu.classList.toggle('active');
};

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Show signup/login links
    const showSignupLink = document.getElementById('showSignupLink');
    const showLoginLink = document.getElementById('showLoginLink');
    
    if (showSignupLink) {
        showSignupLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.showSignup();
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.showLogin();
        });
    }

    // Modal close handlers
    document.querySelectorAll('.closeButton').forEach(btn => {
        btn.addEventListener('click', window.closeAllModals);
    });
    
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', window.closeAllModals);
    }
    
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => e.stopPropagation());
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && document.getElementById('overlay')?.style.display === 'block') {
            window.closeAllModals();
        }
    });

    // Password toggle
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            if (passwordInput) {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            }
        });
    });

    // Password strength checker
    const signupPasswordInput = document.getElementById('signupPassword');
    if (signupPasswordInput) {
        signupPasswordInput.addEventListener('input', function() {
            window.checkPasswordStrength(this.value);
        });
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const button = this.querySelector('button[type="submit"]');
            const loginError = document.getElementById('loginError');
            
            window.setLoading(button, true, 'Login');
            if (loginError) loginError.textContent = '';
            
            try {
                await firebase.signInWithEmailAndPassword(auth, email, password);
                window.closeAllModals();
            } catch (error) {
                if (loginError) window.displayError(loginError, error);
            } finally {
                window.setLoading(button, false, 'Login');
            }
        });
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const button = this.querySelector('button[type="submit"]');
            const signupError = document.getElementById('signupError');
            
            if (password.length < 6) {
                if (signupError) signupError.textContent = "Password must be at least 6 characters long.";
                return;
            }
            
            window.setLoading(button, true, 'Sign Up');
            if (signupError) signupError.textContent = '';
            
            try {
                const userCredential = await firebase.createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await firebase.set(firebase.ref(database, 'users/' + user.uid), {
                    name: name,
                    email: email,
                    createdAt: firebase.serverTimestamp()
                });
                window.closeAllModals();
            } catch (error) {
                if (signupError) window.displayError(signupError, error);
            } finally {
                window.setLoading(button, false, 'Sign Up');
            }
        });
    }

    // Logout button
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async function(e) {
            e.preventDefault();
            try {
                await firebase.signOut(auth);
            } catch (error) {
                console.error("Logout Error:", error);
            }
        });
    }

    // Safe email display
    document.querySelectorAll('.safe-email').forEach(element => {
        const user = element.dataset.user;
        const domain = element.dataset.domain;
        if (user && domain) {
            element.innerHTML = `<a href="mailto:${user}@${domain}">${user}@${domain}</a>`;
        }
    });
});