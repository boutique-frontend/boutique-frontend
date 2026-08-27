import { CONFIG } from './config.js';
import { HomePage } from './pages/home.js';
import { ShopPage } from './pages/shop.js';
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

        container.scrollTop = 0;
        window.scrollTo(0, 0);

        this.renderNavbar(page);

        if (page === 'home') {
            container.innerHTML = HomePage.render();
        } else if (page === 'shop') {
            container.innerHTML = ShopPage.render();
        } else if (page === 'contact' || page === 'about') {
            container.innerHTML = ContactPage.render();
        } else if (page === 'post') {
            container.innerHTML = PostPage.render();
        } else {
            container.innerHTML = HomePage.render();
        }
    },

    handleCreatePost() {
        const pass = prompt("Enter SAnA Admin Passcode:");
        const passcode = (typeof CONFIG !== 'undefined' && CONFIG.ADMIN_PASSCODE) ? CONFIG.ADMIN_PASSCODE : "1234";
        
        if (pass === passcode) {
            window.location.hash = '#post';
        } else if (pass !== null) {
            alert("Incorrect passcode!");
        }
    }
};

window.App = App;

document.addEventListener('DOMContentLoaded', () => App.init());
