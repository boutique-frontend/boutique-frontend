import { Navbar } from './js/components/navbar.js';

export const App = {
    async init() {
        const appContainer = document.getElementById('app');
        if (!appContainer) return;

        appContainer.innerHTML = `
            <div id="page-content"></div>
            ${Navbar.render()}
        `;

        window.addEventListener('hashchange', () => this.handleRoute());
        await this.handleRoute();
    },

    async handleRoute() {
        const hash = window.location.hash.replace('#', '') || 'home';
        const contentContainer = document.getElementById('page-content');
        if (!contentContainer) return;

        Navbar.updateActiveTab(hash);

        try {
            let module;
            // Clean section route extraction
            const route = hash.split('/')[0];

            switch (route) {
                case 'home':
                    module = await import('./pages/home/home.js?v=1');
                    contentContainer.innerHTML = await module.HomePage.render();
                    if (module.HomePage.init) module.HomePage.init();
                    break;
                case 'shop':
                    module = await import('./pages/shop/shop.js?v=1');
                    contentContainer.innerHTML = await module.ShopPage.render();
                    if (module.ShopPage.init) module.ShopPage.init();
                    break;
                case 'post':
                    module = await import('./pages/post/post.js?v=1');
                    contentContainer.innerHTML = await module.PostPage.render();
                    break;
                case 'about':
                    module = await import('./pages/about/about.js?v=1');
                    contentContainer.innerHTML = await module.AboutPage.render();
                    break;
                case 'contact':
                    module = await import('./pages/contact/contact.js?v=1');
                    contentContainer.innerHTML = await module.ContactPage.render();
                    break;
                default:
                    module = await import('./pages/home/home.js?v=1');
                    contentContainer.innerHTML = await module.HomePage.render();
                    if (module.HomePage.init) module.HomePage.init();
                    break;
            }
        } catch (err) {
            console.error("Routing error:", err);
            contentContainer.innerHTML = `
                <div class="error-box">
                    <h3>Failed to load page content</h3>
                    <p style="color:#8c9ba5; font-size:0.85rem; margin-top:6px;">${err.message}</p>
                </div>
            `;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
