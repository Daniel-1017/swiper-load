;(() => {
    if (customElements.get('x-hero-swiper')) return;
    
    class xHeroSwiper extends xSwiper {
        constructor() { super(); }

        generateSlidesMarkup() {
            return this.config.mediaURLs.map(url => `
                <div class="swiper-slide">
                    <img src="${url}" alt="image" />
                </div>
            `).join``;
        }
    }

    customElements.define('x-hero-swiper', xHeroSwiper);
})();

