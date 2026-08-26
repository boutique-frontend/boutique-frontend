const App = {
    init() {
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer && typeof NavbarComponent !== 'undefined') {
            navbarContainer.innerHTML = NavbarComponent.render();
        }
        this.navigate('home');
    },

    navigate(page) {
        const container = document.getElementById('app-content');
        if (!container) return;

        // Reset scroll position on page change
        window.scrollTo(0, 0);

        if (page === 'home') {
            container.innerHTML = HomePage.render();
            if (HomePage.loadPosts) {
                HomePage.loadPosts();
            }
        } else if (page === 'contact') {
            container.innerHTML = typeof ContactPage !== 'undefined' ? ContactPage.render() : '';
        } else if (page === 'post') {
            container.innerHTML = typeof PostPage !== 'undefined' ? PostPage.render() : '';
        }
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
