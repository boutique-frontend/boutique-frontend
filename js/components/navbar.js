const NavbarComponent = {
    render() {
        return `
            <nav class="bottom-nav">
                <button onclick="App.navigate('home')" class="nav-item">
                    <span>🏠</span>
                    <small>Home</small>
                </button>
                <button onclick="App.handleCreatePost()" class="plus-btn">+</button>
                <button onclick="App.navigate('contact')" class="nav-item">
                    <span>📞</span>
                    <small>Contact</small>
                </button>
            </nav>
        `;
    }
};
