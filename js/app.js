import { CONFIG } from './config.js';
import { HomePage } from './pages/home.js';
import { ContactPage } from './pages/contact.js';
import { PostPage } from './pages/post.js';
import { NavbarComponent } from './components/navbar.js';

export const App = {
    init() {
        this.renderNavbar('home');
        this.setupRouter();
        this.handleHashChange();
    },

    renderNavbar(activeTab = 'home') {
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer && typeof NavbarComponent !== 'undefined') {
            navbarContainer.innerHTML = NavbarComponent.render(activeTab);
        }
    },

    setupRouter() {
        window.addEventListener('hashchange', () => this.handleHashChange());
    },

    handleHashChange() {
        const hash = window.location.hash.replace('#', '') || 'home';
        this.navigate(hash);
    },

    navigate(page) {
        const container = document.getElementById('app-content');
        if (!container) return;

        // Reset scroll position on container on page change
        container.scrollTop = 0;
        window.scrollTo(0, 0);

        // Sync active nav item
        this.renderNavbar(page);

        if (page === 'home' || page === 'shop') {
            container.innerHTML = HomePage.render();
        } else if (page === 'contact') {
            container.innerHTML = ContactPage.render();
        } else if (page === 'post') {
            container.innerHTML = PostPage.render();
        } else if (page === 'about') {
            container.innerHTML = ContactPage.render(); // Maps about tab to Contact/About view
        } else {
            container.innerHTML = HomePage.render();
        }
    },

    handleCreatePost() {
        const pass = prompt("Enter SAnA Admin Passcode:");
        if (pass === CONFIG.ADMIN_PASSCODE) {
            window.location.hash = '#post';
        } else if (pass !== null) {
            alert("Incorrect passcode!");
        }
    }
};

// Expose to window scope for global routing access
window.App = App;

document.addEventListener('DOMContentLoaded', () => App.init());
