const PostPage = {
    selectedSizes: [],

    render() {
        this.selectedSizes = [];
        return `
            <div class="form-container">
                <div class="form-header">
                    <h2>New Listing</h2>
                    <p>Add an outfit to SAnA Boutique catalog</p>
                </div>

                <form id="createPostForm" onsubmit="PostPage.handleSubmit(event)">
                    
                    <!-- Live Image Upload & Preview Container -->
                    <div class="form-group">
                        <label>Product Image</label>
                        <div class="upload-area" id="uploadArea" onclick="document.getElementById('postImage').click()">
                            <input type="file" id="postImage" accept="image/*" required onchange="PostPage.handleImageSelect(event)">
                            
                            <div class="upload-placeholder" id="uploadPlaceholder">
                                <span class="upload-icon">📷</span>
                                <span class="upload-text">Tap to select photo</span>
                                <span class="upload-subtext">JPG, PNG, WEBP supported</span>
                            </div>

                            <div class="preview-container" id="previewContainer">
                                <img id="imagePreview" src="" alt="Preview">
                                <button type="button" class="remove-img-btn" onclick="PostPage.removeImage(event)">✕</button>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Item Name</label>
                        <input type="text" id="postTitle" placeholder="e.g. Printed Lawn 3PC" required>
                    </div>

                    <div class="form-group">
                        <label>Category</label>
                        <select id="postCategory" required>
                            <option value="Unstitched">Unstitched</option>
                            <option value="Ready-to-Wear">Ready-to-Wear</option>
                            <option value="Abayas & Hijabs">Abayas & Hijabs</option>
                            <option value="Shawls & Scarves">Shawls & Scarves</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Price (${CONFIG.CURRENCY_SYMBOL})</label>
                        <input type="number" id="postPrice" placeholder="e.g. 3500" required>
                    </div>

                    <!-- Size Chip Selector -->
                    <div class="form-group">
                        <label>Available Sizes</label>
                        <div class="size-chips-wrapper">
                            <button type="button" class="size-chip" onclick="PostPage.toggleSize('XS', this)">XS</button>
                            <button type="button" class="size-chip" onclick="PostPage.toggleSize('S', this)">S</button>
                            <button type="button" class="size-chip" onclick="PostPage.toggleSize('M', this)">M</button>
                            <button type="button" class="size-chip" onclick="PostPage.toggleSize('L', this)">L</button>
                            <button type="button" class="size-chip" onclick="PostPage.toggleSize('XL', this)">XL</button>
                            <button type="button" class="size-chip" onclick="PostPage.toggleSize('Free Size', this)">Free Size</button>
                        </div>
                        <input type="hidden" id="postSizes">
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="postDescription" rows="3" placeholder="Fabric details, embroidery notes, care info..."></textarea>
                    </div>

                    <button type="submit" id="submitBtn" class="submit-btn">Publish to SAnA</button>
                </form>
            </div>
        `;
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
        e.stopPropagation();
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
            submitBtn.innerText = "Publishing...";
        }

        const formData = new FormData();
        formData.append('title', document.getElementById('postTitle').value);
        formData.append('category', document.getElementById('postCategory').value);
        formData.append('price', document.getElementById('postPrice').value);
        formData.append('sizes', document.getElementById('postSizes').value || '');
        formData.append('description', document.getElementById('postDescription').value || '');
        
        const imageFile = document.getElementById('postImage').files[0];
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert("Product published successfully!");
                e.target.reset();

                // Clear memory cache to trigger automatic refresh on Home feed
                if (typeof HomePage !== 'undefined') {
                    HomePage.cachedPosts = null;
                }

                App.navigate('home');
            } else {
                const errData = await response.json();
                alert("Publish failed: " + (errData.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Error publishing post:", error);
            alert("Network error: Could not reach the server.");
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Publish to SAnA";
            }
        }
    }
};
