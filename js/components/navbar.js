export const NavbarComponent = {
    render(activeTab = 'home') {
        return `
            <div class="navbar-wrapper">
                <nav class="navbar">
                    <a href="#home" onclick="App.navigate('home')" class="nav-item ${activeTab === 'home' || activeTab === 'shop' ? 'active' : ''}">
                        <i class="fa-solid fa-house"></i>
                        <span>Home</span>
                    </a>
                    <a href="#shop" onclick="App.navigate('shop')" class="nav-item ${activeTab === 'shop' ? 'active' : ''}">
                        <i class="fa-solid fa-bag-shopping"></i>
                        <span>Shop</span>
                    </a>
                    <a href="javascript:void(0)" onclick="App.handleCreatePost()" class="add-btn" aria-label="Add Item">
                        <i class="fa-solid fa-plus"></i>
                    </a>
                    <a href="#about" onclick="App.navigate('about')" class="nav-item ${activeTab === 'about' ? 'active' : ''}">
                        <i class="fa-solid fa-user"></i>
                        <span>About</span>
                    </a>
                    <a href="#contact" onclick="App.navigate('contact')" class="nav-item ${activeTab === 'contact' ? 'active' : ''}">
                        <i class="fa-solid fa-phone"></i>
                        <span>Contact</span>
                    </a>
                </nav>
            </div>
        `;
    }
};

// Bind to window object for inline HTML event handler accessibility
window.NavbarComponent = NavbarComponent;
