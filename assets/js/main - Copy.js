
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getDatabase, ref, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// --- PRELOADER LOGIC ---

// Hide preloader when everything is loaded
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    // Function to hide the preloader
    function hidePreloader() {
        if (preloader) {
            // Fade out the preloader
            preloader.style.opacity = '0';
            
            // Remove it from the DOM after fade out completes
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }

    // Wait 2 seconds (2000 milliseconds) AFTER the page is loaded, then hide it
    setTimeout(hidePreloader, 2000); 
});

// Show preloader when navigating away from the page
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="javascript"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't intercept if it's a hash link or special javascript action
            if (this.href.includes('#') || this.href.startsWith('javascript:')) return;
            
            // Show preloader
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.display = 'flex'; // Use flex to re-enable centering
                preloader.style.opacity = '1';
            }
        });
    });
});


// --- MAIN APPLICATION LOGIC ---

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
try { 
    const app = initializeApp(firebaseConfig); 
    auth = getAuth(app); 
    database = getDatabase(app); 
    console.log("Firebase initialized successfully");
} catch (error) { 
    console.error("Firebase initialization error:", error); 
}

const agePopup = document.getElementById('ageVerificationPopup');
const overlay = document.getElementById('overlay');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginError = document.getElementById('loginError');
const signupError = document.getElementById('signupError');
const passwordToggles = document.querySelectorAll('.password-toggle');
const signupPasswordInput = document.getElementById('signupPassword');
const passwordStrengthDiv = document.getElementById('passwordStrength');
const loginNav = document.getElementById('loginNav');
const signupNav = document.getElementById('signupNav');
const accountNav = document.getElementById('accountNav');
const logoutNav = document.getElementById('logoutNav');
const logoutButton = document.getElementById('logoutButton');
const mainMenu = document.querySelector('.main-menu');

const showModal = (modal) => { if(modal) { modal.style.display = 'block'; overlay.style.display = 'block'; modal.querySelector('input, button')?.focus(); }};
const hideModal = (modal) => { if(modal) modal.style.display = 'none'; };
const closeAllModals = () => { hideModal(loginModal); hideModal(signupModal); if(overlay) overlay.style.display = 'none'; };
const displayError = (element, error) => { if(element) element.textContent = "Error: " + error.message.replace('Firebase: ', ''); console.error(error); };
const setLoading = (button, isLoading, originalText) => { if(button) { button.disabled = isLoading; button.textContent = isLoading ? 'Processing...' : originalText; }};
const checkPasswordStrength = (password) => {
    if (!passwordStrengthDiv) return; let strength = 0;
    if (password.length >= 8) strength++; if (password.match(/[a-z]/)) strength++; if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++; if (password.match(/[^a-zA-Z0-9]/)) strength++;
    switch (strength) { 
        case 0: case 1: case 2: passwordStrengthDiv.textContent = 'Weak'; passwordStrengthDiv.style.color = 'red'; break;
        case 3: passwordStrengthDiv.textContent = 'Medium'; passwordStrengthDiv.style.color = 'orange'; break;
        case 4: case 5: passwordStrengthDiv.textContent = 'Strong'; passwordStrengthDiv.style.color = 'green'; break;
        default: passwordStrengthDiv.textContent = ''; break; 
    }
     if (!password) passwordStrengthDiv.textContent = '';
};
const handleAgeVerification = () => {
    if (!agePopup) return;
     if (!sessionStorage.getItem('ageVerified') && !localStorage.getItem('ageVerified')) {
         agePopup.style.display = 'block'; if(overlay) overlay.style.display = 'block'; }
    const confirmBtn = agePopup.querySelector('.confirmButton'); const declineBtn = agePopup.querySelector('.declineButton');
    if (confirmBtn) { confirmBtn.addEventListener('click', () => { localStorage.setItem('ageVerified', 'true'); sessionStorage.setItem('ageVerified', 'true'); agePopup.style.display = 'none'; if(overlay) overlay.style.display = 'none'; }); }
    if (declineBtn) { declineBtn.addEventListener('click', () => { alert("You must be 18 or older to enter."); window.location.href = 'https://www.google.com'; }); }
};
window.showLogin = () => { hideModal(signupModal); showModal(loginModal); if(loginError) loginError.textContent = ''; };
window.showSignup = () => { hideModal(loginModal); showModal(signupModal); if(signupError) signupError.textContent = ''; };
window.toggleMenu = () => { if(mainMenu) mainMenu.classList.toggle('active'); };

class CartSystem {
    constructor() { this.cart = JSON.parse(localStorage.getItem('cart')) || []; this.initHomePage(); }
    initHomePage() { this.updateHeaderCartCount(); this.setupAddToCartListeners(); }
    setupAddToCartListeners() {
        document.querySelectorAll('.product-section .cart-btn, .cart-banner .cart-btn').forEach(btn => {
            const newBtn = btn.cloneNode(true); btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', (e) => this.addToCart(e)); });
    }
    addToCart(e) {
        const button = e.target.closest('.cart-btn'); if (!button) return;
        const productCard = button.closest('.single-product-item');
        let productData = {};

        if (productCard) {
            const priceTextElement = productCard.querySelector('.product-price'); let price = 0;
            if (priceTextElement) { const priceMatch = priceTextElement.textContent.match(/R([\d.]+)/); price = priceMatch ? parseFloat(priceMatch[1]) : 0; }
            const nameElement = productCard.querySelector('h3'); const imageElement = productCard.querySelector('img');
            productData = { id: button.dataset.productId, name: nameElement ? nameElement.textContent : 'Unknown Product', price: price, image: imageElement ? imageElement.src : 'assets/img/default-product.png', quantity: 1 };
        } else if (button.closest('.cart-banner')) {
            productData = { id: "deal-of-month-product-id", name: "Deal of the Month Special", price: 0.00, image: "assets/img/a.jpg", quantity: 1 };
            alert("Deal of the month added to cart! (Price needs to be set)");
        } else {
            return;
        }

        const existingItem = this.cart.find(item => item.id === productData.id);
        if (existingItem) { existingItem.quantity++; } else { this.cart.push(productData); }
        localStorage.setItem('cart', JSON.stringify(this.cart)); this.updateHeaderCartCount();
        if(productCard) this.showAddedNotification(button);
    }
    updateHeaderCartCount() { const count = this.cart.reduce((sum, item) => sum + item.quantity, 0); const cartCountSpan = document.querySelector('.cart-count'); if(cartCountSpan) { cartCountSpan.textContent = count; }}
    showAddedNotification(button) {
        const parentNode = button.parentNode; if (!parentNode) return;
        const existingNotif = parentNode.querySelector('.cart-notification'); if (existingNotif) existingNotif.remove();
        const notification = document.createElement('div'); notification.className = 'cart-notification'; notification.textContent = 'Added to cart!';
        parentNode.appendChild(notification); setTimeout(() => notification.remove(), 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if(agePopup) handleAgeVerification();
    const showSignupLink = document.getElementById('showSignupLink'); const showLoginLink = document.getElementById('showLoginLink');
    if(showSignupLink) showSignupLink.addEventListener('click', (e) => { e.preventDefault(); showSignup(); });
    if(showLoginLink) showLoginLink.addEventListener('click', (e) => { e.preventDefault(); showLogin(); });
    document.querySelectorAll('.closeButton').forEach(btn => btn.addEventListener('click', closeAllModals));
    if(overlay) overlay.addEventListener('click', closeAllModals);
    document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', (e) => e.stopPropagation()));
    document.addEventListener('keydown', (e) => { if (e.key === "Escape" && overlay && overlay.style.display === 'block') { closeAllModals(); } });
    passwordToggles.forEach(toggle => { toggle.addEventListener('click', () => { const passwordInput = toggle.previousElementSibling; if(passwordInput) { const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'; passwordInput.setAttribute('type', type); toggle.classList.toggle('fa-eye'); toggle.classList.toggle('fa-eye-slash'); }}); });
    if (signupPasswordInput) { signupPasswordInput.addEventListener('input', () => checkPasswordStrength(signupPasswordInput.value)); }
    if (loginForm) { loginForm.addEventListener('submit', async (e) => { e.preventDefault(); const email = document.getElementById('loginEmail').value; const password = document.getElementById('loginPassword').value; const button = e.target.querySelector('button[type="submit"]'); setLoading(button, true, 'Login'); if(loginError) loginError.textContent = ''; try { await signInWithEmailAndPassword(auth, email, password); closeAllModals(); alert("Logged in successfully!"); } catch (error) { if(loginError) displayError(loginError, error); } finally { setLoading(button, false, 'Login'); }}); }
    if (signupForm) { signupForm.addEventListener('submit', async (e) => { e.preventDefault(); const name = document.getElementById('signupName').value; const email = document.getElementById('signupEmail').value; const password = document.getElementById('signupPassword').value; const button = e.target.querySelector('button[type="submit"]'); if (password.length < 6) { if(signupError) signupError.textContent = "Password must be at least 6 characters long."; return; } setLoading(button, true, 'Sign Up'); if(signupError) signupError.textContent = ''; try { const userCredential = await createUserWithEmailAndPassword(auth, email, password); const user = userCredential.user; await set(ref(database, 'users/' + user.uid), { name: name, email: email, createdAt: serverTimestamp() }); closeAllModals(); alert("Account created successfully!"); } catch (error) { if(signupError) displayError(signupError, error); } finally { setLoading(button, false, 'Sign Up'); }}); }
    if (logoutButton) { logoutButton.addEventListener('click', async (e) => { e.preventDefault(); try { await signOut(auth); alert("Logged out successfully!"); } catch (error) { console.error("Logout Error:", error); alert("Failed to log out."); }}); }
    new CartSystem();
    document.querySelectorAll('.safe-email').forEach(element => { const user = element.dataset.user; const domain = element.dataset.domain; element.innerHTML = `<a href="mailto:${user}@${domain}">${user}@${domain}</a>`; });
});

if (auth) { 
    onAuthStateChanged(auth, (user) => { 
        if (user) { 
            if(loginNav) loginNav.style.display = 'none'; 
            if(signupNav) signupNav.style.display = 'none'; 
            if(accountNav) accountNav.style.display = 'inline-block'; 
            if(logoutNav) logoutNav.style.display = 'inline-block'; 
        } else { 
            if(loginNav) loginNav.style.display = 'inline-block'; 
            if(signupNav) signupNav.style.display = 'inline-block'; 
            if(accountNav) accountNav.style.display = 'none'; 
            if(logoutNav) logoutNav.style.display = 'none'; 
        }
    }); 
}
(function ($) {
    "use strict";

    $(document).ready(function($){
        
        // testimonial sliders
        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:false,
                    loop:true
                }
            }
        });

        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:true,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }
            }
        });

        // logo carousel
        $(".logo-carousel-inner").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            margin: 30,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:false,
                    loop:true
                }
            }
        });

        // count down
        if($('.time-countdown').length){  
            $('.time-countdown').each(function() {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
            });
         });
        }

        // projects filters isotop
        $(".product-filters li").on('click', function () {
            
            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');

            $(".product-lists").isotope({
                filter: selector,
            });
            
        });
        
        // isotop inner
        $(".product-lists").isotope();

        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });

        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

        $(".homepage-slider").on("translated.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

       

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });

        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
        
         // search form
        $(".search-bar-icon").on("click", function(){
            $(".search-area").addClass("search-active");
        });

        $(".close-btn").on("click", function() {
            $(".search-area").removeClass("search-active");
        });
    
    });


    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
    });


}(jQuery));