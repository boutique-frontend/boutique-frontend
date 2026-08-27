export const HomePage = {
    async render() {
        try {
            const response = await fetch('./pages/home/home.html');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.text();
        } catch (error) {
            console.error("Home render error:", error);
            return `<div style="padding: 80px 20px; text-align: center; color: #ffffff;">
                <h3>Error loading Home page</h3>
                <p style="color: #8c9ba5; font-size: 0.85rem; margin-top: 8px;">${error.message}</p>
            </div>`;
        }
    },

    init() {
        // Handle Wishlist toggles
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                btn.classList.toggle('active');
                btn.innerHTML = btn.classList.contains('active') ? '&#9829;' : '&#9825;';
                btn.style.color = btn.classList.contains('active') ? '#e53e3e' : '#ffffff';
            });
        });
    }
};

window.HomePage = HomePage;
