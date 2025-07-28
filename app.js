// Sample product data
const products = [
    {
        id: 1,
        name: "iPhone 14 Pro",
        category: "electronics",
        price:  570999,
        rating: 4.8,
        description: "Latest iPhone with advanced camera system and A16 Bionic chip",
        image: "Images/iPhone 14 Pro.jpg"
    },
    {
        id: 2,
        name: "MacBook Air M2",
        category: "electronics",
        price: 299000,
        rating: 4.9,
        description: "Ultra-thin laptop with M2 chip for incredible performance",
        image: "Images/MacBook Air M2.jpg"
    },
    {
        id: 3,
        name: "Nike Air Max 270",
        category: "clothing",
        price: 18500,
        rating: 4.6,
        description: "Comfortable running shoes with Air Max technology",
        image: "Images/Nike Air Max 270.jpg"
    },
    {
        id: 4,
        name: "Adidas Ultraboost 22",
        category: "clothing",
        price: 32000,
        rating: 4.7,
        description: "Premium running shoes with responsive Boost midsole",
        image: "Images/Adidas Ultraboost 22.jpg"
    },
    {
        id: 5,
        name: "The Great Gatsby",
        category: "books",
        price: 349,
        rating: 4.5,
        description: "Classic American novel by F. Scott Fitzgerald",
        image: "Images/The Great Gatsby.jpg"
    },
    {
        id: 6,
        name: "To Kill a Mockingbird",
        category: "books",
        price: 355,
        rating: 4.8,
        description: "Harper Lee's masterpiece about justice and racism",
        image: "Images/To Kill a Mockingbird.jpg"
    },
    {
        id: 7,
        name: "Coffee Maker Pro",
        category: "home",
        price: 49999,
        rating: 4.4,
        description: "Programmable coffee maker with thermal carafe",
        image: "Images/Coffee Maker Pro.jpg"
    },
    {
        id: 8,
        name: "Garden Tool Set",
        category: "home",
        price: 8350,
        rating: 4.3,
        description: "Complete set of essential gardening tools",
        image: "Images/Garden Tool Set.jpg"
    },
    {
        id: 9,
        name: "Basketball",
        category: "sports",
        price: 2999,
        rating: 4.2,
        description: "Official size basketball for indoor and outdoor use",
        image: "Images/Basketball.jpg"
    },
    {
        id: 10,
        name: "Yoga Mat",
        category: "sports",
        price: 1900,
        rating: 4.5,
        description: "Non-slip yoga mat with carrying strap",
        image: "Images/Yoga Mat.jpg"
    },
    {
        id: 11,
        name: "Samsung Galaxy S25",
        category: "electronics",
        price: 509999,
        rating: 4.7,
        description: "Android flagship with advanced camera and performance",
        image: "Images/Samsung Galaxy S25.jpg"
    },
    {
        id: 12,
        name: "Wireless Headphones",
        category: "electronics",
        price: 4395,
        rating: 4.6,
        description: "Noise-cancelling wireless headphones with 30-hour battery",
        image: "Images/Wireless Headphones.jpg"
    },
    {
        id: 13,
        name: "Denim Jacket",
        category: "clothing",
        price: 6000,
        rating: 4.4,
        description: "Classic denim jacket perfect for any casual occasion",
        image: "Images/Denim Jacket.jpg"
    },
    {
        id: 14,
        name: "Harry Potter Collection",
        category: "books",
        price: 3999,
        rating: 4.9,
        description: "Complete 7-book Harry Potter series in hardcover",
        image: "Images/Harry Potter Collection.jpg"
    },
    {
        id: 15,
        name: "Smart LED Bulbs",
        category: "home",
        price: 2599,
        rating: 4.3,
        description: "WiFi-enabled smart bulbs with voice control",
        image: "Images/Smart LED Bulbs.jpg"
    }
];


const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const sortSelect = document.getElementById('sortSelect');
const productsGrid = document.getElementById('productsGrid');
const resultsCount = document.getElementById('resultsCount');
const resultsSummary = document.getElementById('resultsSummary');
const noResults = document.getElementById('noResults');


let currentSearchTerm = '';
let currentCategory = '';
let currentPriceRange = '';
let currentSortBy = 'name';


function init() {
    displayProducts(products);
    setupEventListeners();
}


function setupEventListeners() {
   
    searchInput.addEventListener('input', handleSearch);
    
    
    clearBtn.addEventListener('click', clearSearch);
    
   
    categoryFilter.addEventListener('change', handleFilterChange);
    priceFilter.addEventListener('change', handleFilterChange);
    
   
    sortSelect.addEventListener('change', handleSortChange);
}


function handleSearch(e) {
    currentSearchTerm = e.target.value.toLowerCase();
    clearBtn.style.display = currentSearchTerm ? 'block' : 'none';
    performSearch();
}


function clearSearch() {
    searchInput.value = '';
    currentSearchTerm = '';
    clearBtn.style.display = 'none';
    performSearch();
}


function handleFilterChange() {
    currentCategory = categoryFilter.value;
    currentPriceRange = priceFilter.value;
    performSearch();
}


function handleSortChange() {
    currentSortBy = sortSelect.value;
    performSearch();
}

// Reset all filters
function resetFilters() {
    searchInput.value = '';
    categoryFilter.value = '';
    priceFilter.value = '';
    sortSelect.value = 'name';
    
    currentSearchTerm = '';
    currentCategory = '';
    currentPriceRange = '';
    currentSortBy = 'name';
    
    clearBtn.style.display = 'none';
    performSearch();
}


function performSearch() {
    let filteredProducts = products.filter(product => {
        
        const matchesSearch = !currentSearchTerm || 
            product.name.toLowerCase().includes(currentSearchTerm) ||
            product.description.toLowerCase().includes(currentSearchTerm) ||
            product.category.toLowerCase().includes(currentSearchTerm);
        
  
        const matchesCategory = !currentCategory || product.category === currentCategory;
        
  
        let matchesPrice = true;
        if (currentPriceRange) {
            if (currentPriceRange === '300000+') {
                matchesPrice = product.price >= 300000;
            } else {
                const [min, max] = currentPriceRange.split('-').map(Number);
                matchesPrice = product.price >= min && product.price <= max;
            }
        }
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    

    filteredProducts = sortProducts(filteredProducts);
    
 
    displayProducts(filteredProducts);
}


function sortProducts(products) {
    return products.sort((a, b) => {
        switch (currentSortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });
}

// Display products
function displayProducts(products) {

    resultsCount.textContent = products.length;
    
 
    updateResultsSummary(products);
    

    if (products.length === 0) {
        productsGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    
    const productsHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="product-image-fallback" style="display: none;">
                    <i class="fas fa-${getProductIcon(product.category)}"></i>
                </div>
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">PKR ${product.price.toLocaleString()}</div>
                    <div class="product-rating">
                        <div class="stars">
                            ${generateStars(product.rating)}
                        </div>
                        <span class="rating-text">${product.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    productsGrid.innerHTML = productsHTML;
}


function updateResultsSummary(products) {
    let summary = 'Showing all products';
    
    if (currentSearchTerm || currentCategory || currentPriceRange) {
        const filters = [];
        
        if (currentSearchTerm) {
            filters.push(`"${currentSearchTerm}"`);
        }
        
        if (currentCategory) {
            const categoryNames = {
                'electronics': 'Electronics',
                'clothing': 'Clothing',
                'books': 'Books',
                'home': 'Home & Garden',
                'sports': 'Sports'
            };
            filters.push(categoryNames[currentCategory]);
        }
        
        if (currentPriceRange) {
            const priceNames = {
                '0-1000': 'Under PKR 1,000',
                '1000-5000': 'PKR 1,000 - PKR 5,000',
                '5000-20000': 'PKR 5,000 - PKR 20,000',
                '20000-100000': 'PKR 20,000 - PKR 100,000',
                '100000-300000': 'PKR 100,000 - PKR 300,000',
                '300000+': 'PKR 300,000+'
            };
            filters.push(priceNames[currentPriceRange]);
        }
        
        summary = `Filtered by: ${filters.join(', ')}`;
    }
    
    resultsSummary.textContent = summary;
}


function getProductIcon(category) {
    const icons = {
        electronics: 'mobile-alt',
        clothing: 'tshirt',
        books: 'book',
        home: 'home',
        sports: 'futbol'
    };
    return icons[category] || 'box';
}


function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 