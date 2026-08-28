import { CONFIG } from '../../config.js';

export const ShopPage = {
    cachedPosts: null,
    activeCategory: 'all',
    searchQuery: '',
    selectedProduct: null,

    // Categories tailored specifically for the Pakistani Women's Wear Market
    categories: [
        { id: 'all', name: 'All' },
        { id: 'unstitched', name: 'Unstitched Suits' },
        { id: 'kurtis', name: 'Ready To Wear Kurtis' },
        { id: 'abayas', name: 'Abayas & Hijabs' },
        { id: 'shawls', name: 'Shawls & Scarves' },
        { id: 'formals', name: 'Luxury Formals' },
        { id: 'maxi', name: 'Maxis & Gowns' },
        { id: 'dupattas', name: 'Dupattas & Bottoms' }
    ],

    // Default Fallback Data matching your luxury black & gold aesthetic
    defaultProducts: [
        { id: 1, title: 'Royal Black Embroidered Suit', price: 'Rs. 2,850', category: 'unstitched', sizes: 'Unstitched 3-Piece', description: 'Premium Lawn collection with heavy golden zari embroidery work and digital printed silk dupatta.', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop' },
        { id: 2, title: 'Beige Luxury Embroidered Suit', price: 'Rs. 2,650', category: 'unstitched', sizes: 'Unstitched 3-Piece', description: 'Intricate organza neck feature with sequence work. Includes jacquard trouser fabric.', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop' },
        { id: 3, title: 'Emerald Green Embroidered Suit', price: 'Rs. 2,850', category: 'unstitched', sizes: 'Unstitched 3-Piece', description: 'Classic Pakistani festive wear with embroidered neckline and chiffon dupatta.', image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=600&auto=format&fit=crop' },
        { id: 4, title: 'Maroon Velvet Bridal Shawl', price: 'Rs. 4,500', category: 'shawls', sizes: 'Free Size', description: 'Heavy tilla work velvet shawl for wedding season.', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&auto=format&fit=crop' },
        { id: 5, title: 'Black Nidha Silk Abaya', price: 'Rs. 3,850', category: 'abayas', sizes: 'S, M, L, XL', description: 'Imported Dubai Nidha fabric with subtle cuff embroidery and matching Sheila hijab.', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop' },
        { id: 6, title: 'Embroidered Cotton Kurti', price: 'Rs. 1,950', category: 'kurtis', sizes: 'S, M, L', description: 'Breathable daily wear embroidered cotton tunic.', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop' }
    ],

    async render() {
        setTimeout(() => this.init(), 0);

        try {
            const response = await fetch('./pages/shop/shop.html');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.text();
        } catch (error) {
            console.error("Error loading shop template:", error);
            return `<div style="padding: 80px 20px; text-align: center; color: #ffffff;">
                <h3>Error loading Shop page</h3>
                <p style="color: #8c9ba5; font-size: 0.85rem; margin-top: 8px;">${error.message}</p>
            </div>`;
        }
    },

    async init() {
        this.bindEvents();
        await this.loadPosts();
    },

    bindEvents() {
        // Horizontal Pill Click Navigation
        const pills = document.querySelectorAll('.pill-btn');
        pills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                pills.forEach(p => p.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');
                this.activeCategory = target.getAttribute('data-category');
                this.renderFeed();
            });
        });

        // Search Filter
        const searchInput = document.getElementById('shop-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.renderFeed();
            });
        }
    },

    async loadPosts(forceRefresh = false) {
        if (this.cachedPosts && !forceRefresh) {
            this.renderFeed();
            return;
        }

        try {
            if (CONFIG && CONFIG.API_URL) {
                const response = await fetch(CONFIG.API_URL);
                const posts = await response.json();
                this.cachedPosts = (posts && posts.length > 0) ? posts : this.defaultProducts;
            } else {
                this.cachedPosts = this.defaultProducts;
            }
        } catch (error) {
            console.warn("API unavailable, using fallback products:", error);
            this.cachedPosts = this.defaultProducts;
        }

        this.renderFeed();
    },

    renderFeed() {
        const feedContainer = document.getElementById('shop-feed');
        if (!feedContainer) return;

        let filtered = this.cachedPosts || this.defaultProducts;

        // Apply Search Filter
        if (this.searchQuery) {
            filtered = filtered.filter(p => 
                (p.title || p.name || '').toLowerCase().includes(this.searchQuery) ||
                (p.category || '').toLowerCase().includes(this.searchQuery)
            );
        }

        // 1. Render Landing View (If 'all' category is selected & search is empty)
        if (this.activeCategory === 'all' && !this.searchQuery) {
            feedContainer.innerHTML = this.renderLandingHtml();
            this.bindLandingCategoryClicks();
            return;
        }

        // 2. Filter products by category
        if (this.activeCategory !== 'all') {
            filtered = filtered.filter(p => 
                (p.category || 'unstitched').toLowerCase() === this.activeCategory.toLowerCase()
            );
        }

        // 3. Render Grid View
        const categoryName = this.getCategoryDisplayName(this.activeCategory);

        if (filtered.length === 0) {
            feedContainer.innerHTML = `
                <div style="text-align:center; padding: 60px 20px; color:#8c9ba5;">
                    <p style="font-size: 0.9rem;">No products found in this collection.</p>
                </div>
            `;
            return;
        }

        feedContainer.innerHTML = `
            <div class="category-view-header">
                <h2 class="category-view-title">${categoryName}</h2>
                <span class="category-view-count">${filtered.length} Items</span>
            </div>
            <div class="shop-products-grid">
                ${filtered.map(product => this.renderProductCard(product)).join('')}
            </div>
        `;

        this.bindProductCardClicks();
        this.bindWishlistBtns();
    },

    renderLandingHtml() {
        return `
            <!-- Landing Hero Card -->
            <div class="shop-landing-hero" style="background-image: url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop');">
                <div class="shop-landing-overlay"></div>
                <div class="shop-landing-content">
                    <span class="shop-landing-tagline">Premium Fashion</span>
                    <h2 class="shop-landing-title">DISCOVER TIMELESS BEAUTY</h2>
                    <p class="shop-landing-subtext">Crafted for Comfort, Designed for You.</p>
                </div>
            </div>

            <!-- Category Grid -->
            <div class="section-header" style="margin-top: 20px;">
                <span class="ornament">☙</span>
                <h2 class="section-title">SHOP BY CATEGORY</h2>
                <span class="ornament">❧</span>
            </div>

            <div class="collections-grid" style="grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 24px;">
                <div class="category-card" data-cat="unstitched" style="height: 190px; cursor: pointer;">
                    <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&auto=format&fit=crop" alt="Unstitched Suits">
                    <div class="category-card-overlay"></div>
                    <span class="category-card-title">UNSTITCHED SUITS</span>
                    <span class="category-card-link">Explore Collection &#10095;</span>
                </div>

                <div class="category-card" data-cat="kurtis" style="height: 190px; cursor: pointer;">
                    <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop" alt="Kurtis">
                    <div class="category-card-overlay"></div>
                    <span class="category-card-title">READY TO WEAR KURTIS</span>
                    <span class="category-card-link">Explore Collection &#10095;</span>
                </div>

                <div class="category-card" data-cat="abayas" style="height: 190px; cursor: pointer;">
                    <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=400&auto=format&fit=crop" alt="Abayas">
                    <div class="category-card-overlay"></div>
                    <span class="category-card-title">ABAYAS</span>
                    <span class="category-card-link">Explore Collection &#10095;</span>
                </div>

                <div class="category-card" data-cat="shawls" style="height: 190px; cursor: pointer;">
                    <img src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=400&auto=format&fit=crop" alt="Shawls">
                    <div class="category-card-overlay"></div>
                    <span class="category-card-title">SHAWLS</span>
                    <span class="category-card-link">Explore Collection &#10095;</span>
                </div>
            </div>
        `;
    },

    renderProductCard(product) {
        const fallbackImg = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop';
        const imgSrc = product.image_url || product.image || fallbackImg;
        const title = product.title || product.name || 'Embroidered Suit';
        const price = product.price ? (product.price.toString().includes('Rs') ? product.price : `Rs. ${product.price}`) : 'Rs. 2,850';

        return `
            <div class="shop-product-card" data-id="${product.id}">
                <div class="shop-product-image">
                    <img src="${imgSrc}" alt="${title}" onerror="this.onerror=null; this.src='${fallbackImg}';">
                    <button class="shop-wishlist-btn" aria-label="Add to Wishlist">&#9825;</button>
                </div>
                <div class="shop-product-info">
                    <span class="shop-product-name">${title}</span>
                    <span class="shop-product-price">${price}</span>
                </div>
            </div>
        `;
    },

    bindLandingCategoryClicks() {
        const catCards = document.querySelectorAll('.category-card[data-cat]');
        catCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetCat = card.getAttribute('data-cat');
                const pillToActivate = document.querySelector(`.pill-btn[data-category="${targetCat}"]`);
                if (pillToActivate) {
                    pillToActivate.click();
                } else {
                    this.activeCategory = targetCat;
                    this.renderFeed();
                }
            });
        });
    },

    bindProductCardClicks() {
        const cards = document.querySelectorAll('.shop-product-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('shop-wishlist-btn')) return;
                const productId = card.getAttribute('data-id');
                const product = (this.cachedPosts || this.defaultProducts).find(p => p.id == productId);
                if (product) {
                    this.openProductModal(product);
                }
            });
        });
    },

    bindWishlistBtns() {
        const btns = document.querySelectorAll('.shop-wishlist-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                btn.classList.toggle('active');
                btn.innerHTML = btn.classList.contains('active') ? '&#9829;' : '&#9825;';
                btn.style.color = btn.classList.contains('active') ? '#e53e3e' : '#ffffff';
            });
        });
    },

    // Full-Screen modern popup modal to view product detail & order
    openProductModal(product) {
        const existingModal = document.getElementById('product-detail-modal');
        if (existingModal) existingModal.remove();

        const fallbackImg = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop';
        const imgSrc = product.image_url || product.image || fallbackImg;
        const price = product.price ? (product.price.toString().includes('Rs') ? product.price : `Rs. ${product.price}`) : 'Rs. 2,850';
        const phone = CONFIG.WHATSAPP_NUMBER || '923001234567';
        const waMessage = encodeURIComponent(`Hi SAnA Boutique! I want to order/inquire about: ${product.title} (${price})`);

        const modalHtml = `
            <div id="product-detail-modal" class="product-modal-backdrop full-screen-mode">
                <div class="product-modal-content">
                    <button class="product-modal-close" id="closeModalBtn">✕</button>
                    
                    <div class="product-modal-hero-image">
                        <img src="${imgSrc}" alt="${product.title}" onerror="this.onerror=null; this.src='${fallbackImg}';">
                    </div>
                    
                    <div class="product-modal-scroll-details">
                        <div class="product-modal-header">
                            <span class="product-modal-category">${this.getCategoryDisplayName(product.category || 'unstitched')}</span>
                            <h2 class="product-modal-title">${product.title}</h2>
                            <span class="product-modal-price">${price}</span>
                        </div>
                        
                        ${product.sizes ? `<div class="product-modal-sizes"><strong>Available Sizes:</strong> ${product.sizes}</div>` : ''}
                        
                        <div class="product-modal-divider"></div>
                        
                        <p class="product-modal-desc">${product.description || 'Premium designer fabric crafted with elegance.'}</p>
                        
                        <div class="product-modal-action-bar">
                            <a href="https://wa.me/${phone}?text=${waMessage}" target="_blank" class="product-modal-order-btn">
                                ORDER ON WHATSAPP
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        document.body.style.overflow = 'hidden';

        const closeModal = () => {
            const modal = document.getElementById('product-detail-modal');
            if (modal) modal.remove();
            document.body.style.overflow = '';
        };

        document.getElementById('closeModalBtn').addEventListener('click', closeModal);

        const modalBackdrop = document.getElementById('product-detail-modal');
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                closeModal();
            }
        });
    },

    getCategoryDisplayName(catKey) {
        const cat = this.categories.find(c => c.id.toLowerCase() === (catKey || '').toLowerCase());
        return cat ? cat.name : 'All Products';
    }
};

window.ShopPage = ShopPage;
    
