const NavbarComponent = {
    render() {
        return `
            <nav class="navbar">
                <a href="javascript:void(0)" onclick="App.navigate('home')" class="nav-item">
                    <span style="font-size: 1.2rem; margin-bottom: 2px;">🏠</span>
                    Home
                </a>
                
                <a href="javascript:void(0)" onclick="App.navigate('post')" class="add-btn">
                    +
                </a>
                
                <a href="javascript:void(0)" onclick="App.navigate('contact')" class="nav-item">
                    <span style="font-size: 1.2rem; margin-bottom: 2px;">📞</span>
                    Contact
                </a>
            </nav>
        `;
    }
};
