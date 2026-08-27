export const Navbar = {
    render() {
        return `
            <nav class="bottom-nav">
                <a href="#home" class="nav-item" data-route="home">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-label">Home</span>
                </a>
                <a href="#shop" class="nav-item" data-route="shop">
                    <span class="nav-icon">🛍️</span>
                    <span class="nav-label">Shop</span>
                </a>
                <a href="#post" class="nav-item post-btn-wrapper" data-route="post">
                    <div class="post-circle-btn">
                        <span>+</span>
                    </div>
                    <span class="nav-label">Post</span>
                </a>
                <a href="#about" class="nav-item" data-route="about">
                    <span class="nav-icon">👤</span>
                    <span class="nav-label">About</span>
                </a>
                <a href="#contact" class="nav-item" data-route="contact">
                    <span class="nav-icon">📞</span>
                    <span class="nav-label">Contact</span>
                </a>
            </nav>
        `;
    },

    updateActiveTab(activeRoute) {
        const items = document.querySelectorAll('.bottom-nav .nav-item');
        items.forEach(item => {
            const route = item.getAttribute('data-route');
            if (route === activeRoute) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
};
