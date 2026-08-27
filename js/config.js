export const CONFIG = {
    APP_NAME: "SAnA Boutique",
    CURRENCY_SYMBOL: "Rs.",
    
    // Live Backend API
    API_URL: "https://boutique-backend-6fcr.onrender.com/api/posts",
    ADMIN_PASSCODE: "1234",
    
    // Profile Asset
    PROFILE_IMAGE: "assets/logo.jpg", 
    
    // Contact Details
    EMAIL: "contact@sanaboutique.com",
    WHATSAPP_NUMBER: "923100559630", // Cleaned formatting for reliable wa.me API links
    PHONE_NUMBER: "+92 310 0559630",
    TIKTOK_USERNAME: "Sana chubby example",
    
    // Location & Maps
    LOCATION_NAME: "Main Market, Lahore, Pakistan",
    MAPS_REDIRECT_URL: "https://maps.google.com/?q=Main+Market+Lahore+Pakistan",
    MAPS_EMBED_URL: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.5245849886915!2d74.3436!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904f86f671b4b%3A0xb36b281f62d141e4!2sGulberg%20Main%20Market!5e0!3m2!1sen!2s!4v1700000000000"
};

// Expose to window object for legacy scripts/inline handlers
window.CONFIG = CONFIG;
