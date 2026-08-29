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
            aria-label="Product details"
        >

            <!-- BACKDROP -->
            <div
                class="product-modal-backdrop"
                id="productModalBackdrop"
            ></div>


            <!-- PRODUCT VIEWER -->
            <div class="product-modal-panel">


                <!-- CLOSE -->
                <button
                    id="closeHomeModalBtn"
                    class="product-modal-close"
                    type="button"
                    aria-label="Close product viewer"
                >
                    <span>×</span>
                </button>


                <!-- IMAGE -->
                <div
                    class="product-modal-image-section"
                    id="productImageViewer"
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

                    <!-- IMAGE GRADIENT -->
                    <div class="product-modal-image-gradient"></div>


                    <!-- TOP LABEL -->
                    <div class="product-view-label">
                        <span class="product-view-icon">⌕</span>
                        <span>PRODUCT VIEW</span>
                    </div>


                    <!-- TAP IMAGE -->
                    <div class="tap-image-hint">
                        TAP IMAGE TO VIEW
                    </div>

                </div>


                <!-- PRODUCT INFORMATION -->
                <div class="product-modal-content">


                    <!-- BRAND -->
                    <div class="product-modal-label">
                        <span class="label-line"></span>
                        SANA BOUTIQUE
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
                        href="https://wa.me/${phone}?text=${waMessage}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="whatsapp-order-btn"
                    >

                        <span class="whatsapp-icon">
                            ☏
                        </span>

                        <span>
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
                            ♲
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


            <!-- FULLSCREEN IMAGE VIEW -->
            <div
                id="fullscreenProductImage"
                class="fullscreen-product-image"
                aria-hidden="true"
            >

                <button
                    id="closeFullscreenImage"
                    class="fullscreen-image-close"
                    type="button"
                    aria-label="Close image"
                >
                    ×
                </button>

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
        modalHtml
    );


    document.body.classList.add('modal-open');


    const modal =
        document.getElementById(
            'home-product-modal'
        );


    const closeModal = () => {

        modal?.classList.add('closing');

        setTimeout(() => {

            modal?.remove();

            document.body.classList.remove(
                'modal-open'
            );

        }, 220);
    };


    const closeBtn =
        document.getElementById(
            'closeHomeModalBtn'
        );


    const backdrop =
        document.getElementById(
            'productModalBackdrop'
        );


    const deleteBtn =
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


    /* CLOSE PRODUCT VIEW */
    closeBtn?.addEventListener(
        'click',
        closeModal
    );


    backdrop?.addEventListener(
        'click',
        closeModal
    );


    /* OPEN FULLSCREEN IMAGE */
    imageViewer?.addEventListener(
        'click',
        event => {

            if (
                event.target.closest(
                    '.product-modal-close'
                )
            ) {
                return;
            }

            fullscreen?.classList.add('active');

            fullscreen?.setAttribute(
                'aria-hidden',
                'false'
            );

        }
    );


    /* CLOSE FULLSCREEN IMAGE */
    fullscreenClose?.addEventListener(
        'click',
        () => {

            fullscreen?.classList.remove(
                'active'
            );

            fullscreen?.setAttribute(
                'aria-hidden',
                'true'
            );

        }
    );


    /* CLICK DARK AREA TO CLOSE IMAGE */
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


    /* DELETE */
    deleteBtn?.addEventListener(
        'click',
        () => {

            this.handleDeleteWithPassword(
                product.id,
                closeModal
            );

        }
    );


    /* ESC KEY */
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


async handleDeleteWithPassword(
    productId,
    closeModalCallback
) {

    /*
     * ADMIN PASSWORD
     * ----------------
     * Current password: 5090
     */
    const inputPassword =
        prompt(
            'Enter Admin Password to delete this post:'
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


    const confirmed =
        confirm(
            '⚠️ Delete this post permanently?\n\nThis action cannot be undone.'
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


        /*
         * Remove from local feed
         */
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
