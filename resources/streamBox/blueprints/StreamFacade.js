import {Global} from "../components/Global.js";

function StreamFacade(...mixins) {

    class Facade extends Global {
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

        showDialog(data) {
            let container = this.dialog;
            container.innerHTML = '';
            container.classList.add('show');

            for(const label in data) {
                const icon = data[label].icon;
                const action = data[label].action;

                let list = document.createElement('div');
                let labelElem = document.createElement('label');
                let iconElem = document.createElement('span');

                list.classList.add('list');
                labelElem.innerHTML = label;
                iconElem.innerHTML = icon;

                if (icon) {
                    labelElem.style.alignItems = 'left';
                    iconElem.style.alignItems = 'right';
                    list.append(labelElem, iconElem);
                } else {
                    labelElem.style.alignItems = 'center';
                    iconElem.style.alignItems = 'center';
                    list.append(labelElem);
                }

                list.addEventListener('click', (e) => {
                    e.stopImmediatePropagation();
                    action();
                });
                container.append(list);
            }
        }

        registerDialogAction(elem, action) {
            const name = elem.getAttribute('action');
            const container = this.dialog;
            elem.addEventListener('click', () => {
                if (container.classList.contains('show') && container.getAttribute('lastAction') === name) {
                    container.innerHTML = '';
                    container.classList.remove('show');
                } else {
                    container.setAttribute('lastAction', name);
                    const result = action();
                    this.showDialog(result);
                }
            });
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
