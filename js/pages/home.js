import { CONFIG } from '../config.js';

export const HomePage = {
    render() {
        return `
            <div class="home-landing-page">
                <!-- Hero Section -->
                <section class="hero-section">
                    <div class="hero-content">
                        <span class="sub-tagline">Style • Elegance • You</span>
                        <h1 class="hero-title">ELEGANCE IN EVERY THREAD</h1>
                        <p class="hero-subtitle">Premium Women's Fashion & Couture</p>
                        
                        <div class="hero-cta-buttons">
                            <a href="#shop" onclick="App.navigate('shop')" class="btn-primary">
                                <i class="fa-solid fa-bag-shopping"></i> SHOP NOW
                            </a>
                            <a href="#about" onclick="App.navigate('about')" class="btn-outline">
                                <i class="fa-solid fa-sparkles"></i> EXPLORE COLLECTION
                            </a>
                        </div>
                    </div>
                </section>

                <!-- Collections Section -->
                <section class="collections-section">
                    <h2 class="section-title"><span>✦</span> OUR COLLECTIONS <span>✦</span></h2>
                    <div class="collections-grid">
                        <div class="collection-card" onclick="App.navigate('shop')">
                            <div class="icon-box"><i class="fa-solid fa-shirt"></i></div>
                            <h3>UNSTITCHED SUITS</h3>
                            <span>View All</span>
                        </div>
                        <div class="collection-card" onclick="App.navigate('shop')">
                            <div class="icon-box"><i class="fa-solid fa-user-ninja"></i></div>
                            <h3>READY TO WEAR</h3>
                            <span>View All</span>
                        </div>
                        <div class="collection-card" onclick="App.navigate('shop')">
                            <div class="icon-box"><i class="fa-solid fa-vest"></i></div>
                            <h3>ABAYAS</h3>
                            <span>View All</span>
                        </div>
                        <div class="collection-card" onclick="App.navigate('shop')">
                            <div class="icon-box"><i class="fa-solid fa-ribbon"></i></div>
                            <h3>SHAWLS</h3>
                            <span>View All</span>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
};

window.HomePage = HomePage;
