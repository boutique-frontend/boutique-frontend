import { PostCardComponent } from '../../components/postCard.js';
import { CONFIG } from '../../config.js';

export const ShopPage = {
    cachedPosts: null,

    async render() {
        setTimeout(() => this.loadPosts(), 0);

        try {
            const response = await fetch('./pages/shop/shop.html');
            const template = await response.text();

            if (this.cachedPosts && this.cachedPosts.length > 0) {
                return `<div id="shop-feed" class="shop-feed-container">${this.renderFeedHtml(this.cachedPosts)}</div>`;
            }

            return template;
        } catch (error) {
            console.error("Error loading shop template:", error);
            return `<div id="shop-feed" class="shop-feed-container"><p class="error-msg" style="color:#f87171;">Failed to load view.</p></div>`;
        }
    },

    renderFeedHtml(posts) {
        return posts.map(post => {
            const itemData = {
                ...post,
                image: post.image_url || post.image
            };
            
            return `
                <div class="shop-feed-item">
                    ${PostCardComponent.render(itemData)}
                </div>
            `;
        }).join('');
    },

    async loadPosts(forceRefresh = false) {
        const feedContainer = document.getElementById('shop-feed');
        if (!feedContainer) return;

        if (this.cachedPosts && !forceRefresh) {
            feedContainer.innerHTML = this.renderFeedHtml(this.cachedPosts);
            return;
        }

        try {
            const response = await fetch(CONFIG.API_URL);
            const posts = await response.json();
            this.cachedPosts = posts;

            if (!posts || posts.length === 0) {
                feedContainer.innerHTML = `
                    <div style="display:flex; justify-content:center; align-items:center; min-height:60vh;">
                        <p class="empty-msg" style="color:#888888; font-size:0.9rem;">No products available in shop.</p>
                    </div>
                `;
                return;
            }

            feedContainer.innerHTML = this.renderFeedHtml(posts);
        } catch (error) {
            console.error("Error fetching items:", error);
            feedContainer.innerHTML = `
                <div style="display:flex; justify-content:center; align-items:center; min-height:60vh;">
                    <p class="error-msg" style="color:#f87171; font-size:0.9rem;">Failed to load shop products.</p>
                </div>
            `;
        }
    }
};

window.ShopPage = ShopPage;
