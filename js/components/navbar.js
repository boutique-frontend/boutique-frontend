export const Navbar = {
    render() {
        return `
            <nav class="bottom-nav">
                <a href="#home" class="nav-item" data-route="home">
                    <i class="fa-solid fa-house nav-icon"></i>
                    <span class="nav-label">Home</span>
                </a>
                <a href="#shop" class="nav-item" data-route="shop">
                    <i class="fa-solid fa-bag-shopping nav-icon"></i>
                    <span class="nav-label">Shop</span>
                </a>
                <a href="#post" class="nav-item post-btn-wrapper" data-route="post">
                    <div class="post-circle-btn">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <span class="nav-label">Post</span>
                </a>
                <a href="#about" class="nav-item" data-route="about">
                    <i class="fa-regular fa-user nav-icon"></i>
                    <span class="nav-label">About</span>
                </a>
                <a href="#contact" class="nav-item" data-route="contact">
                    <i class="fa-solid fa-phone nav-icon"></i>
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
