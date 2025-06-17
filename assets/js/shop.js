// --- PRELOADER LOGIC ---
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    function hidePreloader() {
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }
    setTimeout(hidePreloader, 2000);
});

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="javascript"])');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href.includes('#') || this.href.startsWith('javascript:')) return;
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.display = 'flex';
                preloader.style.opacity = '1';
            }
        });
    });
});


// --- SHOP APPLICATION LOGIC ---

// Product data array
const products = [
    { id: 1, category: "cookies", name: "Choc Chip Cookies", image: "assets/img/products/product-img-1.jpg", link: "chocchip.html", desc: "20mg THC - 10 cookies", price: "R250.00" },
    { id: 2, category: "cookies", name: "Coconut Oat Cookies", image: "assets/img/products/product-img-10.jpg", link: "cookiescocooat.html", desc: "20mg THC - 10 cookies", price: "R250.00" },
    { id: 3, category: "cookies", name: "Chocolate Cookies", image: "assets/img/products/product-img-13.jpg", link: "dcookies.html", desc: "10mg THC - 10 cookies", price: "R150.00" },
    { id: 4, category: "cookies", name: "Spicy Pecan Nut Cookies", image: "assets/img/products/product-img-9.jpg", link: "spicycookies.html", desc: "10mg THC - 10 cookies", price: "R150.00" },
    { id: 5, category: "cookies", name: "Choc Cookie Chips", image: "assets/img/products/product-img-11.jpg", link: "chocookies.html", desc: "20mg THC - 5 cookies", price: "R150.00" },
    { id: 6, category: "cookies", name: "Mini Choc Cookies", image: "assets/img/products/product-img-12.jpg", link: "minicookies.html", desc: "20mg THC - 3 cookies", price: "R100.00" },
    { id: 7, category: "gummies", name: "Yummy Gummies", image: "assets/img/products/product-img-2.jpg", link: "yummygummies.html", desc: "20mg THC - 10 pieces", price: "R250.00" },
    { id: 8, category: "gummies", name: "Sugar Free Gummies", image: "assets/img/products/product-img-8.jpg", link: "freegummies.html", desc: "20mg THC - 10 pieces", price: "R250.00" },
    { id: 9, category: "gummies", name: "Tropical Gummies", image: "assets/img/products/product-img-14.jpg", link: "sodazetropical.html", desc: "20mg THC - 10 pieces", price: "R250.00" },
    { id: 10, category: "gummies", name: "Sour Gummies", image: "assets/img/products/product-img-16.jpg", link: "sourgummies.html", desc: "10mg THC - 5 pieces", price: "R100.00" },
    { id: 11, category: "gummies", name: "CBD Relax Gummies", image: "assets/img/products/product-img-19.jpg", link: "cbdrelaxgummies.html", desc: "20mg CBD - 15 pieces", price: "R250.00" },
    { id: 12, category: "gummies", name: "Grape Gummies", image: "assets/img/products/product-img-79.jpg", link: "sodazegrape.html", desc: "20mg THC - 10 pieces", price: "R250.00" },
    { id: 13, category: "gummies", name: "Mixed Gummies Pack", image: "assets/img/products/product-img-17.jpg", link: "mixedgummies.html", desc: "20mg THC - 5 pieces", price: "R150.00" },
    { id: 14, category: "gummies", name: "Chillax CBD Gummies", image: "assets/img/products/product-img-20.jpg", link: "chillaxcbd.html", desc: "10mg CBD - 15 pieces", price: "R150.00" },
    { id: 15, category: "gummies", name: "Raspberry Gummies", image: "assets/img/products/product-img-15.jpg", link: "sodazeraspberry.html", desc: "20mg THC - 10 pieces", price: "R250.00" },
    { id: 16, category: "gummies", name: "Yummy Gummies", image: "assets/img/products/product-img-7.jpg", link: "classicgummies.html", desc: "10mg THC - 10 pieces", price: "R150.00" },
    { id: 17, category: "gummies", name: "Chocolate Fudge", image: "assets/img/products/product-img-18.jpg", link: "Fudge.html", desc: "20mg THC - 2 pieces", price: "R120.00" },
    { id: 18, category: "vapes", name: "Durban Poison Sativa", image: "assets/img/products/product-img-3.jpg", link: "durbansativa.html", desc: "1ml THC Disposable", price: "R1000.00" },
    { id: 19, category: "vapes", name: "Northern Lights Indica", image: "assets/img/products/product-img-53.jpg", link: "northernlights.html", desc: "1ml THC Disposable", price: "R1000.00" },
    { id: 20, category: "vapes", name: "Live Resin Vape", image: "assets/img/products/product-img-56.jpg", link: "liveresin.html", desc: "1ml Premium Extract", price: "R1200.00" },
    { id: 21, category: "vapes", name: "Gelato Hybrid Cartridge", image: "assets/img/products/product-img-33.jpg", link: "gelatohybrid.html", desc: "0.5ml THC", price: "R500.00" },
    { id: 22, category: "vapes", name: "Jack Herrer Cartridge", image: "assets/img/products/product-img-38.jpg", link: "jack.html", desc: "0.5ml THC", price: "R500.00" },
    { id: 23, category: "vapes", name: "Durban Poison Cartridge", image: "assets/img/products/product-img-30.jpg", link: "durbancartridge.html", desc: "0.5ml THC", price: "R500.00" },
    { id: 24, category: "vapes", name: "Mimosa Sativa Cartridge", image: "assets/img/products/product-img-42.jpg", link: "mimosasativa.html", desc: "0.5ml THC", price: "R500.00" },
    { id: 25, category: "vapes", name: "Sativa Cartridge", image: "assets/img/products/product-img-45.jpg", link: "sativa.html", desc: "1ml THC", price: "R800.00" },
    { id: 26, category: "vapes", name: "Pain CBD Cartridge", image: "assets/img/products/product-img-6.jpg", link: "paincartridge.html", desc: "300mg CBD - 0.5ml", price: "R400.00" },
    { id: 27, category: "vapes", name: "Sleep CBD Cartridge", image: "assets/img/products/product-img-71.jpg", link: "sleepcartridge.html", desc: "300mg CBD - 0.5ml", price: "R400.00" },
    { id: 28, category: "vapes", name: "Relax CBD Cartridge", image: "assets/img/products/product-img-70.jpg", link: "relaxcartridge.html", desc: "300mg CBD - 0.5ml", price: "R400.00" },
    { id: 29, category: "vapes", name: "Vape Battery Pen", image: "assets/img/products/product-img-23.jpg", link: "vapbatterypen.html", desc: "270mAh Battery", price: "R300.00" },
    { id: 30, category: "oil", name: "Full Spectrum CBD Oil", image: "assets/img/products/product-img-5.jpg", link: "cbdoil.html", desc: "100mg CBD - 15ml", price: "R290.00" },
    { id: 31, category: "oil", name: "Deep Sleep CBD Oil", image: "assets/img/products/product-img-58.jpg", link: "sleepoil.html", desc: "300mg CBD/CBN - 30ml", price: "R1200.00" },
    { id: 32, category: "oil", name: "Pain Relief CBD Oil", image: "assets/img/products/product-img-60.jpg", link: "painoil.html", desc: "300mg CBD - 30ml", price: "R590.00" },
    { id: 33, category: "oil", name: "Pet CBD Oil", image: "assets/img/products/product-img-61.jpg", link: "petoil.html", desc: "300mg CBD - 30ml", price: "R590.00" },
    { id: 34, category: "oil", name: "Relax CBD Oil", image: "assets/img/products/product-img-62.jpg", link: "relaxoil.html", desc: "300mg CBD - 30ml", price: "R590.00" },
    { id: 35, category: "oil", name: "Sleep Aid CBD Oil", image: "assets/img/products/product-img-63.jpg", link: "sleepaidoil.html", desc: "300mg CBD - 30ml", price: "R590.00" },
    { id: 36, category: "oil", name: "Pain Relief CBD Oil", image: "assets/img/products/product-img-60.jpg", link: "painrelief.html", desc: "600mg CBD - 30ml", price: "R790.00" },
    { id: 37, category: "oil", name: "Relax CBD Oil", image: "assets/img/products/product-img-62.jpg", link: "CBD Oils5-600mg.html", desc: "600mg CBD - 30ml", price: "R790.00" },
    { id: 38, category: "oil", name: "Sleep Aid CBD Oil", image: "assets/img/products/product-img-63.jpg", link: "CBD Oils6-600mg.html", desc: "600mg CBD - 30ml", price: "R790.00" },
    { id: 39, category: "tea", name: "CBD Mint Rooibos Tea", image: "assets/img/products/product-img-64.jpg", link: "minttea.html", desc: "5mg CBD - 20 bags", price: "R100.00" },
    { id: 40, category: "tea", name: "CBD Cinnamon Rooibos Tea", image: "assets/img/products/product-img-65.jpg", link: "cinnamontea.html", desc: "5mg CBD - 20 bags", price: "R100.00" },
    { id: 41, category: "tea", name: "CBD Ginger Rooibos Tea", image: "assets/img/products/product-img-66.jpg", link: "CBD Rooibos Tea2.html", desc: "5mg CBD - 20 bags", price: "R100.00" },
    { id: 42, category: "tea", name: "CBD Pomegranate Rooibos Tea", image: "assets/img/products/product-img-67.jpg", link: "pomegranatetea.html", desc: "5mg CBD - 20 bags", price: "R100.00" },
    { id: 43, category: "tea", name: "CBD Lemongrass Rooibos Tea", image: "assets/img/products/product-img-68.jpg", link: "lemongrasstea.html", desc: "5mg CBD - 20 bags", price: "R100.00" },
    { id: 44, category: "tea", name: "CBD Vanilla Rooibos Tea", image: "assets/img/products/product-img-vanilla.jpg", link: "vanillatea.html", desc: "5mg CBD - 20 bags", price: "R100.00" },
    { id: 45, category: "tea", name: "CBD Original Rooibos Tea", image: "assets/img/products/product-img-original.jpg", link: "originaltea.html", desc: "5mg CBD - 20 bags", price: "R100.00" },
    { id: 46, category: "tea", name: "CBD Honeybush Tea", image: "assets/img/products/product-img-honeybush.jpg", link: "honeybushtea.html", desc: "5mg CBD - 20 bags", price: "R100.00" },
    { id: 47, category: "tea", name: "CBD Chamomile Tea", image: "assets/img/products/product-img-chamomile.jpg", link: "chamomiletea.html", desc: "5mg CBD - 20 bags", price: "R100.00" },
    { id: 48, category: "soda", name: "Berry Haze CBD Soda", image: "assets/img/products/product-img-82.jpg", link: "berrysoda.html", desc: "30mg CBD per can", price: "R70.00" },
    { id: 49, category: "soda", name: "Cherry Pop THC Soda", image: "assets/img/products/product-img-81.jpg", link: "cherrysoda.html", desc: "30mg THC per can", price: "R70.00" },
    { id: 50, category: "soda", name: "Blueberry Lemonade Soda", image: "assets/img/products/product-img-80.jpg", link: "lemonadesoda.html", desc: "30mg THC per can", price: "R70.00" },
    { id: 51, category: "treats", name: "CBD Dog Treats", image: "assets/img/products/product-img-4.jpg", link: "dogtreats.html", desc: "5mg CBD - 10 pieces", price: "R200.00" },
    { id: 52, category: "treats", name: "THC Lollipops", image: "assets/img/products/product-img-75.jpg", link: "lollipops.html", desc: "20mg THC each", price: "R80.00" },
    { id: 53, category: "treats", name: "Sex Shot", image: "assets/img/products/product-img-83.jpeg", link: "sexshot.html", desc: "5mg CBD each", price: "R35.00" }
];

// Immediately initialize age verification
(function() {
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
            alert("You must be 18 or older to enter.");
            window.location.href = 'https://www.google.com';
        });
    }
})();

// Pagination and product loading
document.addEventListener('DOMContentLoaded', function() {
    const productsPerPage = 12;
    const productContainer = document.getElementById('productContainer');
    const paginationContainer = document.getElementById('pagination');
    let currentPage = 1;

    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam && !isNaN(pageParam) && pageParam > 0) {
        currentPage = parseInt(pageParam);
    }

    function displayProducts(page) {
        if (!productContainer) return;

        let allProductsHTML = '';
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, products.length);

        for (let i = startIndex; i < endIndex; i++) {
            const product = products[i];
            const productHTML = `
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
                </div>
            `;
            allProductsHTML += productHTML;
        }

        productContainer.innerHTML = allProductsHTML;

        initLazyLoading();
        updatePagination(page);
        new CartSystem();

        // --- NEW CODE ---
        // Find the top of the product section and scroll to it smoothly.
        const productSection = document.querySelector('.product-section');
        if (productSection) {
            productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img.lazy-load');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('src');
                    img.classList.add('loaded');
                    const productItem = img.closest('.single-product-item');
                    if (productItem) {
                        productItem.classList.add('loaded');
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '100px 0px', threshold: 0.1 });
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    function updatePagination(currentPage) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(products.length / productsPerPage);

        const prevDisabled = currentPage <= 1 ? 'disabled' : '';
        paginationContainer.innerHTML += `<a href="?page=${currentPage - 1}" class="${prevDisabled}" ${prevDisabled ? 'tabindex="-1"' : ''}>&laquo; Previous</a>`;

        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        if (startPage > 1) {
            paginationContainer.innerHTML += `<a href="?page=1">1</a>`;
            if (startPage > 2) paginationContainer.innerHTML += `<span>...</span>`;
        }
        for (let i = startPage; i <= endPage; i++) {
            const activeClass = i === currentPage ? 'active' : '';
            paginationContainer.innerHTML += `<a href="?page=${i}" class="${activeClass}">${i}</a>`;
        }
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) paginationContainer.innerHTML += `<span>...</span>`;
            paginationContainer.innerHTML += `<a href="?page=${totalPages}">${totalPages}</a>`;
        }

        const nextDisabled = currentPage >= totalPages ? 'disabled' : '';
        paginationContainer.innerHTML += `<a href="?page=${currentPage + 1}" class="${nextDisabled}" ${nextDisabled ? 'tabindex="-1"' : ''}>Next &raquo;</a>`;

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

    displayProducts(currentPage);

    window.addEventListener('popstate', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        currentPage = pageParam ? parseInt(pageParam) : 1;
        displayProducts(currentPage);
    });
});

// Cart System
class CartSystem {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.initShopPage();
    }
    initShopPage() {
        this.updateHeaderCartCount();
        this.setupAddToCartListeners();
    }
    setupAddToCartListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cart-btn')) this.addToCart(e);
        });
    }
    addToCart(e) {
        const button = e.target.closest('.cart-btn');
        if (!button) return;
        const productCard = button.closest('.single-product-item');
        if (!productCard) return;
        const priceTextElement = productCard.querySelector('.product-price');
        let price = 0;
        if (priceTextElement) {
            const priceMatch = priceTextElement.textContent.match(/R([\d.]+)/);
            price = priceMatch ? parseFloat(priceMatch[1]) : 0;
        }
        const nameElement = productCard.querySelector('h3');
        const imageElement = productCard.querySelector('img');
        const product = {
            id: button.dataset.productId,
            name: nameElement ? nameElement.textContent : 'Unknown Product',
            price: price,
            image: imageElement ? imageElement.src : 'assets/img/default-product.png',
            quantity: 1
        };
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) existingItem.quantity++;
        else this.cart.push(product);
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

// Firebase and other functionality
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
let auth, database;
// Firebase functions will be available globally via the SDK script tags in the HTML
const { initializeApp } = firebase;
const { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = firebase.auth;
const { getDatabase, ref, set, serverTimestamp } = firebase.database;

try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    database = getDatabase(app);
    console.log("Firebase initialized successfully for Shop Page");
    onAuthStateChanged(auth, (user) => {
        const loginNav = document.getElementById('loginNav'),
            signupNav = document.getElementById('signupNav'),
            accountNav = document.getElementById('accountNav'),
            logoutNav = document.getElementById('logoutNav');
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

// Utility functions made available globally
window.showModal = (modal) => { if (modal) { modal.style.display = 'block'; document.getElementById('overlay').style.display = 'block'; modal.querySelector('input, button')?.focus(); } };
window.hideModal = (modal) => { if (modal) modal.style.display = 'none'; };
window.closeAllModals = () => { window.hideModal(document.getElementById('loginModal')); window.hideModal(document.getElementById('signupModal')); document.getElementById('overlay').style.display = 'none'; };
window.displayError = (element, error) => { if (element) element.textContent = "Error: " + error.message.replace('Firebase: ', ''); console.error(error); };
window.setLoading = (button, isLoading, originalText) => { if (button) { button.disabled = isLoading; button.textContent = isLoading ? 'Processing...' : originalText; } };
window.checkPasswordStrength = (password) => {
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
window.showLogin = () => { window.showModal(document.getElementById('loginModal')); const loginError = document.getElementById('loginError'); if (loginError) loginError.textContent = ''; };
window.showSignup = () => { window.showModal(document.getElementById('signupModal')); const signupError = document.getElementById('signupError'); if (signupError) signupError.textContent = ''; };
window.toggleMenu = () => { const mainMenu = document.querySelector('.main-menu'); if (mainMenu) mainMenu.classList.toggle('active'); };


document.addEventListener('DOMContentLoaded', () => {
    const showSignupLink = document.getElementById('showSignupLink');
    const showLoginLink = document.getElementById('showLoginLink');
    if (showSignupLink) showSignupLink.addEventListener('click', (e) => { e.preventDefault(); window.showSignup(); });
    if (showLoginLink) showLoginLink.addEventListener('click', (e) => { e.preventDefault(); window.showLogin(); });

    document.querySelectorAll('.closeButton').forEach(btn => btn.addEventListener('click', window.closeAllModals));
    document.getElementById('overlay')?.addEventListener('click', window.closeAllModals);
    document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', (e) => e.stopPropagation()));
    document.addEventListener('keydown', (e) => { if (e.key === "Escape" && document.getElementById('overlay')?.style.display === 'block') window.closeAllModals(); });

    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const passwordInput = toggle.previousElementSibling;
            if (passwordInput) {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                toggle.classList.toggle('fa-eye');
                toggle.classList.toggle('fa-eye-slash');
            }
        });
    });

    const signupPasswordInput = document.getElementById('signupPassword');
    if (signupPasswordInput) signupPasswordInput.addEventListener('input', () => window.checkPasswordStrength(signupPasswordInput.value));

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value,
                password = document.getElementById('loginPassword').value,
                button = e.target.querySelector('button[type="submit"]'),
                loginError = document.getElementById('loginError');
            window.setLoading(button, true, 'Login');
            if (loginError) loginError.textContent = '';
            try {
                await signInWithEmailAndPassword(auth, email, password);
                window.closeAllModals();
                alert("Logged in successfully!");
            } catch (error) {
                if (loginError) window.displayError(loginError, error);
            } finally {
                window.setLoading(button, false, 'Login');
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value,
                email = document.getElementById('signupEmail').value,
                password = document.getElementById('signupPassword').value,
                button = e.target.querySelector('button[type="submit"]'),
                signupError = document.getElementById('signupError');
            if (password.length < 6) {
                if (signupError) signupError.textContent = "Password must be at least 6 characters long.";
                return;
            }
            window.setLoading(button, true, 'Sign Up');
            if (signupError) signupError.textContent = '';
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await set(ref(database, 'users/' + user.uid), { name: name, email: email, createdAt: serverTimestamp() });
                window.closeAllModals();
                alert("Account created successfully!");
            } catch (error) {
                if (signupError) window.displayError(signupError, error);
            } finally {
                window.setLoading(button, false, 'Sign Up');
            }
        });
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async (e) => {
            e.preventDefault();
            try { await signOut(auth);
                alert("Logged out successfully!"); } catch (error) { console.error("Logout Error:", error);
                alert("Failed to log out."); }
        });
    }

    document.querySelectorAll('.safe-email').forEach(element => {
        const user = element.dataset.user,
            domain = element.dataset.domain;
        element.innerHTML = `<a href="mailto:${user}@${domain}">${user}@${domain}</a>`;
    });
});