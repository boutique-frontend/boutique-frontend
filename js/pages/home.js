const HomePage = {
    sampleItems: [
        { 
            id: 1, 
            title: "SAnA Silk Dress", 
            price: "45.00", 
            image: "https://picsum.photos/400/500?random=1" 
        },
        { 
            id: 2, 
            title: "Classic Denim Jacket", 
            price: "60.00", 
            image: "https://picsum.photos/400/500?random=2" 
        }
    ],
    
    render() {
        const items = this.sampleItems.map(item => PostCardComponent.render(item)).join('');
        return `<div class="product-grid">${items}</div>`;
    }
};
