class xSwiper extends View {
    config = JSON.parse(this.querySelector('script')?.textContent ?? null)?.config;

    hasNavigation = this.hasAttribute('navigation');
    hasPagination = this.hasAttribute('pagination');

    // Default configuration for Swiper, navigation and pagination. Add navigation and pagination if the attributes are present.
    defaultConfig = {
        pagination: this.hasPagination ? {
            el: ".swiper-pagination",
            dynamicBullets: true
        } : {},
        navigation: this.hasNavigation ? {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        } : {}
    }

    constructor() { super(); }

    async connectedCallback() {
        await Utils.waitForInteraction(this);
        
        await this.loadSwiper();

        if (!window.Swiper) return console.error('Swiper not loaded');

        this.addClasses('swiper');

        if (this.config.url) this.data = await Utils.fetchData(this.config.url);

        this.render();
        this.initSwiper();
    }

    // Load Swiper library and its CSS file
    async loadSwiper() {
        return await Promise.all([Utils.loadJS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'), Utils.loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css')]).catch(console.error);
    }

    initSwiper() {
        new Swiper(this, { ...this.defaultConfig, ...this.config.swiperSettings });
    }

    generateMarkup() {
        return `
            <div class="swiper-wrapper">
                ${this.generateSlidesMarkup()}
            </div>

            ${this.hasNavigation ? this.renderNavigation() : ''}
            ${this.hasPagination ? this.renderPagination() : ''}
        `;
    }

    generateSlidesMarkup() { }

    renderNavigation() {
        return `
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        `;
    }

    renderPagination() {
        return '<div class="swiper-pagination"></div>';
    }
}

; (() => {
    if (customElements.get('x-swiper')) return;
    customElements.define('x-swiper', xSwiper);
})();