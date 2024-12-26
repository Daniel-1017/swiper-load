;(() => {
    if (customElements.get('x-products-swiper')) return;
    
    class xProductsSwiper extends xSwiper {
        constructor() { super(); }

        generateSlidesMarkup() {
            return (this.data?.products ?? []).map(product => `
                <div class="swiper-slide pb-10">
                    <div class="rounded-xl overflow-hidden shadow-lg product-card">
                        <div>
                            <img src="${product.thumbnail}" alt="${product.title}" class="aspect-square">
                        </div>

                        <div class="p-8 product-card__body">
                            <h5 class="truncate font-semibold text-blue-950 uppercase">${product.title}</h5>

                            ${product.tags?.length ? this.renderProductTags(product.tags) : ''}

                            <p class="line-clamp text-xs text-slate-400" style="--line-clamp: 2;">${product.description}</p>

                            <div class="flex justify-between items-center">
                                <p class="text-blue-950 lg:text-xl xl:text-2xl font-bold">${product.price} $</p>

                                <div class="flex gap-1">
                                    ${Array(3).fill(0).map(() => `
                                        <button class="w-5 h-5 p-1 border border-slate-400 rounded-full">
                                            <div class="w-full h-full bg-red-500 rounded-full"></div>
                                        </button>
                                    `).join``}
                                </div>
                            </div>

                            <div class="flex justify-between">
                                <p class="text-xs text-slate-400">Quantity</p>

                                <div class="border border-slate-600 text-slate-600 flex gap-3 px-2">
                                    <button class="text-slate-400">-</button>
                                    <span>1</span>
                                    <button>+</button>
                                </div>
                            </div>

                            <button class="rounded-md bg-[#f94b4c] w-full p-2.5 text-white font-bold">Add to basket</button>
                        </div>
                    </div>
                </div>
            `).join``;
        }

        renderProductTags(tags) {
            return `<p class="text-slate-600 text-sm !mb-2">${tags.toString().replaceAll(',', ', ')}</p>`
        }
    }

    customElements.define('x-products-swiper', xProductsSwiper);
})();

