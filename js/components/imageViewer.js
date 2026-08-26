const ImageViewerComponent = {
    open(imageSrc) {
        let modal = document.getElementById('image-viewer-modal');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'image-viewer-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0,0,0,0.95);
                display: flex; align-items: center; justify-content: center;
                z-index: 9999; cursor: pointer;
            `;
            modal.onclick = () => modal.style.display = 'none';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <span style="position: absolute; top: 20px; right: 25px; color: white; font-size: 30px;">✕</span>
            <img src="${imageSrc}" style="max-width: 95%; max-height: 90vh; object-fit: contain; border-radius: 8px;">
        `;
        modal.style.display = 'flex';
    }
};
