class Utils {
    static loadJS(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;

            // Resolve the promise when the script is loaded
            script.onload = () => resolve(`Loaded: ${src}`);
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

            // Append the <script> to the <body> or <head>
            document.body.appendChild(script);
        });
    }

    static loadCSS(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;

            // Resolve the promise when the CSS file is loaded
            link.onload = () => resolve(`Loaded: ${href}`);
            link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));

            // Append the <link> to the <head>
            document.head.appendChild(link);
        });
    }

    /**
     * Waits for a target element to intersect with the viewport or a specified root element.
     * 
     * @param {Element} targetElement - The DOM element to observe for intersection.
     * @param {Object} [config={}] - Optional configuration object for the IntersectionObserver.
     * @param {boolean} [runOnce=true] - If true, the observer will stop observing after the first intersection.
     * @returns {Promise<void>} A promise that resolves when the target element intersects with the viewport or root element.
     */
    static waitForInteraction(targetElement, config = {}, runOnce = true) {
        return new Promise(resolve => {
            // Create the Intersection Observer
            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Run only once
                            if (runOnce) observer.unobserve(entry.target);

                            return resolve();
                        }
                    });
                },
                {
                    root: null, // Use the viewport as the root
                    threshold: 0, // Trigger as soon as any part of the element intersects
                    ...config
                }
            );

            // Observe the target element
            observer.observe(targetElement);
        });
    }

    /**
     * Method to make fetch requests.
     * 
     * @param {string} url - The URL to fetch.
     * @param {Object} options - The fetch options (method, headers, body, etc.).
     * @returns {Promise} - Returns a promise with the response data or error message.
     */
    static fetchData(url, options = {}) {
        return new Promise((resolve, reject) => {
            // Set default options if not provided
            const defaultOptions = {
                method: 'GET', // Default method is GET
                headers: {
                    'Content-Type': 'application/json',
                },
                ...options, // Override with the options passed in
            };

            // Perform the fetch request
            fetch(url, defaultOptions)
                .then((response) => {
                    // Check if the request was successful (status code 200-299)
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    // Parse JSON response if successful
                    return response.json();
                })
                .then((data) => {
                    resolve(data); // Resolve with the JSON data
                })
                .catch((error) => {
                    reject(`Error fetching data: ${error.message}`); // Reject with the error message
                });
        });
    }

}

class View extends HTMLElement {
    constructor() { super(); }

    addClasses(classes) {
        this.classList.add(...classes.split(' '));
    }

    render() {
        this.clear();
        this.innerHTML = this.generateMarkup();
    }

    clear() {
        this.innerHTML = '';
    }
}