const PostPage = {
    render() {
        return `
            <div class="form-container">
                <h2>New Post - SAnA</h2>
                <form id="createPostForm" onsubmit="PostPage.handleSubmit(event)">
                    <div class="form-group">
                        <label>Item Name</label>
                        <input type="text" id="postTitle" required>
                    </div>
                    <div class="form-group">
                        <label>Price ($)</label>
                        <input type="number" id="postPrice" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label>Photo</label>
                        <input type="file" id="postImage" accept="image/*" required>
                    </div>
                    <button type="submit" class="submit-btn">Publish to SAnA</button>
                </form>
            </div>
        `;
    },

    handleSubmit(e) {
        e.preventDefault();
        alert("Published! (Will link to backend API next)");
        App.navigate('home');
    }
};
