export const ImageViewerComponent = {
    open(imageSrc) {
        let modal = document.getElementById('image-viewer-modal');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'image-viewer-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0; 
                left: 0; 
                width: 100vw; 
                height: 100vh;
                background: rgba(6, 8, 12, 0.95);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                display: flex; 
                align-items: center; 
                justify-content: center;
                z-index: 99999; 
                cursor: pointer;
            `;
            modal.onclick = () => {
                modal.style.display = 'none';
            };
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <span style="position: absolute; top: 20px; right: 25px; color: #d4af37; font-size: 28px; font-weight: 300;">✕</span>
            <img src="${imageSrc}" style="max-width: 90%; max-height: 85vh; object-fit: contain; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.3); box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
        `;
        modal.style.display = 'flex';
    }
};

// Bind to window object for inline HTML onclick accessibility
window.ImageViewerComponent = ImageViewerComponent;
