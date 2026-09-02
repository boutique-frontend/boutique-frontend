import { CONFIG } from '../../config.js';

export const HomePage = {
    cachedFeatured: null,

    // =========================================================
    // ADMIN PASSWORD
    // =========================================================
    adminPassword: '5090',

    // =========================================================
    // RENDER HOME PAGE
    // =========================================================
    async render() {
        try {
            const response = await fetch('./pages/home/home.html');

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return await response.text();

        } catch (error) {
            console.error('Home render error:', error);

            return `
                <div class="home-error-state">
                    <div class="home-error-icon">⚠️</div>
                    <h3>Unable to load Home</h3>
                    <p>${this.escapeHTML(error.message)}</p>
                </div>
            `;
        }
    },

    // =========================================================
    // INIT
    // =========================================================
    async init() {
        this.bindEvents();
        await this.loadFeaturedProducts();
    },

    // =========================================================
    // HOME EVENTS
    // =========================================================
    bindEvents() {
        document.getElementById('heroShopNowBtn')
            ?.addEventListener('click', () => this.scrollToFeatured());

        document.getElementById('heroExploreBtn')
            ?.addEventListener('click', () => this.scrollToCollections());

        document.getElementById('viewAllProductsBtn')
            ?.addEventListener('click', () => this.scrollToFeatured());

        document.querySelectorAll('.collection-card').forEach(card => {
            const openCollection = () => {
                const category = card.getAttribute('data-cat') || 'all';

                window.location.hash =
                    `#shop?category=${encodeURIComponent(category)}`;
            };

            card.addEventListener('click', openCollection);

            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openCollection();
                }
            });
        });

        document.querySelectorAll('.hero-dots .dot').forEach(dot => {
            dot.addEventListener('click', () => {
                document.querySelectorAll('.hero-dots .dot')
                    .forEach(item => item.classList.remove('active'));

                dot.classList.add('active');
            });
        });
    },

    // =========================================================
    // SCROLL HELPERS
    // =========================================================
    scrollToFeatured() {
        const featured = document.getElementById('shop');

        if (!featured) {
            window.location.hash = '#shop';
            return;
        }

        featured.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    },

    scrollToCollections() {
        document.getElementById('collections')
            ?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
    },

    // =========================================================
    // LOAD PRODUCTS
    // =========================================================
    async loadFeaturedProducts(forceRefresh = false) {
        const container =
            document.getElementById('featured-products-container');

        if (!container) return;

        if (this.cachedFeatured && !forceRefresh) {
            this.renderFeaturedGrid(this.cachedFeatured);
            return;
        }

        this.renderLoadingState(container);

        try {
            const response = await fetch(CONFIG.API_URL);

            if (!response.ok) {
                throw new Error(
                    `API request failed: ${response.status}`
                );
            }

            const posts = await response.json();

            if (Array.isArray(posts) && posts.length > 0) {
                this.cachedFeatured = posts;
                this.renderFeaturedGrid(posts);
            } else {
                this.cachedFeatured = [];
                this.renderEmptyState(container);
            }

        } catch (error) {
            console.error('Error fetching products:', error);
            this.renderErrorState(container);
        }
    },

    // =========================================================
    // RENDER PRODUCT FEED
    // =========================================================
    renderFeaturedGrid(posts) {
        const container =
            document.getElementById('featured-products-container');

        if (!container) return;

        container.classList.add('featured-products-feed');

        // Remove old inline scrolling styles.
        container.style.maxHeight = '';
        container.style.overflowY = '';
        container.style.scrollSnapType = '';
        container.style.webkitOverflowScrolling = '';
        container.style.display = '';
        container.style.flexDirection = '';
        container.style.gap = '';
        container.style.padding = '';

        const fallbackImg =
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=900&auto=format&fit=crop';

        container.innerHTML = posts.map((item, index) => {
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
                    ? String(item.price)
                    : '2,850';

            const price =
                rawPrice.toLowerCase().includes('rs')
                    ? rawPrice
                    : `Rs. ${rawPrice}`;

            const productId =
                item.id !== undefined &&
                item.id !== null
                    ? item.id
                    : index;

            return `
                <article
                    class="tiktok-feed-card"
                    data-id="${this.escapeAttribute(productId)}"
                    data-product-index="${index}"
                    tabindex="0"
                    role="button"
                    aria-label="View details for ${this.escapeAttribute(title)}"
                >
                    <div class="product-image-wrapper">
                        <img
                            class="product-feed-image"
                            src="${this.escapeAttribute(imgSrc)}"
                            alt="${this.escapeAttribute(title)}"
                            loading="${index === 0 ? 'eager' : 'lazy'}"
                            decoding="async"
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
                            aria-label="View full details"
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

    // =========================================================
    // PRODUCT CARD CLICK
    // =========================================================
    bindCardClicks(posts) {
        document.querySelectorAll('.tiktok-feed-card')
            .forEach(card => {

                const openCard = event => {
                    if (
                        event?.target?.closest?.('.wishlist-btn')
                    ) {
                        return;
                    }

                    if (
                        event?.target?.closest?.('.view-details-btn')
                    ) {
                        event.preventDefault();
                    }

                    const index = Number(
                        card.getAttribute('data-product-index')
                    );

                    const product = posts[index];

                    if (product) {
                        this.openProductModal(product);
                    }
                };

                card.addEventListener('click', openCard);

                card.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openCard(event);
                    }
                });
            });
    },

    // =========================================================
    // WISHLIST
    // =========================================================
    bindWishlistBtns() {
        document.querySelectorAll('.wishlist-btn')
            .forEach(button => {

                button.addEventListener('click', event => {
                    event.preventDefault();
                    event.stopPropagation();

                    button.classList.toggle('active');

                    const isActive =
                        button.classList.contains('active');

                    button.textContent =
                        isActive ? '♥' : '♡';

                    button.setAttribute(
                        'aria-label',
                        isActive
                            ? 'Remove from wishlist'
                            : 'Add to wishlist'
                    );
                });
            });
    },

    // =========================================================
    // OPEN PRODUCT MODAL
    // =========================================================
    openProductModal(product) {
        document.getElementById('home-product-modal')
            ?.remove();

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
                ? String(product.price)
                : '2,850';

        const price =
            rawPrice.toLowerCase().includes('rs')
                ? rawPrice
                : `Rs. ${rawPrice}`;

        const description =
            product.description ||
            'Exclusive boutique collection item.';

        const phone = String(
            CONFIG.WHATSAPP_NUMBER ||
            '923001234567'
        ).replace(/\D/g, '');

        const waMessage = encodeURIComponent(
            `Hi SANA Boutique! I want to order: ${title} (${price})`
        );

        const modalHTML = `
            <div
                id="home-product-modal"
                class="product-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Product details"
            >
                <div
                    id="productModalBackdrop"
                    class="product-modal-backdrop"
                ></div>

                <div
                    class="product-modal-panel"
                    role="document"
                >
                    <button
                        id="closeHomeModalBtn"
                        class="product-modal-close"
                        type="button"
                        aria-label="Close product viewer"
                    >
                        <span>×</span>
                    </button>

                    <div
                        id="productImageViewer"
                        class="product-modal-image-section"
                        role="button"
                        tabindex="0"
                        aria-label="View product image fullscreen"
                    >
                        <img
                            class="product-modal-image"
                            src="${this.escapeAttribute(imgSrc)}"
                            alt="${this.escapeAttribute(title)}"
                            onerror="
                                this.onerror=null;
                                this.src='${fallbackImg}';
                            "
                        >

                        <div
                            class="product-modal-image-gradient"
                        ></div>

                        <div class="product-view-label">
                            <span class="product-view-icon">⌕</span>
                            <span>PRODUCT VIEW</span>
                        </div>

                        <div class="tap-image-hint">
                            TAP IMAGE TO VIEW FULLSCREEN
                        </div>
                    </div>

                    <div class="product-modal-content">
                        <div class="product-modal-label">
                            <span class="label-line"></span>
                            <span>SANA BOUTIQUE</span>
                            <span class="label-line"></span>
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
                            class="whatsapp-order-btn"
                            href="https://wa.me/${this.escapeAttribute(phone)}?text=${waMessage}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span class="whatsapp-icon">☏</span>
                            <span class="whatsapp-button-text">
                                ORDER ON WHATSAPP
                            </span>
                            <span class="button-arrow">→</span>
                        </a>

                        <button
                            id="deletePostBtn"
                            class="delete-post-btn"
                            type="button"
                        >
                            <span class="delete-icon">🗑</span>
                            <span class="delete-text">
                                DELETE POST
                            </span>
                            <span class="delete-arrow">→</span>
                        </button>

                        <div class="product-modal-footer">
                            SANA • PREMIUM COLLECTION
                        </div>
                    </div>
                </div>

                <div
                    id="fullscreenProductImage"
                    class="fullscreen-product-image"
                    aria-hidden="true"
                >
                    <button
                        id="closeFullscreenImage"
                        class="fullscreen-image-close"
                        type="button"
                        aria-label="Close fullscreen image"
                    >
                        ×
                    </button>

                    <div class="fullscreen-image-top-label">
                        <span>✦</span>
                        PRODUCT IMAGE
                    </div>

                    <img
                        src="${this.escapeAttribute(imgSrc)}"
                        alt="${this.escapeAttribute(title)}"
                    >

                    <div class="fullscreen-image-caption">
                        ${this.escapeHTML(title)}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML(
            'beforeend',
            modalHTML
        );

        document.body.classList.add('modal-open');

        const modal =
            document.getElementById('home-product-modal');

        const closeButton =
            document.getElementById('closeHomeModalBtn');

        const backdrop =
            document.getElementById('productModalBackdrop');

        const deleteButton =
            document.getElementById('deletePostBtn');

        const imageViewer =
            document.getElementById('productImageViewer');

        const fullscreen =
            document.getElementById('fullscreenProductImage');

        const fullscreenClose =
            document.getElementById('closeFullscreenImage');

        let isClosing = false;
        let escapeHandler = null;

        const closeModal = () => {
            if (isClosing) return;

            isClosing = true;

            if (escapeHandler) {
                document.removeEventListener(
                    'keydown',
                    escapeHandler
                );
            }

            modal?.classList.add('closing');

            setTimeout(() => {
                modal?.remove();
                document.body.classList.remove('modal-open');
            }, 220);
        };

        closeButton?.addEventListener(
            'click',
            event => {
                event.stopPropagation();
                closeModal();
            }
        );

        backdrop?.addEventListener(
            'click',
            closeModal
        );

        const openFullscreen = () => {
            fullscreen?.classList.add('active');

            fullscreen?.setAttribute(
                'aria-hidden',
                'false'
            );
        };

        const closeFullscreen = () => {
            fullscreen?.classList.remove('active');

            fullscreen?.setAttribute(
                'aria-hidden',
                'true'
            );
        };

        imageViewer?.addEventListener(
            'click',
            openFullscreen
        );

        imageViewer?.addEventListener(
            'keydown',
            event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openFullscreen();
                }
            }
        );

        fullscreenClose?.addEventListener(
            'click',
            event => {
                event.stopPropagation();
                closeFullscreen();
            }
        );

        fullscreen?.addEventListener(
            'click',
            event => {
                if (event.target === fullscreen) {
                    closeFullscreen();
                }
            }
        );

        deleteButton?.addEventListener(
            'click',
            event => {
                event.preventDefault();
                event.stopPropagation();

                this.handleDeleteWithPassword(
                    product.id,
                    closeModal
                );
            }
        );

        escapeHandler = event => {
            if (event.key !== 'Escape') return;

            if (
                fullscreen?.classList.contains('active')
            ) {
                closeFullscreen();
                return;
            }

            closeModal();
        };

        document.addEventListener(
            'keydown',
            escapeHandler
        );

        setTimeout(() => {
            closeButton?.focus();
        }, 0);
    },

    // =========================================================
    // DELETE PRODUCT
    // =========================================================
    async handleDeleteWithPassword(
        productId,
        closeModalCallback
    ) {
        if (
            productId === undefined ||
            productId === null
        ) {
            alert(
                '❌ This product does not have a valid server ID.'
            );
            return;
        }

        const confirmed = await this.showDeletePasswordModal();

        if (!confirmed) return;

        try {
            if (!CONFIG?.API_URL) {
                throw new Error(
                    'API_URL is not configured.'
                );
            }

            const response = await fetch(
                `${CONFIG.API_URL}/${encodeURIComponent(productId)}`,
                {
                    method: 'DELETE'
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Server failed to delete post (${response.status})`
                );
            }

            this.cachedFeatured =
                (this.cachedFeatured || [])
                    .filter(
                        product =>
                            String(product.id) !==
                            String(productId)
                    );

            const container =
                document.getElementById(
                    'featured-products-container'
                );

            if (this.cachedFeatured.length > 0) {
                this.renderFeaturedGrid(
                    this.cachedFeatured
                );
            } else if (container) {
                this.renderEmptyState(container);
            }

            closeModalCallback?.();

            setTimeout(() => {
                alert(
                    '✅ Post deleted successfully.'
                );
            }, 250);

        } catch (error) {
            console.error('Delete error:', error);

            alert(
                '❌ Could not delete the post from the server.'
            );
        }
    },

    // =========================================================
    // DELETE PASSWORD MODAL
    // Same visual treatment as the Post page's publish modal —
    // golden glowing ring behind a padlock, a card that rises
    // in, and a shake on wrong password. Built and torn down on
    // demand since it's only needed while deleting a post.
    // Returns a Promise<boolean>: true if the correct password
    // was entered, false if the user cancelled.
    // =========================================================
    showDeletePasswordModal() {
        return new Promise((resolve) => {

            const modalHTML = `
                <div class="password-modal-overlay" id="homeDeletePasswordOverlay">

                    <div class="password-modal-backdrop" id="homeDeletePasswordBackdrop"></div>

                    <div class="password-modal-card" id="homeDeletePasswordCard" role="dialog" aria-modal="true" aria-labelledby="homeDeletePasswordTitle">

                        <div class="password-modal-glow" aria-hidden="true"></div>

                        <div class="password-modal-lock-wrap">
                            <div class="password-modal-lock-ring"></div>
                            <div class="password-modal-lock-icon">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="4" y="11" width="16" height="10" rx="2"></rect>
                                    <path d="M8 11V7a4 4 0 0 1 8 0v4"></path>
                                </svg>
                            </div>
                        </div>

                        <h3 id="homeDeletePasswordTitle" class="password-modal-title">Confirm Delete</h3>

                        <p class="password-modal-subtitle">
                            Enter the admin password to permanently
                            delete this listing. This cannot be undone.
                        </p>

                        <div class="password-modal-field">
                            <input
                                type="password"
                                id="homeDeletePasswordInput"
                                class="password-modal-input"
                                placeholder="Enter password"
                                autocomplete="off"
                                inputmode="numeric"
                            >
                            <button type="button" class="password-toggle-visibility" id="homeDeletePasswordToggle" aria-label="Show password">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                        </div>

                        <p class="password-modal-error" id="homeDeletePasswordError"></p>

                        <div class="password-modal-actions">
                            <button type="button" class="password-modal-cancel" id="homeDeletePasswordCancel">Cancel</button>
                            <button type="button" class="password-modal-confirm password-modal-danger" id="homeDeletePasswordConfirm">
                                Confirm &amp; Delete
                            </button>
                        </div>

                    </div>

                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHTML);

            const overlay = document.getElementById('homeDeletePasswordOverlay');
            const backdrop = document.getElementById('homeDeletePasswordBackdrop');
            const card = document.getElementById('homeDeletePasswordCard');
            const input = document.getElementById('homeDeletePasswordInput');
            const toggleBtn = document.getElementById('homeDeletePasswordToggle');
            const errorEl = document.getElementById('homeDeletePasswordError');
            const cancelBtn = document.getElementById('homeDeletePasswordCancel');
            const confirmBtn = document.getElementById('homeDeletePasswordConfirm');

            let settled = false;

            const cleanup = (result) => {
                if (settled) return;
                settled = true;

                document.removeEventListener('keydown', escHandler);
                overlay.classList.remove('active');

                setTimeout(() => overlay.remove(), 250);

                resolve(result);
            };

            const showError = (message) => {
                errorEl.textContent = message;
                errorEl.classList.toggle('visible', Boolean(message));
            };

            const attemptConfirm = () => {
                const entered = input.value.trim();

                if (entered !== this.adminPassword) {
                    showError('Incorrect password. Please try again.');
                    input.classList.add('input-error');
                    input.value = '';
                    input.focus();

                    card.classList.remove('shake');
                    void card.offsetWidth;
                    card.classList.add('shake');
                    return;
                }

                cleanup(true);
            };

            const escHandler = (e) => {
                if (e.key === 'Escape') cleanup(false);
            };

            backdrop.addEventListener('click', () => cleanup(false));
            cancelBtn.addEventListener('click', () => cleanup(false));
            confirmBtn.addEventListener('click', attemptConfirm);

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    attemptConfirm();
                }
            });

            input.addEventListener('input', () => {
                input.classList.remove('input-error');
                showError('');
            });

            toggleBtn.addEventListener('click', () => {
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
            });

            document.addEventListener('keydown', escHandler);

            // Trigger the entrance animation, then focus
            requestAnimationFrame(() => {
                overlay.classList.add('active');
                setTimeout(() => input.focus(), 200);
            });
        });
    },

    // =========================================================
    // LOADING STATE
    // =========================================================
    renderLoadingState(container) {
        container.innerHTML = `
            <div class="home-empty-state">
                <div class="empty-icon">✦</div>
                <h3>Loading collection</h3>
                <p>
                    Preparing the latest SANA pieces...
                </p>
            </div>
        `;
    },

    // =========================================================
    // EMPTY STATE
    // =========================================================
    renderEmptyState(container) {
        container.innerHTML = `
            <div class="home-empty-state">
                <div class="empty-icon">✦</div>
                <h3>No Products Yet</h3>
                <p>
                    New boutique pieces will appear here.
                </p>
            </div>
        `;
    },

    // =========================================================
    // ERROR STATE
    // =========================================================
    renderErrorState(container) {
        container.innerHTML = `
            <div class="home-error-state">
                <div class="home-error-icon">⚠️</div>
                <h3>Unable to Load Products</h3>
                <p>
                    Please check your connection and try again.
                </p>
            </div>
        `;
    },

    // =========================================================
    // ESCAPE HTML
    // =========================================================
    escapeHTML(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    // =========================================================
    // ESCAPE ATTRIBUTE
    // =========================================================
    escapeAttribute(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
};


// =============================================================
// GLOBAL ACCESS
// =============================================================
window.HomePage = HomePage;
