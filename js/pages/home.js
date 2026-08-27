import { PostCardComponent } from '../components/postCard.js';
import { CONFIG } from '../config.js';

export const HomePage = {
    // Memory cache for fetched posts
    cachedPosts: null,

    render() {
        setTimeout(() => this.loadPosts(), 0);

        // Instant render if cached posts exist
        if (this.cachedPosts && this.cachedPosts.length > 0) {
            return `
                <div id="product-feed" class="product-feed">
                    ${this.renderFeedHtml(this.cachedPosts)}
                </div>
            `;
        }

        return `
            <div id="product-feed" class="product-feed">
                <div class="loader-container" id="loaderContainer">
                    <div class="spinner"></div>
                    <p class="loading-title" id="loadingTitle">Curating SAnA Collection...</p>
                    <p class="loading-subtitle" id="loadingSubtitle">Fetching the latest luxury outfits</p>
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
        const feedContainer = document.getElementById('product-feed');
        if (!feedContainer) return;

        // Skip network request if cached data exists and forceRefresh is false
        if (this.cachedPosts && !forceRefresh) {
            feedContainer.innerHTML = this.renderFeedHtml(this.cachedPosts);
            return;
        }

        // Timer for server cold-start response message
        const wakeUpTimer = setTimeout(() => {
            const titleEl = document.getElementById('loadingTitle');
            const subTitleEl = document.getElementById('loadingSubtitle');
            if (titleEl && subTitleEl) {
                titleEl.innerText = "Waking up boutique server...";
                subTitleEl.innerText = "Please hold tight, preparing your catalog ✨";
            }
        }, 4000);

        try {
            const response = await fetch(CONFIG.API_URL);
            clearTimeout(wakeUpTimer);

            const posts = await response.json();
            
            // Save to memory cache
            this.cachedPosts = posts;

            if (!posts || posts.length === 0) {
                feedContainer.innerHTML = `<p class="empty-msg">No products uploaded yet.</p>`;
                return;
            }

            feedContainer.innerHTML = this.renderFeedHtml(posts);
        } catch (error) {
            clearTimeout(wakeUpTimer);
            console.error("Error fetching items:", error);
            feedContainer.innerHTML = `
                <div class="loader-container">
                    <p class="error-msg">Unable to connect. Tap home to reload.</p>
                </div>
            `;
        }
    }
};
