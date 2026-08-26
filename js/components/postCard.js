const PostComponent = {
    render() {
        return `
            <div style="padding: 20px; overflow-y: auto; height: 100%; padding-bottom: 80px;">
                <h2 style="text-align: center; margin-bottom: 20px; font-size: 1.4rem; font-weight: bold;">Post New Item</h2>
                
                <!-- This is the fix! It prevents the page reload and triggers the alert -->
                <form onsubmit="event.preventDefault(); alert('Backend not connected yet!');">
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 6px; color: #888888; font-size: 0.85rem; font-weight: 600;">Item Name</label>
                        <input type="text" placeholder="e.g. Printed Lawn 3PC" required style="width: 100%; padding: 12px; border-radius: 8px; border: none; font-size: 1rem; color: #000000;">
                    </div>
                    
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 6px; color: #888888; font-size: 0.85rem; font-weight: 600;">Category</label>
                        <select required style="width: 100%; padding: 12px; border-radius: 8px; border: none; font-size: 1rem; color: #000000; background: #ffffff;">
                            <option>Unstitched</option>
                            <option>Ready-to-wear</option>
                            <option>Accessories</option>
                        </select>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 6px; color: #888888; font-size: 0.85rem; font-weight: 600;">Price (Rs.)</label>
                        <input type="number" placeholder="e.g. 3500" required style="width: 100%; padding: 12px; border-radius: 8px; border: none; font-size: 1rem; color: #000000;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 6px; color: #888888; font-size: 0.85rem; font-weight: 600;">Available Sizes</label>
                        <input type="text" placeholder="e.g. S, M, L or Free Size" required style="width: 100%; padding: 12px; border-radius: 8px; border: none; font-size: 1rem; color: #000000;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 6px; color: #888888; font-size: 0.85rem; font-weight: 600;">Description</label>
                        <textarea rows="3" placeholder="Fabric detail, embroidery notes, care info..." required style="width: 100%; padding: 12px; border-radius: 8px; border: none; font-size: 1rem; color: #000000;"></textarea>
                    </div>

                    <div style="margin-bottom: 25px;">
                        <label style="display: block; margin-bottom: 6px; color: #888888; font-size: 0.85rem; font-weight: 600;">Product Image</label>
                        <input type="file" required style="width: 100%; padding: 12px; background: #ffffff; color: #000000; border-radius: 8px; border: none; font-size: 1rem;">
                    </div>

                    <button type="submit" style="width: 100%; padding: 15px; background-color: #25D366; color: #ffffff; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 800; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3); cursor: pointer; margin-bottom: 20px;">Post Item</button>
                </form>
            </div>
        `;
    }
};
