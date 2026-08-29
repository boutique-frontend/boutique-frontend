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

        const shopNowBtn =
            document.getElementById('heroShopNowBtn');

        if (shopNowBtn) {
            shopNowBtn.addEventListener('click', () => {
                window.location.hash = '#shop';
            });
        }

        const exploreBtn =
            document.getElementById('heroExploreBtn');

        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                window.location.hash = '#shop';
            });
        }

        const collectionCards =
            document.querySelectorAll('.collection-card');

        collectionCards.forEach(card => {

            card.addEventListener('click', () => {

                const category =
                    card.getAttribute('data-cat') || 'all';

                window.location.hash =
                    `#shop?category=${encodeURIComponent(category)}`;
            });

        });
    },

    // =========================================================
    // LOAD PRODUCTS
    // =========================================================
    async loadFeaturedProducts(forceRefresh = false) {

        const container =
            document.getElementById(
                'featured-products-container'
            );

        if (!container) return;

        if (this.cachedFeatured && !forceRefresh) {
            this.renderFeaturedGrid(
                this.cachedFeatured
            );
            return;
        }

        try {

            const response =
                await fetch(CONFIG.API_URL);

            if (!response.ok) {
                throw new Error(
                    `API request failed: ${response.status}`
                );
            }

            const posts =
                await response.json();

            if (
                Array.isArray(posts) &&
                posts.length > 0
            ) {

                this.cachedFeatured = posts;

                this.renderFeaturedGrid(posts);

            } else {

                this.cachedFeatured = [];

                this.renderEmptyState(container);
            }

        } catch (error) {

            console.error(
                'Error fetching products:',
                error
            );

            this.renderErrorState(container);
        }
    },

    // =========================================================
    // RENDER PRODUCT FEED
    // =========================================================
    renderFeaturedGrid(posts) {

        const container =
            document.getElementById(
                'featured-products-container'
            );

        if (!container) return;

        container.classList.add(
            'featured-products-feed'
        );

        // Remove old inline scrolling styles
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

        container.innerHTML =
            posts.map((item, index) => {

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
                    rawPrice
                        .toLowerCase()
                        .includes('rs')
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

    // =========================================================
    // PRODUCT CARD CLICK
    // =========================================================
    bindCardClicks(posts) {

        const cards =
            document.querySelectorAll(
                '.tiktok-feed-card'
            );

        cards.forEach(card => {

            card.addEventListener(
                'click',
                event => {

                    if (
                        event.target.closest(
                            '.wishlist-btn'
                        )
                    ) {
                        return;
                    }

                    const id =
                        card.getAttribute('data-id');

                    const product =
                        posts.find(
                            item =>
                                String(item.id) ===
                                String(id)
                        );

                    if (product) {
                        this.openProductModal(product);
                    }

                }
            );

        });
    },

    // =========================================================
    // WISHLIST
    // =========================================================
    bindWishlistBtns() {

        const buttons =
            document.querySelectorAll(
                '.wishlist-btn'
            );

        buttons.forEach(button => {

            button.addEventListener(
                'click',
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    button.classList.toggle('active');

                    if (
                        button.classList.contains(
                            'active'
                        )
                    ) {

                        button.innerHTML = '♥';

                        button.setAttribute(
                            'aria-label',
                            'Remove from wishlist'
                        );

                    } else {

                        button.innerHTML = '♡';

                        button.setAttribute(
                            'aria-label',
                            'Add to wishlist'
                        );
                    }

                }
            );

        });
    },

    // =========================================================
    // OPEN PRODUCT MODAL
    // =========================================================
    openProductModal(product) {

        const existingModal =
            document.getElementById(
                'home-product-modal'
            );

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
                ? String(product.price)
                : '2,850';

        const price =
            rawPrice
                .toLowerCase()
                .includes('rs')
                ? rawPrice
                : `Rs. ${rawPrice}`;

        const description =
            product.description ||
            'Exclusive boutique collection item.';

        const phone =
            CONFIG.WHATSAPP_NUMBER ||
            '923001234567';

        const waMessage =
            encodeURIComponent(
                `Hi SAnA Boutique! I want to order: ${title} (${price})`
            );

        // =====================================================
        // MODAL HTML
        // =====================================================
        const modalHTML = `

            <div
                id="home-product-modal"
                class="product-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Product details"
            >

                <!-- BACKDROP -->
                <div
                    id="productModalBackdrop"
                    class="product-modal-backdrop"
                ></div>


                <!-- PRODUCT PANEL -->
                <div class="product-modal-panel">


                    <!-- CLOSE BUTTON -->
                    <button
                        id="closeHomeModalBtn"
                        class="product-modal-close"
                        type="button"
                        aria-label="Close product viewer"
                    >
                        <span>×</span>
                    </button>


                    <!-- IMAGE AREA -->
                    <div
                        id="productImageViewer"
                        class="product-modal-image-section"
                    >

                        <img
                            class="product-modal-image"
                            src="${this.escapeAttribute(imgSrc)}"
                            alt="${this.escapeHTML(title)}"
                            onerror="
                                this.onerror=null;
                                this.src='${fallbackImg}';
                            "
                        >

                        <div
                            class="product-modal-image-gradient"
                        ></div>


                        <!-- PRODUCT VIEW BADGE -->
                        <div class="product-view-label">

                            <span class="product-view-icon">
                                ⌕
                            </span>

                            <span>
                                PRODUCT VIEW
                            </span>

                        </div>


                        <!-- IMAGE HINT -->
                        <div class="tap-image-hint">
                            TAP IMAGE TO VIEW FULLSCREEN
                        </div>

                    </div>


                    <!-- PRODUCT CONTENT -->
                    <div class="product-modal-content">


                        <!-- BRAND -->
                        <div class="product-modal-label">

                            <span class="label-line"></span>

                            <span>
                                SANA BOUTIQUE
                            </span>

                            <span class="label-line"></span>

                        </div>


                        <!-- TITLE -->
                        <h2 class="product-modal-title">
                            ${this.escapeHTML(title)}
                        </h2>


                        <!-- PRICE -->
                        <div class="product-modal-price">
                            ${this.escapeHTML(price)}
                        </div>


                        <!-- DIVIDER -->
                        <div class="product-modal-divider"></div>


                        <!-- DESCRIPTION -->
                        <p class="product-modal-description">
                            ${this.escapeHTML(description)}
                        </p>


                        <!-- WHATSAPP -->
                        <a
                            class="whatsapp-order-btn"
                            href="https://wa.me/${this.escapeAttribute(phone)}?text=${waMessage}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >

                            <span class="whatsapp-icon">
                                ☏
                            </span>

                            <span class="whatsapp-button-text">
                                ORDER ON WHATSAPP
                            </span>

                            <span class="button-arrow">
                                →
                            </span>

                        </a>


                        <!-- DELETE -->
                        <button
                            id="deletePostBtn"
                            class="delete-post-btn"
                            type="button"
                        >

                            <span class="delete-icon">
                                🗑
                            </span>

                            <span class="delete-text">
                                DELETE POST
                            </span>

                            <span class="delete-arrow">
                                →
                            </span>

                        </button>


                        <!-- FOOTER -->
                        <div class="product-modal-footer">
                            SANA • PREMIUM COLLECTION
                        </div>

                    </div>

                </div>


                <!-- FULLSCREEN IMAGE VIEWER -->
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
                        alt="${this.escapeHTML(title)}"
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

        document.body.classList.add(
            'modal-open'
        );

        const modal =
            document.getElementById(
                'home-product-modal'
            );

        const closeButton =
            document.getElementById(
                'closeHomeModalBtn'
            );

        const backdrop =
            document.getElementById(
                'productModalBackdrop'
            );

        const deleteButton =
            document.getElementById(
                'deletePostBtn'
            );

        const imageViewer =
            document.getElementById(
                'productImageViewer'
            );

        const fullscreen =
            document.getElementById(
                'fullscreenProductImage'
            );

        const fullscreenClose =
            document.getElementById(
                'closeFullscreenImage'
            );


        // =====================================================
        // CLOSE PRODUCT MODAL
        // =====================================================
        let isClosing = false;

        const closeModal = () => {

            if (isClosing) return;

            isClosing = true;

            modal?.classList.add(
                'closing'
            );

            setTimeout(() => {

                modal?.remove();

                document.body.classList.remove(
                    'modal-open'
                );

            }, 220);
        };


        // =====================================================
        // CLOSE BUTTON
        // =====================================================
        closeButton?.addEventListener(
            'click',
            event => {

                event.stopPropagation();

                closeModal();

            }
        );


        // =====================================================
        // BACKDROP
        // =====================================================
        backdrop?.addEventListener(
            'click',
            closeModal
        );


        // =====================================================
        // FULLSCREEN IMAGE
        // =====================================================
        imageViewer?.addEventListener(
            'click',
            event => {

                if (
                    event.target.closest(
                        '#closeHomeModalBtn'
                    )
                ) {
                    return;
                }

                fullscreen?.classList.add(
                    'active'
                );

                fullscreen?.setAttribute(
                    'aria-hidden',
                    'false'
                );

            }
        );


        // =====================================================
        // CLOSE FULLSCREEN
        // =====================================================
        fullscreenClose?.addEventListener(
            'click',
            event => {

                event.stopPropagation();

                fullscreen?.classList.remove(
                    'active'
                );

                fullscreen?.setAttribute(
                    'aria-hidden',
                    'true'
                );

            }
        );


        // =====================================================
        // CLICK OUTSIDE FULLSCREEN IMAGE
        // =====================================================
        fullscreen?.addEventListener(
            'click',
            event => {

                if (
                    event.target === fullscreen
                ) {

                    fullscreen.classList.remove(
                        'active'
                    );

                    fullscreen.setAttribute(
                        'aria-hidden',
                        'true'
                    );
                }

            }
        );


        // =====================================================
        // DELETE BUTTON
        // =====================================================
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


        // =====================================================
        // ESC KEY
        // =====================================================
        const escapeHandler = event => {

            if (event.key !== 'Escape') {
                return;
            }

            if (
                fullscreen?.classList.contains(
                    'active'
                )
            ) {

                fullscreen.classList.remove(
                    'active'
                );

                fullscreen.setAttribute(
                    'aria-hidden',
                    'true'
                );

                return;
            }

            closeModal();

            document.removeEventListener(
                'keydown',
                escapeHandler
            );
        };

        document.addEventListener(
            'keydown',
            escapeHandler
        );
    },

    // =========================================================
    // DELETE PRODUCT
    // =========================================================
    async handleDeleteWithPassword(
        productId,
        closeModalCallback
    ) {

        // =====================================================
        // PASSWORD
        // =====================================================
        const inputPassword =
            prompt(
                '🔐 Enter Admin Password:'
            );

        if (inputPassword === null) {
            return;
        }

        if (
            inputPassword.trim() !==
            this.adminPassword
        ) {

            alert(
                '❌ Incorrect password.\n\nAccess denied.'
            );

            return;
        }


        // =====================================================
        // CONFIRM
        // =====================================================
        const confirmed =
            confirm(
                '⚠️ DELETE THIS POST?\n\nThis action cannot be undone.'
            );

        if (!confirmed) {
            return;
        }


        try {

            // =================================================
            // DELETE FROM SERVER
            // =================================================
            if (CONFIG?.API_URL) {

                const response =
                    await fetch(
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
            }


            // =================================================
            // DELETE FROM LOCAL FEED
            // =================================================
            this.cachedFeatured =
                (this.cachedFeatured || [])
                    .filter(
                        product =>
                            String(product.id) !==
                            String(productId)
                    );


            // =================================================
            // REFRESH FEED
            // =================================================
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


            // =================================================
            // CLOSE MODAL
            // =================================================
            closeModalCallback?.();


            // =================================================
            // SUCCESS
            // =================================================
            setTimeout(() => {

                alert(
                    '✅ Post deleted successfully.'
                );

            }, 250);

        } catch (error) {

            console.error(
                'Delete error:',
                error
            );

            alert(
                '❌ Could not delete the post from the server.'
            );
        }
    },

    // =========================================================
    // EMPTY STATE
    // =========================================================
    renderEmptyState(container) {

        container.innerHTML = `

            <div class="home-empty-state">

                <div class="empty-icon">
                    ✦
                </div>

                <h3>
                    No Products Yet
                </h3>

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

                <div class="home-error-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Products
                </h3>

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
// GLOBAL
// =============================================================
window.HomePage = HomePage;
