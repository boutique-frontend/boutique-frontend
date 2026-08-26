const App = {
    init() {
        document.getElementById('navbar-container').innerHTML = NavbarComponent.render();
        this.navigate('home');
    },

    navigate(page) {
        const content = document.getElementById('app-content');
        if (page === 'home') content.innerHTML = HomePage.render();
        if (page === 'contact') content.innerHTML = ContactPage.render();
        if (page === 'post') content.innerHTML = PostPage.render();
    },

    handleCreatePost() {
        const pass = prompt("Enter passcode:");
        if (pass === CONFIG.ADMIN_PASSCODE) {
            this.navigate('post');
        } else if (pass !== null) {
            alert("Incorrect passcode!");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
