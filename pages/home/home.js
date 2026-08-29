import { CONFIG } from '../../config.js';

export const HomePage = {
    cachedFeatured: null,
    // Change this to your desired admin password
    adminPassword: CONFIG.ADMIN_PASSWORD || 'admin123',

    async render() {
        try {
            const response = await fetch('./pages/home/home.html');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.text();
        } catch (error) {
            console.error("Home render error:", error);
            return `<div style="padding: 80px 20px; text-align: center; color: #ffffff;">
                <h3>Error loading Home page</h3>
                <p style="color: #8c9ba5; font-size: 0.85rem; margin-top: 8px;">${error.message}</p>
            </div>`;
        }
    },

    async init() {
        this.bindEvents();
        await this.loadFeaturedProducts();
    },

    bindEvents() {
        const shopNowBtn = document.getElementById('heroShopNowBtn');
        if (shopNowBtn) {
            shopNowBtn.addEventListener('click', () => {
                window.location.hash = '#shop';
            });
        }

        const exploreBtn = document.getElementById('heroExploreBtn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                window.location.hash = '#shop';
            });
        }

        const collectionCards = document.querySelectorAll('.collection-card');
        collectionCards.forEach(card => {
            card.addEventListener('click', () => {
                const cat = card.getAttribute('data-cat');
                window.location.hash = `#shop?category=${cat || 'all'}`;
            });
        });
    },

    async loadFeaturedProducts(forceRefresh = false) {
        const featuredContainer = document.getElementById('featured-products-container');
        if (!featuredContainer) return;

        if (this.cachedFeatured && !forceRefresh) {
            this.renderFeaturedGrid(this.cachedFeatured);
            return;
        }

        try {
            const response = await fetch(CONFIG.API_URL);
            if (!response.ok) throw new Error("API request failed");
            
            const posts = await response.json();
            
            if (Array.isArray(posts) && posts.length > 0) {
                this.cachedFeatured = posts;
                this.renderFeaturedGrid(posts);
            } else {
                this.renderEmptyState(featuredContainer);
            }
        } catch (error) {
            console.error("Error fetching live featured products:", error);
            this.renderErrorState(featuredContainer);
        }
    },

    renderFeaturedGrid(posts) {
        const featuredContainer = document.getElementById('featured-products-container');
        if (!featuredContainer) return;

        // Apply TikTok vertical scroll container styles dynamically
        featuredContainer.style.display = 'flex';
        featuredContainer.style.flexDirection = 'column';
        featuredContainer.style.gap = '20px';
        featuredContainer.style.maxHeight = '80vh';
        featuredContainer.style.overflowY = 'auto';
        featuredContainer.style.scrollSnapType = 'y mandatory';
        featuredContainer.style.webkitOverflowScrolling = 'touch';
        featuredContainer.style.borderRadius = '16px';
        featuredContainer.style.padding = '10px 0';

        featuredContainer.innerHTML = posts.map(item => {
            const fallbackImg = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop';
            const imgSrc = item.image_url || item.image || item.img || item.photo || item.url || fallbackImg;
            const title = item.title || item.name || item.caption || item.text || 'Boutique Outfit';
            const rawPrice = item.price ? item.price.toString() : '2,850';
            const price = rawPrice.includes('Rs') ? rawPrice : `Rs. ${rawPrice}`;

            return `
                <div class="tiktok-feed-card" data-id="${item.id}" style="
                    scroll-snap-align: start;
                    scroll-snap-stop: always;
                    position: relative;
                    width: 100%;
                    min-height: 70vh;
                    background-color: #0b0f12;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.6);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    cursor: pointer;
                ">
                    <img src="${imgSrc}" alt="${title}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackImg}';" style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    ">
                    
                    <div style="
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%);
                    "></div>

                    <button class="wishlist-btn" aria-label="Wishlist" style="
                        position: absolute;
                        top: 16px;
                        right: 16px;
                        z-index: 2;
                        background: rgba(0,0,0,0.5);
                        border: none;
                        color: #ffffff;
                        font-size: 1.4rem;
                        width: 42px;
                        height: 42px;
                        border-radius: 50%;
                        cursor: pointer;
                    ">&#9825;</button>

                    <div style="
                        position: relative;
                        z-index: 2;
                        padding: 24px 20px;
                        color: #ffffff;
                    ">
                        <span style="
                            font-size: 1.25rem;
                            font-weight: 700;
                            display: block;
                            margin-bottom: 6px;
                            text-shadow: 0 2px 4px rgba(0,0,0,0.8);
                        ">${title}</span>
                        
                        <span style="
                            font-size: 1.1rem;
                            color: #d4af37;
                            font-weight: 600;
                            display: block;
                            margin-bottom: 12px;
                        ">${price}</span>

                        <div style="display: flex; gap: 10px; align-items: center;">
                            <span style="
                                font-size: 0.8rem;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                background: rgba(212, 175, 55, 0.2);
                                color: #d4af37;
                                padding: 4px 12px;
                                border-radius: 20px;
                                border: 1px solid rgba(212, 175, 55, 0.4);
                            ">Tap to view full details</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.bindWishlistBtns();
        this.bindCardClicks(posts);
    },

    bindCardClicks(posts) {
        const cards = document.querySelectorAll('.tiktok-feed-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('wishlist-btn')) return;
                const id = card.getAttribute('data-id');
                const product = posts.find(p => p.id == id);
                if (product) {
                    this.openProductModal(product);
                }
            });
        });
    },

    bindWishlistBtns() {
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                btn.classList.toggle('active');
                btn.innerHTML = btn.classList.contains('active') ? '&#9829;' : '&#9825;';
                btn.style.color = btn.classList.contains('active') ? '#e53e3e' : '#ffffff';
            });
        });
    },

    openProductModal(product) {
        const existingModal = document.getElementById('home-product-modal');
        if (existingModal) existingModal.remove();

        const fallbackImg = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop';
        const imgSrc = product.image_url || product.image || product.img || product.photo || product.url || fallbackImg;
        const title = product.title || product.name || product.caption || product.text || 'Boutique Outfit';
        const rawPrice = product.price ? product.price.toString() : '2,850';
        const price = rawPrice.includes('Rs') ? rawPrice : `Rs. ${rawPrice}`;
        const phone = CONFIG.WHATSAPP_NUMBER || '923001234567';
        const waMessage = encodeURIComponent(`Hi SAnA Boutique! I want to order: ${title} (${price})`);

        const modalHtml = `
            <div id="home-product-modal" style="
                position: fixed;
                inset: 0;
                z-index: 9999;
                background: rgba(0,0,0,0.9);
                backdrop-filter: blur(8px);
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 16px;
            ">
                <div style="
                    position: relative;
                    width: 100%;
                    max-width: 480px;
                    max-height: 90vh;
                    background: #12181d;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 16px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                ">
                    <button id="closeHomeModalBtn" style="
                        position: absolute;
                        top: 12px;
                        right: 12px;
                        z-index: 10;
                        background: rgba(0,0,0,0.7);
                        border: 1px solid rgba(255,255,255,0.2);
                        color: #ffffff;
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        font-size: 1.1rem;
                        cursor: pointer;
                    ">✕</button>

                    <div style="width: 100%; height: 380px; position: relative; background: #000;">
                        <img src="${imgSrc}" alt="${title}" onerror="this.onerror=null; this.src='${fallbackImg}';" style="
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        ">
                    </div>

                    <div style="padding: 20px; display: flex; flex-direction: column; gap: 12px;">
                        <h2 style="color: #ffffff; font-size: 1.3rem; font-weight: 700; margin: 0;">${title}</h2>
                        <span style="color: #d4af37; font-size: 1.2rem; font-weight: 600;">${price}</span>
                        <p style="color: #8c9ba5; font-size: 0.9rem; line-height: 1.4; margin: 0;">
                            ${product.description || 'Exclusive boutique collection item.'}
                        </p>

                        <a href="https://wa.me/${phone}?text=${waMessage}" target="_blank" style="
                            margin-top: 10px;
                            width: 100%;
                            padding: 14px;
                            background: #25d366;
                            color: #ffffff;
                            text-align: center;
                            font-weight: 700;
                            text-decoration: none;
                            border-radius: 8px;
                            letter-spacing: 0.5px;
                            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                        ">ORDER ON WHATSAPP</a>

                        <button id="deletePostBtn" style="
                            width: 100%;
                            padding: 12px;
                            background: rgba(229, 62, 62, 0.15);
                            color: #f87171;
                            border: 1px solid rgba(229, 62, 62, 0.4);
                            font-weight: 600;
                            border-radius: 8px;
                            cursor: pointer;
                            margin-top: 4px;
                        ">DELETE POST 🗑️</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        document.body.style.overflow = 'hidden';

        const closeModal = () => {
            const modal = document.getElementById('home-product-modal');
            if (modal) modal.remove();
            document.body.style.overflow = '';
        };

        document.getElementById('closeHomeModalBtn').addEventListener('click', closeModal);
        
        document.getElementById('deletePostBtn').addEventListener('click', () => {
            this.handleDeleteWithPassword(product.id, closeModal);
        });
    },

    async handleDeleteWithPassword(productId, closeModalCallback) {
        const inputPassword = prompt("Enter Admin Password to delete this post:");
        
        if (!inputPassword) return; // User cancelled

        if (inputPassword === this.adminPassword) {
            try {
                if (CONFIG && CONFIG.API_URL) {
                    await fetch(`${CONFIG.API_URL}/${productId}`, {
                        method: 'DELETE'
                    });
                }

                // Update local array and refresh view
                this.cachedFeatured = (this.cachedFeatured || []).filter(p => p.id != productId);
                this.renderFeaturedGrid(this.cachedFeatured);

                closeModalCallback();
                alert("Post deleted successfully.");
            } catch (error) {
                console.error("Error deleting post:", error);
                // Fallback local deletion if API fails
                this.cachedFeatured = (this.cachedFeatured || []).filter(p => p.id != productId);
                this.renderFeaturedGrid(this.cachedFeatured);
                closeModalCallback();
                alert("Removed post from feed.");
            }
        } else {
            alert("Incorrect Password! Access denied.");
        }
    },

    renderEmptyState(container) {
        container.innerHTML = `
            <div style="padding: 20px; text-align: center; width: 100%; color: #8c9ba5; font-size: 0.85rem;">
                No featured items published yet.
            </div>
        `;
    },

    renderErrorState(container) {
        container.innerHTML = `
            <div style="padding: 20px; text-align: center; width: 100%; color: #f87171; font-size: 0.85rem;">
                Failed to load featured products from server.
            </div>
        `;
    }
};

window.HomePage = HomePage;
        
