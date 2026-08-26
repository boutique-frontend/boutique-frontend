const App = {
    init() {
        document.getElementById('navbar-container').innerHTML = NavbarComponent.render();
        this.navigate('home');
    },

    navigate(page) {
        const container = document.getElementById('app-content');
        if (page === 'home') container.innerHTML = HomePage.render();
        if (page === 'contact') container.innerHTML = ContactPage.render();
        if (page === 'post') container.innerHTML = PostPage.render();
    },

    handleCreatePost() {
        const pass = prompt("Enter SAnA Admin Passcode:");
        if (pass === CONFIG.ADMIN_PASSCODE) {
            this.navigate('post');
        } else if (pass !== null) {
            alert("Incorrect passcode!");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
