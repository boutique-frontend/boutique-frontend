const CONFIG = {
    ADMIN_PASSCODE: "1234", // Change this to your actual secret passcode
    API_URL: "https://boutique-backend-6fcr.onrender.com/api/posts"
};

const App = {
    init() {
        document.getElementById('navbar-container').innerHTML = NavbarComponent.render();
        this.navigate('home');
    },

    navigate(page) {
        const container = document.getElementById('app-content');
        if (page === 'home') {
            container.innerHTML = HomePage.render();
            // We'll define loadPosts() in your pages file next
            if (HomePage.loadPosts) HomePage.loadPosts(); 
        }
        else if (page === 'contact') container.innerHTML = ContactPage.render();
        else if (page === 'profile') container.innerHTML = ProfilePage.render();
        else if (page === 'post') container.innerHTML = PostPage.render();
    },

    handleCreatePost() {
        const pass = prompt("Enter SAnA Admin Passcode:");
        if (pass === CONFIG.ADMIN_PASSCODE) {
            this.navigate('post');
        } else if (pass !== null) {
            alert("Incorrect passcode!");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
