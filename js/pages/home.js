const HomePage = {
    sampleItems: [
        { 
            id: 1, 
            title: "Lawn 3-Piece Suit", 
            price: "4500", 
            category: "Unstitched",
            description: "Printed lawn shirt with embroidered neckline and chiffon dupatta.",
            sizes: "Unstitched",
            image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80" 
        },
        { 
            id: 2, 
            title: "Velvet Kurti", 
            price: "3200", 
            category: "Ready-to-Wear",
            description: "Premium black velvet kurti with gold zari detailing.",
            sizes: "S, M, L",
            image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80" 
        }
    ],
    
    render() {
        const items = this.sampleItems.map(item => PostCardComponent.render(item)).join('');
        return `<div class="product-grid">${items}</div>`;
    }
};
