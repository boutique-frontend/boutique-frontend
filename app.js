import { CONFIG } from './config.js';
import { HomePage } from './pages/home/home.js';
import { ShopPage } from './pages/shop/shop.js';
import { PostPage } from './pages/post/post.js';
import { ContactPage } from './pages/contact/contact.js';
import { AboutPage } from './pages/about/about.js';
import { Navbar } from './js/components/navbar.js';

export const App = {
    async init() {
        const appContainer = document.getElementById('app');
        if (!appContainer) return;

        // Render base shell with Navbar
        appContainer.innerHTML = `
            <div id="page-content" style="height: 100%; width: 100%;"></div>
            ${Navbar.render()}
        `;

        // Handle routing
        window.addEventListener('hashchange', () => this.handleRoute());
        await this.handleRoute();
    },

    async handleRoute() {
        const hash = window.location.hash.replace('#', '') || 'home';
        const contentContainer = document.getElementById('page-content');
        if (!contentContainer) return;

        Navbar.updateActiveTab(hash);

        switch (hash) {
            case 'home':
                contentContainer.innerHTML = await HomePage.render();
                if (HomePage.init) HomePage.init();
                break;
            case 'shop':
                contentContainer.innerHTML = await ShopPage.render();
                if (ShopPage.init) ShopPage.init();
                break;
            case 'post':
                contentContainer.innerHTML = await PostPage.render();
                break;
            case 'about':
                contentContainer.innerHTML = await AboutPage.render();
                break;
            case 'contact':
                contentContainer.innerHTML = await ContactPage.render();
                break;
            default:
                contentContainer.innerHTML = await HomePage.render();
                if (HomePage.init) HomePage.init();
                break;
        }
    },

    navigate(route) {
        window.location.hash = `#${route}`;
    }
};

window.App = App;

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
