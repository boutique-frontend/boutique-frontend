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
            const route = hash.split('/')[0];

            switch (route) {
                case 'home':
                    module = await import('./pages/home/home.js?v=1');
                    window.HomePage = module.HomePage;
                    contentContainer.innerHTML = await module.HomePage.render();
                    if (module.HomePage.init) module.HomePage.init();
                    break;
                case 'shop':
                    module = await import('./pages/shop/shop.js?v=1');
                    window.ShopPage = module.ShopPage;
                    contentContainer.innerHTML = await module.ShopPage.render();
                    if (module.ShopPage.init) module.ShopPage.init();
                    break;
                case 'post':
                    module = await import('./pages/post/post.js?v=1');
                    window.PostPage = module.PostPage;
                    contentContainer.innerHTML = await module.PostPage.render();
                    if (module.PostPage.init) module.PostPage.init();
                    break;
                case 'about':
                    module = await import('./pages/about/about.js?v=1');
                    window.AboutPage = module.AboutPage;
                    contentContainer.innerHTML = await module.AboutPage.render();
                    if (module.AboutPage.init) module.AboutPage.init();
                    break;
                case 'contact':
                    module = await import('./pages/contact/contact.js?v=1');
                    window.ContactPage = module.ContactPage;
                    contentContainer.innerHTML = await module.ContactPage.render();
                    if (module.ContactPage.init) module.ContactPage.init();
                    break;
                default:
                    module = await import('./pages/home/home.js?v=1');
                    window.HomePage = module.HomePage;
                    contentContainer.innerHTML = await module.HomePage.render();
                    if (module.HomePage.init) module.HomePage.init();
                    break;
            }

            // Every route swap lands here — reset scroll back to top
            // no matter which page just loaded.
            this.resetScroll(contentContainer);
        } catch (err) {
            console.error("Routing error:", err);
            contentContainer.innerHTML = `
                <div class="error-box">
                    <h3>Failed to load page content</h3>
                    <p style="color:#8c9ba5; font-size:0.85rem; margin-top:6px;">${err.message}</p>
                </div>
            `;
            this.resetScroll(contentContainer);
        }
    },

    // Covers three possible scroll owners so it works no matter how
    // a given page is built:
    // 1. The window/document itself (normal page scroll)
    // 2. #page-content, if that's the element with overflow set
    // 3. The page's own root div (e.g. .about-page, .home-page),
    //    if THAT element has its own overflow-y: auto — which is
    //    how home.js's page is set up
    resetScroll(contentContainer) {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        if (contentContainer) {
            contentContainer.scrollTop = 0;

            const pageRoot = contentContainer.firstElementChild;
            if (pageRoot) pageRoot.scrollTop = 0;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
