const NavbarComponent = {
    render() {
        return `
            <nav class="bottom-nav">
                <button onclick="App.navigate('home')" class="nav-btn">
                    <span class="nav-icon">🏠</span>
                    <span>Home</span>
                </button>
                <button onclick="App.handleCreatePost()" class="plus-btn">+</button>
                <button onclick="App.navigate('contact')" class="nav-btn">
                    <span class="nav-icon">📞</span>
                    <span>Contact</span>
                </button>
            </nav>
        `;
    }
};
