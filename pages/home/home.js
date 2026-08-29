import { CONFIG } from '../../config.js';

export const HomePage = {
    cachedFeatured: null,

    // Admin delete password
    adminPassword: '5090',

    async render() {
        try {
            const response = await fetch('./pages/home/home.html');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.text();

        } catch (error) {
            console.error('Home render error:', error);

            return `
                <div class="home-error-state">
                    <div class="home-error-icon">⚠️</div>
                    <h3>Error loading Home page</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }
    },

    async init() {
        this.bindEvents();
        await this.loadFeaturedProducts();
    },

    bindEvents() {
        const shopNowBtn = document.getElementById('heroShopNowBtn');

        if (shopNowBtn) {
            shopNowBtn.addEventListener('click', () => {
                window.location.hash = '#shop';
            });
        }

        const exploreBtn = document.getElementById('heroExploreBtn');

        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                window.location.hash = '#shop';
            });
        }

        const collectionCards =
            document.querySelectorAll('.collection-card');

        collectionCards.forEach(card => {
            card.addEventListener('click', () => {
                const cat = card.getAttribute('data-cat');

                window.location.hash =
                    `#shop?category=${cat || 'all'}`;
            });
        });
    },

    async loadFeaturedProducts(forceRefresh = false) {
        const featuredContainer =
            document.getElementById('featured-products-container');

        if (!featuredContainer) return;

        if (this.cachedFeatured && !forceRefresh) {
            this.renderFeaturedGrid(this.cachedFeatured);
            return;
        }

        try {
            const response = await fetch(CONFIG.API_URL);

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const posts = await response.json();

            if (Array.isArray(posts) && posts.length > 0) {
                this.cachedFeatured = posts;
                this.renderFeaturedGrid(posts);
            } else {
                this.renderEmptyState(featuredContainer);
            }

        } catch (error) {
            console.error(
                'Error fetching live featured products:',
                error
            );

            this.renderErrorState(featuredContainer);
        }
    },

    renderFeaturedGrid(posts) {
        const featuredContainer =
            document.getElementById('featured-products-container');

        if (!featuredContainer) return;

        /*
         * IMPORTANT:
         * Do NOT create a second scroll container here.
         * The main Home page should handle scrolling.
         */
        featuredContainer.classList.add('featured-products-feed');

        // Remove old inline scrolling styles from previous version
        featuredContainer.style.maxHeight = '';
        featuredContainer.style.overflowY = '';
        featuredContainer.style.scrollSnapType = '';
        featuredContainer.style.webkitOverflowScrolling = '';
        featuredContainer.style.display = '';
        featuredContainer.style.flexDirection = '';
        featuredContainer.style.gap = '';
        featuredContainer.style.padding = '';

        const fallbackImg =
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=900&auto=format&fit=crop';

        featuredContainer.innerHTML = posts.map((item, index) => {

            const imgSrc =
                item.image_url ||
                item.image ||
                item.img ||
                item.photo ||
                item.url ||
                fallbackImg;

            const title =
                item.title ||
                item.name ||
                item.caption ||
                item.text ||
                'Boutique Outfit';

            const rawPrice =
                item.price !== undefined &&
                item.price !== null
                    ? item.price.toString()
                    : '2,850';

            const price =
                rawPrice.toLowerCase().includes('rs')
                    ? rawPrice
                    : `Rs. ${rawPrice}`;

            const productId =
                item.id !== undefined
                    ? item.id
                    : index;

            return `
                <article
                    class="tiktok-feed-card"
                    data-id="${this.escapeHTML(productId)}"
                >

                    <div class="product-image-wrapper">

                        <img
                            class="product-feed-image"
                            src="${this.escapeAttribute(imgSrc)}"
                            alt="${this.escapeHTML(title)}"
                            loading="${index === 0 ? 'eager' : 'lazy'}"
                            onerror="
                                this.onerror=null;
                                this.src='${fallbackImg}';
                            "
                        >

                        <div class="product-image-overlay"></div>

                    </div>

                    <button
                        class="wishlist-btn"
                        type="button"
                        aria-label="Add to wishlist"
                    >
                        ♡
                    </button>

                    <div class="product-feed-content">

                        <div class="product-feed-title">
                            ${this.escapeHTML(title)}
                        </div>

                        <div class="product-feed-price">
                            ${this.escapeHTML(price)}
                        </div>

                        <button
                            class="view-details-btn"
                            type="button"
                        >
                            <span>VIEW FULL DETAILS</span>
                            <span class="view-arrow">→</span>
                        </button>

                    </div>

                </article>
            `;

        }).join('');

        this.bindWishlistBtns();
        this.bindCardClicks(posts);
    },

    bindCardClicks(posts) {
        const cards =
            document.querySelectorAll('.tiktok-feed-card');

        cards.forEach(card => {

            card.addEventListener('click', event => {

                if (
                    event.target.closest('.wishlist-btn')
                ) {
                    return;
                }

                const id = card.getAttribute('data-id');

                const product = posts.find(
                    item => String(item.id) === String(id)
                );

                if (product) {
                    this.openProductModal(product);
                }
            });

        });
    },

    bindWishlistBtns() {
        const wishlistBtns =
            document.querySelectorAll('.wishlist-btn');

        wishlistBtns.forEach(btn => {

            btn.addEventListener('click', event => {

                event.preventDefault();
                event.stopPropagation();

                btn.classList.toggle('active');

                if (btn.classList.contains('active')) {
                    btn.innerHTML = '♥';
                    btn.setAttribute(
                        'aria-label',
                        'Remove from wishlist'
                    );
                } else {
                    btn.innerHTML = '♡';
                    btn.setAttribute(
                        'aria-label',
                        'Add to wishlist'
                    );
                }

            });

        });
    },

    openProductModal(product) {

        const existingModal =
            document.getElementById('home-product-modal');

        if (existingModal) {
            existingModal.remove();
        }

        const fallbackImg =
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=900&auto=format&fit=crop';

        const imgSrc =
            product.image_url ||
            product.image ||
            product.img ||
            product.photo ||
            product.url ||
            fallbackImg;

        const title =
            product.title ||
            product.name ||
            product.caption ||
            product.text ||
            'Boutique Outfit';

        const rawPrice =
            product.price !== undefined &&
            product.price !== null
                ? product.price.toString()
                : '2,850';

        const price =
            rawPrice.toLowerCase().includes('rs')
                ? rawPrice
                : `Rs. ${rawPrice}`;

        const description =
            product.description ||
            'Exclusive boutique collection item.';

        const phone =
            CONFIG.WHATSAPP_NUMBER ||
            '923001234567';

        const waMessage = encodeURIComponent(
            `Hi SAnA Boutique! I want to order: ${title} (${price})`
        );

        const modalHtml = `
            <div
                id="home-product-modal"
                class="product-modal"
                role="dialog"
                aria-modal="true"
            >

                <div
                    class="product-modal-backdrop"
                    id="productModalBackdrop"
                ></div>

                <div class="product-modal-panel">

                    <button
                        id="closeHomeModalBtn"
                        class="product-modal-close"
                        type="button"
                        aria-label="Close product details"
                    >
                        ×
                    </button>

                    <div class="product-modal-image-section">

                        <img
                            class="product-modal-image"
                            src="${this.escapeAttribute(imgSrc)}"
                            alt="${this.escapeHTML(title)}"
                            onerror="
                                this.onerror=null;
                                this.src='${fallbackImg}';
                            "
                        >

                        <div class="image-view-badge">
                            <span>⌕</span>
                            <span>PRODUCT VIEW</span>
                        </div>

                    </div>

                    <div class="product-modal-content">

                        <div class="product-modal-label">
                            SANA BOUTIQUE
                        </div>

                        <h2 class="product-modal-title">
                            ${this.escapeHTML(title)}
                        </h2>

                        <div class="product-modal-price">
                            ${this.escapeHTML(price)}
                        </div>

                        <div class="product-modal-divider"></div>

                        <p class="product-modal-description">
                            ${this.escapeHTML(description)}
                        </p>

                        <a
                            href="https://wa.me/${phone}?text=${waMessage}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="whatsapp-order-btn"
                        >
                            <span class="whatsapp-icon">☏</span>
                            <span>ORDER ON WHATSAPP</span>
                        </a>

                        <button
                            id="deletePostBtn"
                            class="delete-post-btn"
                            type="button"
                        >
                            <span class="delete-icon">♲</span>

                            <span class="delete-text">
                                DELETE POST
                            </span>

                            <span class="delete-arrow">
                                →
                            </span>
                        </button>

                    </div>

                </div>

            </div>
        `;

        document.body.insertAdjacentHTML(
            'beforeend',
            modalHtml
        );

        // Lock background page while viewer is open
        document.body.classList.add('modal-open');

        const modal =
            document.getElementById('home-product-modal');

        const closeModal = () => {

            modal?.classList.add('closing');

            setTimeout(() => {

                modal?.remove();

                document.body.classList.remove(
                    'modal-open'
                );

            }, 180);
        };

        const closeBtn =
            document.getElementById('closeHomeModalBtn');

        const backdrop =
            document.getElementById('productModalBackdrop');

        const deleteBtn =
            document.getElementById('deletePostBtn');

        closeBtn?.addEventListener(
            'click',
            closeModal
        );

        backdrop?.addEventListener(
            'click',
            closeModal
        );

        deleteBtn?.addEventListener(
            'click',
            () => {
                this.handleDeleteWithPassword(
                    product.id,
                    closeModal
                );
            }
        );

        // ESC closes viewer
        const escapeHandler = event => {

            if (event.key === 'Escape') {
                closeModal();

                document.removeEventListener(
                    'keydown',
                    escapeHandler
                );
            }
        };

        document.addEventListener(
            'keydown',
            escapeHandler
        );
    },

    async handleDeleteWithPassword(
        productId,
        closeModalCallback
    ) {

        const inputPassword =
            prompt(
                'Enter Admin Password to delete this post:'
            );

        if (inputPassword === null) {
            return;
        }

        if (inputPassword !== this.adminPassword) {

            alert(
                '❌ Incorrect password.\n\nAccess denied.'
            );

            return;
        }

        const confirmed =
            confirm(
                'Delete this post permanently?'
            );

        if (!confirmed) {
            return;
        }

        try {

            if (CONFIG?.API_URL) {

                const response =
                    await fetch(
                        `${CONFIG.API_URL}/${productId}`,
                        {
                            method: 'DELETE'
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        'Server failed to delete the post.'
                    );
                }
            }

            this.cachedFeatured =
                (this.cachedFeatured || [])
                    .filter(
                        p => p.id != productId
                    );

            const container =
                document.getElementById(
                    'featured-products-container'
                );

            if (
                this.cachedFeatured.length > 0
            ) {

                this.renderFeaturedGrid(
                    this.cachedFeatured
                );

            } else if (container) {

                this.renderEmptyState(
                    container
                );
            }

            closeModalCallback();

            alert(
                '✅ Post deleted successfully.'
            );

        } catch (error) {

            console.error(
                'Error deleting post:',
                error
            );

            alert(
                '❌ Could not delete the post from the server.'
            );
        }
    },

    renderEmptyState(container) {

        container.innerHTML = `
            <div class="home-empty-state">

                <div class="empty-icon">
                    ✦
                </div>

                <h3>
                    No products yet
                </h3>

                <p>
                    New boutique pieces will appear here.
                </p>

            </div>
        `;
    },

    renderErrorState(container) {

        container.innerHTML = `
            <div class="home-error-state">

                <div class="home-error-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to load products
                </h3>

                <p>
                    Please check your connection
                    and try again.
                </p>

            </div>
        `;
    },

    escapeHTML(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    escapeAttribute(value) {
        return String(value ?? '')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
};

window.HomePage = HomePage;
