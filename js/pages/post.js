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

                    <button type="submit" class="submit-btn">Publish to SAnA</button>
                </form>
            </div>
        `;
    },

    handleSubmit(e) {
        e.preventDefault();
        alert("Backend not connected yet!");
        e.target.reset();
        App.navigate('home');
    }
};
