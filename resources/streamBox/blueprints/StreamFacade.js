function StreamFacade(...mixins) {

    class Facade {
        /**
         * Static method to initialize and create instances for each video element with the specified class name.
         * This method searches the document for all elements with the provided class name and creates a new
         * instance of the class for each video element found.
         *
         * @param {string} className - The class name used to select video elements from the DOM.
         * @returns {void} This method does not return any value.
         */
        static commence(className) {
            // Retrieve all video elements with the specified class name
            const videos = document.getElementsByClassName(className);

            // Iterate through the NodeList and instantiate a StreamBox for each video element
            for (let i = 0; i < videos.length; i++) {
                const player = new this(videos[i], i);
            }
        }

        /**
         * Formats a given time in seconds into a string representing minutes and seconds.
         * This method takes a time value, calculates the minutes and seconds, and returns
         * the formatted string in the "MM:SS" format.
         *
         * @param {number} time - The time in seconds to format.
         * @returns {string} The formatted time as a string in "MM:SS" format.
         */
        formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        }
    }

    // Copy all methods and properties from each mixin to the new class
    for (const mixin of mixins) {
        Object.getOwnPropertyNames(mixin.prototype).forEach(name => {
            Facade.prototype[name] = mixin.prototype[name];
        });
    }

    return Facade;
}

export {StreamFacade};
