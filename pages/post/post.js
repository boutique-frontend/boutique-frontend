import { CONFIG } from '../../config.js';
import { HomePage } from '../home/home.js';
import { App } from '../../app.js';

// Same admin password used elsewhere on the site (see
// home.js's CONFIG.adminPassword). Kept as a single constant
// here so it's easy to find/update if it ever changes.
const ADMIN_PASSWORD = '5090';

export const PostPage = {
    selectedSizes: [],

    async render() {
        this.selectedSizes = [];
        try {
            const response = await fetch('./pages/post/post.html');
            return await response.text();
        } catch (error) {
            console.error("Error loading post template:", error);
            return `<div class="form-container"><p style="color:#f87171;">Failed to load submission form.</p></div>`;
        }
    },

    init() {
        const fileInput = document.getElementById('postImage');
        const uploadArea = document.getElementById('uploadArea');

        // Trigger hidden file input click when clicking upload area
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', (e) => {
                if (e.target.id !== 'removeImgBtn') {
                    fileInput.click();
                }
            });
            fileInput.addEventListener('change', (e) => this.handleImageSelect(e));
        }

        const removeBtn = document.getElementById('removeImgBtn');
        if (removeBtn) {
            removeBtn.addEventListener('click', (e) => this.removeImage(e));
        }

        const sizeChips = document.querySelectorAll('.size-chip');
        sizeChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                e.preventDefault();
                const size = chip.getAttribute('data-size');
                this.toggleSize(size, chip);
            });
        });

        const form = document.getElementById('postForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        this.bindPasswordModal();
    },

    handleImageSelect(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewImg = document.getElementById('imagePreview');
                const placeholder = document.getElementById('uploadPlaceholder');
                const previewContainer = document.getElementById('previewContainer');

                if (previewImg && placeholder && previewContainer) {
                    previewImg.src = e.target.result;
                    placeholder.style.display = 'none';
                    previewContainer.style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        }
    },

    removeImage(e) {
        if (e) e.stopPropagation();
        const fileInput = document.getElementById('postImage');
        const placeholder = document.getElementById('uploadPlaceholder');
        const previewContainer = document.getElementById('previewContainer');
        const previewImg = document.getElementById('imagePreview');

        if (fileInput) fileInput.value = '';
        if (previewImg) previewImg.src = '';
        if (placeholder) placeholder.style.display = 'flex';
        if (previewContainer) previewContainer.style.display = 'none';
    },

    toggleSize(size, el) {
        if (this.selectedSizes.includes(size)) {
            this.selectedSizes = this.selectedSizes.filter(s => s !== size);
            el.classList.remove('selected');
        } else {
            this.selectedSizes.push(size);
            el.classList.add('selected');
        }
        const sizesInput = document.getElementById('postSizes');
        if (sizesInput) {
            sizesInput.value = this.selectedSizes.join(', ');
        }
    },

    /* =====================================================
       FORM SUBMIT
       No longer publishes directly — validates the image is
       present, then opens the password modal. The real
       network call lives in performPublish(), which only
       runs after the password is confirmed correct.
       ===================================================== */

    handleSubmit(e) {
        e.preventDefault();

        const imageFile = document.getElementById('postImage').files[0];

        if (!imageFile) {
            alert("Please select a product image before publishing.");
            return;
        }

        this.openPasswordModal();
    },

    /* =====================================================
       PASSWORD MODAL
       ===================================================== */

    bindPasswordModal() {
        const overlay = document.getElementById('passwordModalOverlay');
        const backdrop = document.getElementById('passwordModalBackdrop');
        const cancelBtn = document.getElementById('passwordModalCancel');
        const confirmBtn = document.getElementById('passwordModalConfirm');
        const input = document.getElementById('postAdminPassword');
        const toggleBtn = document.getElementById('togglePasswordVisibility');

        if (!overlay) return;

        if (backdrop) {
            backdrop.addEventListener('click', () => this.closePasswordModal());
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closePasswordModal());
        }

        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => this.confirmPassword());
        }

        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.confirmPassword();
                }
            });

            // Clear the error state as soon as they start typing again
            input.addEventListener('input', () => {
                input.classList.remove('input-error');
                this.setPasswordError('');
            });
        }

        if (toggleBtn && input) {
            toggleBtn.addEventListener('click', () => {
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
            });
        }

        // Escape key closes the modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                this.closePasswordModal();
            }
        });
    },

    openPasswordModal() {
        const overlay = document.getElementById('passwordModalOverlay');
        const input = document.getElementById('postAdminPassword');

        if (!overlay) return;

        overlay.classList.add('active');
        this.setPasswordError('');

        if (input) {
            input.value = '';
            input.classList.remove('input-error');
            // Give the entrance animation a moment before focusing,
            // otherwise mobile keyboards can pop up mid-animation
            setTimeout(() => input.focus(), 200);
        }
    },

    closePasswordModal() {
        const overlay = document.getElementById('passwordModalOverlay');
        if (overlay) overlay.classList.remove('active');
    },

    setPasswordError(message) {
        const errorEl = document.getElementById('passwordModalError');
        if (!errorEl) return;

        errorEl.textContent = message;
        errorEl.classList.toggle('visible', Boolean(message));
    },

    confirmPassword() {
        const input = document.getElementById('postAdminPassword');
        const card = document.getElementById('passwordModalCard');
        const confirmBtn = document.getElementById('passwordModalConfirm');

        const entered = input ? input.value.trim() : '';

        if (entered !== ADMIN_PASSWORD) {
            this.setPasswordError('Incorrect password. Please try again.');

            if (input) {
                input.classList.add('input-error');
                input.value = '';
                input.focus();
            }

            if (card) {
                card.classList.remove('shake');
                // Force reflow so the shake animation can replay
                // even if it's already been triggered once
                void card.offsetWidth;
                card.classList.add('shake');
            }

            return;
        }

        // Correct password — lock the button, close the modal,
        // and hand off to the real publish logic
        if (confirmBtn) confirmBtn.disabled = true;

        this.closePasswordModal();

        if (confirmBtn) confirmBtn.disabled = false;

        this.performPublish();
    },

    /* =====================================================
       ACTUAL PUBLISH — only reached after password confirm
       ===================================================== */

    async performPublish() {
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Publishing to SAnA...";
        }

        const imageFile = document.getElementById('postImage').files[0];

        if (!imageFile) {
            alert("Please select a product image before publishing.");
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Publish to SAnA";
            }
            return;
        }

        // Create Multi-part FormData for Flask backend
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('title', document.getElementById('postTitle').value);
        formData.append('category', document.getElementById('postCategory').value);
        formData.append('price', document.getElementById('postPrice').value);
        formData.append('sizes', document.getElementById('postSizes').value || '');
        formData.append('description', document.getElementById('postDescription').value || '');

        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                body: formData
            });

            if (response.ok || response.status === 201) {
                alert("Product published successfully to SAnA Boutique!");

                const form = document.getElementById('postForm');
                if (form) form.reset();
                this.removeImage();

                if (typeof HomePage !== 'undefined' && HomePage) {
                    HomePage.cachedFeatured = null;
                }

                if (typeof App !== 'undefined' && App.navigate) {
                    App.navigate('home');
                } else {
                    window.location.hash = '#home';
                }
            } else {
                const errData = await response.json();
                alert("Publish failed: " + (errData.error || errData.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error publishing post:", error);
            alert("Network error: Could not reach the backend server.");
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Publish to SAnA";
            }
        }
    }
};

window.PostPage = PostPage;
