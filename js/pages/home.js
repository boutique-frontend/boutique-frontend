import { CONFIG } from '../config.js';

export const HomePage = {
    cachedFeatured: null,

    render() {
        // Trigger async loading for featured products after render
        setTimeout(() => this.loadFeaturedProducts(), 0);

        return `
            <div class="home-page">
                <!-- Hero Section with Background Overlay -->
                <section class="hero-section" style="background-image: url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop');">
                    <div class="hero-overlay"></div>
                    <div class="hero-content">
                        <span class="hero-tagline">Style • Elegance • You</span>
                        <h1 class="hero-title">ELEGANCE IN<br>EVERY THREAD</h1>
                        <p class="hero-subtitle">Premium Women's Fashion & Couture</p>
                        
                        <div class="hero-actions">
                            <a href="#shop" onclick="App.navigate('shop')" class="btn-gold-primary">
                                <i class="fa-solid fa-bag-shopping"></i> SHOP NOW
                            </a>
                            <a href="#shop" onclick="App.navigate('shop')" class="btn-gold-outline">
                                <i class="fa-solid fa-sparkles"></i> EXPLORE COLLECTION
                            </a>
                        </div>
                    </div>
                    <div class="hero-dots">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </section>

                <!-- Our Collections Section (2x2 Grid) -->
                <div class="section-header">
                    <span style="color: #d4af37;">✦</span>
                    <h2 class="section-title">OUR COLLECTIONS</h2>
                    <span style="color: #d4af37;">✦</span>
                </div>

                <div class="collections-grid">
                    <a href="#shop" onclick="App.navigate('shop')" class="category-card">
                        <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop" alt="Unstitched Suits">
                        <div class="category-card-overlay"></div>
                        <div class="category-icon-wrapper"><i class="fa-solid fa-shirt"></i></div>
                        <span class="category-card-title">UNSTITCHED SUITS</span>
                        <span class="category-card-link">View All</span>
                    </a>

                    <a href="#shop" onclick="App.navigate('shop')" class="category-card">
                        <img src="https://images.unsplash.com/photo-1583391733975-01f687498a9d?q=80&w=600&auto=format&fit=crop" alt="Ready To Wear">
                        <div class="category-card-overlay"></div>
                        <div class="category-icon-wrapper"><i class="fa-solid fa-user-ninja"></i></div>
                        <span class="category-card-title">READY TO WEAR KURTIS</span>
                        <span class="category-card-link">View All</span>
                    </a>

                    <a href="#shop" onclick="App.navigate('shop')" class="category-card">
                        <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=600&auto=format&fit=crop" alt="Abayas">
                        <div class="category-card-overlay"></div>
                        <div class="category-icon-wrapper"><i class="fa-solid fa-vest"></i></div>
                        <span class="category-card-title">ABAYAS</span>
                        <span class="category-card-link">View All</span>
                    </a>

                    <a href="#shop" onclick="App.navigate('shop')" class="category-card">
                        <img src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=600&auto=format&fit=crop" alt="Shawls">
                        <div class="category-card-overlay"></div>
                        <div class="category-icon-wrapper"><i class="fa-solid fa-ribbon"></i></div>
                        <span class="category-card-title">SHAWLS</span>
                        <span class="category-card-link">View All</span>
                    </a>
                </div>

                <!-- Featured Products Horizontal Scroll -->
                <div class="section-header section-header-between">
                    <h2 class="section-title">FEATURED PRODUCTS</h2>
                    <a href="#shop" onclick="App.navigate('shop')" class="view-all-link">View All <i class="fa-solid fa-chevron-right"></i></a>
                </div>

                <div id="featured-products-container" class="products-scroll-container">
                    <div class="loader-container" style="min-height: 120px; width: 100%;">
                        <div class="spinner"></div>
                    </div>
                </div>
            </div>
        `;
    },

    async loadFeaturedProducts() {
        const container = document.getElementById('featured-products-container');
        if (!container) return;

        if (this.cachedFeatured) {
            container.innerHTML = this.renderFeaturedHtml(this.cachedFeatured);
            return;
        }

        try {
            const response = await fetch(CONFIG.API_URL);
            const posts = await response.json();
            this.cachedFeatured = posts.slice(0, 5); // Display top 5 items on Home

            if (!this.cachedFeatured || this.cachedFeatured.length === 0) {
                container.innerHTML = `<p style="color: #888; padding: 10px; font-size: 0.8rem;">No featured items available.</p>`;
                return;
            }

            container.innerHTML = this.renderFeaturedHtml(this.cachedFeatured);
        } catch (error) {
            console.error("Error loading featured items:", error);
            container.innerHTML = `<p style="color: #e53e3e; padding: 10px; font-size: 0.8rem;">Unable to load featured products.</p>`;
        }
    },

    renderFeaturedHtml(items) {
        return items.map(item => `
            <div class="product-item-card" onclick="App.navigate('shop')">
                <div class="product-item-image">
                    <img src="${item.image_url || item.image || 'https://via.placeholder.com/300'}" alt="${item.title || 'Boutique Item'}">
                    <button class="wishlist-btn" onclick="event.stopPropagation();"><i class="fa-regular fa-heart"></i></button>
                </div>
                <div class="product-item-details">
                    <span class="product-item-name">${item.title || item.description || 'Luxury Dress'}</span>
                    <span class="product-item-price">Rs. ${item.price || 'N/A'}</span>
                </div>
            </div>
        `).join('');
    }
};

window.HomePage = HomePage;
