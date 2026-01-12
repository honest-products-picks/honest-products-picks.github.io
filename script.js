javascript
// Product data - In a real application, this would come from a database or API
// For this example, we'll use a JSON file that you can update
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const cartIcon = document.getElementById('cartIcon');
const cartDropdown = document.getElementById('cartDropdown');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const featuredProductsGrid = document.getElementById('featuredProductsGrid');
const allProductsGrid = document.getElementById('allProductsGrid');
const previewContainer = document.getElementById('previewContainer');

// Page elements
const homePage = document.getElementById('home');
const productsPage = document.getElementById('productsPage');
const previewPage = document.getElementById('previewPage');
const contactPage = document.getElementById('contactPage');

// Navigation links
const navLinks = document.querySelectorAll('a[data-page]');
const categoryLinks = document.querySelectorAll('a[data-category]');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    // Load products from JSON file
    loadProducts();

    // Set up event listeners
    setupEventListeners();

    // Update cart display
    updateCartDisplay();

    // Show home page by default
    showPage('home');
});

// Load products from JSON file
async function loadProducts() {
    try {
        // In a real implementation, this would fetch from products.json
        // For this demo, we'll use a sample product array
        products = [
            {
                id: 1,
                name: "Wireless Bluetooth Headphones",
                category: "electronics",
                price: 89.99,
                description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                priceLink: "https://www.amazon.com/dp/B07XYZ1234",
                featured: true,
                features: ["Noise cancellation", "30-hour battery", "Comfortable fit", "Bluetooth 5.0"]
            },
            {
                id: 2,
                name: "Men's Casual Shirt",
                category: "clothing",
                price: 29.99,
                description: "Comfortable and stylish casual shirt made from breathable cotton fabric.",
                image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                priceLink: "https://www.amazon.com/dp/B08ABC5678",
                featured: true,
                features: ["100% Cotton", "Machine washable", "Regular fit", "Available in multiple colors"]
            },
            {
                id: 3,
                name: "Gaming Laptop",
                category: "computers",
                price: 1299.99,
                description: "High-performance gaming laptop with RTX graphics and fast refresh rate display.",
                image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                priceLink: "https://www.amazon.com/dp/B09XYZ9012",
                featured: true,
                features: ["RTX 3070 GPU", "16GB RAM", "1TB SSD", "144Hz display"]
            },
            {
                id: 4,
                name: "Smart Watch",
                category: "electronics",
                price: 199.99,
                description: "Feature-packed smartwatch with health monitoring and smartphone connectivity.",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                priceLink: "https://www.amazon.com/dp/B07DEF3456",
                featured: false,
                features: ["Heart rate monitor", "GPS tracking", "Water resistant", "7-day battery"]
            },
            {
                id: 5,
                name: "Women's Running Shoes",
                category: "clothing",
                price: 79.99,
                description: "Lightweight running shoes with cushioning and support for all-day comfort.",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                priceLink: "https://www.amazon.com/dp/B08GHI7890",
                featured: false,
                features: ["Breathable mesh", "Cushioned sole", "Non-slip grip", "Multiple colors"]
            },
            {
                id: 6,
                name: "Coffee Maker",
                category: "home",
                price: 49.99,
                description: "Programmable coffee maker with automatic shutoff and brew strength control.",
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                priceLink: "https://www.amazon.com/dp/B06JKL1234",
                featured: true,
                features: ["Programmable", "24-hour timer", "Auto shutoff", "Brew strength control"]
            },
            {
                id: 7,
                name: "External SSD 1TB",
                category: "computers",
                price: 129.99,
                description: "High-speed external solid state drive with USB-C connectivity.",
                image: "https://images.unsplash.com/photo-1581344891157-8a04c8e10a61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                priceLink: "https://www.amazon.com/dp/B08XYZ5678",
                featured: false,
                features: ["1TB capacity", "USB-C interface", "Compact design", "High-speed transfer"]
            },
            {
                id: 8,
                name: "Air Fryer",
                category: "home",
                price: 89.99,
                description: "Digital air fryer with multiple cooking functions and easy-clean basket.",
                image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                priceLink: "https://www.amazon.com/dp/B07ABC9012",
                featured: false,
                features: ["Digital controls", "Multiple presets", "Easy-clean basket", "Compact design"]
            }
        ];

        // Display featured products
        displayFeaturedProducts();

        // Display all products
        displayAllProducts('all');

    } catch (error) {
        console.error('Error loading products:', error);
        featuredProductsGrid.innerHTML = '<p class="error">Error loading products. Please try again later.</p>';
    }
}

// Set up event listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);

    // Cart functionality
    cartIcon.addEventListener('click', toggleCartDropdown);

    // Close cart when clicking outside
    document.addEventListener('click', function (event) {
        if (!cartIcon.contains(event.target) && !cartDropdown.contains(event.target)) {
            cartDropdown.style.display = 'none';
        }
    });

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);

            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Category navigation
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');

            // Show products page and filter by category
            showPage('products');

            // Update active filter button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            document.querySelector(`.filter-btn[data-category="${category}"]`).classList.add('active');

            // Display filtered products
            displayAllProducts(category);

            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('a[data-page="products"]').classList.add('active');
        });
    });

    // Category filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Update active filter button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Display filtered products
            displayAllProducts(category);
        });
    });

    // Checkout button
    checkoutBtn.addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some products first!');
            return;
        }

        // In a real implementation, this would redirect to Amazon checkout
        // For demo, we'll show a message
        alert('In a real implementation, this would redirect to Amazon checkout with your selected products.');

        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
}

// Show the selected page
function showPage(page) {
    // Hide all pages
    homePage.style.display = 'none';
    productsPage.style.display = 'none';
    previewPage.style.display = 'none';
    contactPage.style.display = 'none';

    // Show the selected page
    switch (page) {
        case 'home':
            homePage.style.display = 'block';
            break;
        case 'products':
            productsPage.style.display = 'block';
            break;
        case 'preview':
            previewPage.style.display = 'block';
            break;
        case 'contact':
            contactPage.style.display = 'block';
            break;
    }
}

// Display featured products on home page
function displayFeaturedProducts() {
    featuredProductsGrid.innerHTML = '';

    const featuredProducts = products.filter(product => product.featured);

    if (featuredProducts.length === 0) {
        featuredProductsGrid.innerHTML = '<p>No featured products available.</p>';
        return;
    }

    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredProductsGrid.appendChild(productCard);
    });
}

// Display all products with optional category filter
function displayAllProducts(category) {
    allProductsGrid.innerHTML = '';

    let filteredProducts = products;

    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }

    if (filteredProducts.length === 0) {
        allProductsGrid.innerHTML = '<p>No products found in this category.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        allProductsGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-actions">
                <a href="${product.priceLink}" target="_blank" class="price-btn">Check Price on Amazon</a>
                <button class="preview-btn" data-id="${product.id}">Preview</button>
            </div>
        </div>
    `;

    // Add event listener to preview button
    const previewBtn = card.querySelector('.preview-btn');
    previewBtn.addEventListener('click', function () {
        showProductPreview(product.id);
    });

    return card;
}

// Show product preview
function showProductPreview(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) {
        previewContainer.innerHTML = '<p>Product not found.</p>';
        showPage('preview');
        return;
    }

    previewContainer.innerHTML = `
        <div class="preview-card">
            <div class="preview-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="preview-details">
                <span class="preview-category">${product.category}</span>
                <h3>${product.name}</h3>
                <div class="preview-price">$${product.price.toFixed(2)}</div>
                <p class="preview-description">${product.description}</p>
                
                <div class="preview-features">
                    <h4>Key Features:</h4>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="preview-actions">
                    <a href="${product.priceLink}" target="_blank" class="price-btn">Check Price on Amazon</a>
                    <button class="preview-btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    // Add event listener to add to cart button
    const addToCartBtn = previewContainer.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', function () {
        addToCart(product.id);
    });

    showPage('preview');

    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('a[data-page="preview"]').classList.add('active');
}

// Search functionality
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Clear previous results
    searchResults.innerHTML = '';

    if (searchTerm.length === 0) {
        searchResults.style.display = 'none';
        return;
    }

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    if (filteredProducts.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No products found</div>';
        searchResults.style.display = 'block';
        return;
    }

    // Display search results
    filteredProducts.slice(0, 5).forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
            </div>
        `;

        resultItem.addEventListener('click', function () {
            showProductPreview(product.id);
            searchInput.value = '';
            searchResults.style.display = 'none';
        });

        searchResults.appendChild(resultItem);
    });

    searchResults.style.display = 'block';
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            priceLink: product.priceLink,
            quantity: 1
        });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart display
    updateCartDisplay();

    // Show confirmation
    alert(`${product.name} added to cart!`);
}

// Update cart display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
        `;

        // Add event listener to remove button
        const removeBtn = cartItem.querySelector('.remove-item');
        removeBtn.addEventListener('click', function () {
            removeFromCart(item.id);
        });

        cartItems.appendChild(cartItem);
    });

    // Update total price
    cartTotal.textContent = totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Toggle cart dropdown
function toggleCartDropdown() {
    if (cartDropdown.style.display === 'block') {
        cartDropdown.style.display = 'none';
    } else {
        cartDropdown.style.display = 'block';
        updateCartDisplay();
    }
}