import { PostCardComponent } from '../components/postCard.js';
import { CONFIG } from '../config.js';

export const ShopPage = {
    cachedPosts: null,

    render() {
        setTimeout(() => this.loadPosts(), 0);

        if (this.cachedPosts && this.cachedPosts.length > 0) {
            return `
                <div id="shop-feed" class="shop-feed-container">
                    ${this.renderFeedHtml(this.cachedPosts)}
                </div>
            `;
        }

        return `
            <div id="shop-feed" class="shop-feed-container">
                <div class="loader-container">
                    <div class="spinner"></div>
                    <p class="loading-title">Curating Catalog...</p>
                </div>
            </div>
        `;
    },

    renderFeedHtml(posts) {
        return posts.map(post => {
            const itemData = {
                ...post,
                image: post.image_url || post.image
            };
            return PostCardComponent.render(itemData);
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
                feedContainer.innerHTML = `<p class="empty-msg">No products available in shop.</p>`;
                return;
            }

            feedContainer.innerHTML = this.renderFeedHtml(posts);
        } catch (error) {
            console.error("Error fetching items:", error);
            feedContainer.innerHTML = `<p class="error-msg">Failed to load shop products.</p>`;
        }
    }
};

window.ShopPage = ShopPage;
      
