const HomePage = {
    render() {
        setTimeout(() => this.loadPosts(), 0);

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

    async loadPosts() {
        const feedContainer = document.getElementById('product-feed');
        if (!feedContainer) return;

        // Timer to update message if Render is taking time to wake up (cold start)
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

            if (!posts || posts.length === 0) {
                feedContainer.innerHTML = `<p class="empty-msg">No products uploaded yet.</p>`;
                return;
            }

            feedContainer.innerHTML = posts.map(post => {
                const itemData = {
                    ...post,
                    image: post.image_url || post.image
                };
                return PostCardComponent.render(itemData);
            }).join('');
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
