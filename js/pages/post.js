const PostPage = {
    render() {
        return `
            <div class="form-container">
                <div class="form-header">
                    <h2>Post New Item</h2>
                </div>
                <form id="createPostForm" onsubmit="PostPage.handleSubmit(event)">
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

                    <div class="form-group">
                        <label>Available Sizes</label>
                        <input type="text" id="postSizes" placeholder="e.g. S, M, L or Free Size">
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="postDescription" rows="3" placeholder="Fabric detail, embroidery notes, care info..."></textarea>
                    </div>

                    <div class="form-group">
                        <label>Product Image</label>
                        <input type="file" id="postImage" accept="image/*" required>
                    </div>

                    <button type="submit" id="submitBtn" class="submit-btn">Publish to SAnA</button>
                </form>
            </div>
        `;
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
