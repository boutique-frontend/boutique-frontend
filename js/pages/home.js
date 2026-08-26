const HomePage = {
    render() {
        // Automatically fetch posts after container renders to the DOM
        setTimeout(() => this.loadPosts(), 0);

        return `
            <div id="product-feed" class="product-feed">
                <p class="loading-text">Loading catalog...</p>
            </div>
        `;
    },

    async loadPosts() {
        const feedContainer = document.getElementById('product-feed');
        if (!feedContainer) return;

        try {
            const response = await fetch(CONFIG.API_URL);
            const posts = await response.json();

            if (!posts || posts.length === 0) {
                feedContainer.innerHTML = `<p class="empty-msg">No products uploaded yet.</p>`;
                return;
            }

            // Maps backend data into PostCardComponent
            feedContainer.innerHTML = posts.map(post => {
                const itemData = {
                    ...post,
                    image: post.image_url || post.image
                };
                return PostCardComponent.render(itemData);
            }).join('');
        } catch (error) {
            console.error("Error fetching items:", error);
            feedContainer.innerHTML = `<p class="error-msg">Failed to load posts. Check your connection.</p>`;
        }
    }
};
