import {Listeners} from './blueprints/Listeners.js';
import {Skeletons} from './components/Skeletons.js';
import {Layouts} from "./components/Layouts.js";
import {Dialogs} from "./blueprints/Dialogs.js";
import {StreamFacade} from './blueprints/StreamFacade.js';

class StreamBox extends StreamFacade(Dialogs, Listeners, Skeletons, Layouts) {

    /**
     * The main class name used for identifying video container elements in the DOM.
     * @type {string}
     */
    #mainClass = 'video-container';

    /**
     * Constructor for the StreamBox class.
     * @param {HTMLElement} video - The video element to be wrapped.
     * @param {number} id - The unique identifier assigned to the video element.
     */
    constructor(video, id) {

        super();
        this.id = id;
        this.media = video;
        this.subtitles = this.media.textTracks;
        this.source = video.querySelector('source').src;

        /**
         * ------------------------------
         *       WRAP THE ELEMENT
         * ------------------------------
         */

        this.createTitle();
        this.createName(id, this.constructor.className);
        this.createContainer(this.#mainClass);
        this.createPartition();

        /**
         * ------------------------------
         *       ADD ACTION LISTENERS
         * ------------------------------
         */
        this.initializeMediaControls();
    }
}

export { StreamBox };