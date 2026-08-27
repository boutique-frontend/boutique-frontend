import { CONFIG } from './config.js';
import { HomePage } from './pages/home.js';
import { ShopPage } from './pages/shop.js';
import { ContactPage } from './pages/contact.js';
import { PostPage } from './pages/post.js';
import { NavbarComponent } from './components/navbar.js';

export const App = {
    init() {
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

        // Reset scroll position on route switch
        container.scrollTop = 0;
        window.scrollTo(0, 0);

        // Update navigation active state
        this.renderNavbar(page);

        // Modular view router
        switch (page) {
            case 'home':
                container.innerHTML = HomePage.render();
                break;
            case 'shop':
                container.innerHTML = ShopPage.render();
                break;
            case 'contact':
            case 'about':
                container.innerHTML = ContactPage.render();
                break;
            case 'post':
                container.innerHTML = PostPage.render();
                break;
            default:
                container.innerHTML = HomePage.render();
                break;
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
        
