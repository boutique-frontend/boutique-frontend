import { CONFIG } from '../../config.js';
import { HomePage } from '../home/home.js';
import { App } from '../../app.js';

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

    async handleSubmit(e) {
        e.preventDefault();

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
                e.target.reset();
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
