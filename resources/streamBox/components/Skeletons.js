import {Global} from "./Global.js";

class Skeletons extends Global {

    /**
     * Stores the title attribute of the video element in the instance and removes it from the DOM element.
     * This method is useful for preserving the original title while keeping the video element clean.
     *
     * @method
     * @memberof Global
     * @returns {void}
     */
    createTitle() {
        // Store the title attribute
        this.title = this.media.getAttribute('title');

        // Remove the title attribute from the video element
        this.media.removeAttribute('title');
    }

    /**
     * Generates and assigns a unique name attribute to the video element based on the class name and its identifier.
     * This method helps uniquely identify each video element within the page.
     *
     * @method
     * @memberof Global
     * @param {number} id - A unique identifier used to distinguish this video element.
     * @param {string} className - The base class name used to generate the unique name for the video element.
     * @returns {void}
     */
    createName(id, className) {
        // Set the unique name based on the class name and id
        this.name = `${className}-${id}`;

        // Assign the unique name as an attribute to the video element
        this.media.setAttribute('assigned-name', this.name);

        // Remove the specified class from the video element to avoid repeated processing
        this.media.classList.remove(className);
    }

    /**
     * Creates a container div element for the video element and wraps the video within this container.
     * The container is assigned a specified class name, and the video is moved inside the newly created container.
     *
     * @method
     * @memberof Global
     * @param {string} className - The class name to be assigned to the container element for styling and identification.
     * @returns {void}
     */
    createContainer(className) {
        let video = this.media;

        // Create a new div element to serve as the container
        const container = document.createElement('div');
        container.className = className;

        // Insert the container before the video element and append the video inside it
        video.parentNode.insertBefore(container, video);
        container.appendChild(video);

        // Store the container element as an instance property
        this.container = container;
    }

    /**
     * Creates and appends partition elements ('header', 'content', 'footer') to the container.
     * This method dynamically creates `div` elements for each partition, assigns them class names,
     * and appends them to the `container` element within the class instance.
     *
     * @method
     * @memberof Global
     * @returns {void}
     */
    createPartition() {
        let partition = ['header', 'content', 'footer'];
        for (let i = 0; i < partition.length; i++) {
            let name = partition[i];

            // Create dynamic div element divider
            this[name] = document.createElement('div');

            // Add class name
            this[name].classList.add(name);

            // Append to container
            this.container.append(this[name]);
        }

        // Set up the media header
        this.setupHeader();

        // Set up the media content
        this.setupContent();

        // Set up the media footer
        this.setupFooter();
    }

    /**
     * Creates and sets up the seek bar elements within the video player.
     * The seek bar consists of various elements like the progress bar, buffered bar, point indicator,
     * thumbnail preview, and thumbnail time. These elements are dynamically created and added to the seek bar container,
     * which is then appended to the footer of the video player.
     *
     * @method
     * @memberof Global
     * @return {HTMLElement}
     */
    createSeekbar() {

        // Create the main container for the seek bar
        let container = document.createElement('div');

        // Dynamic seek bar elements
        let seekBarElements = {
            'bar': 'span',
            'buffered': 'span',
            'point': 'span',
            'thumbnail': this.createThumbnailTime()
        };

        // Add a class name to the seek bar container
        container.classList.add('seek-bar');

        // Create and assign elements dynamically based on the keys and element types in seekBarElements
        let elements = {};
        for (let key in seekBarElements) {
            if (seekBarElements.hasOwnProperty(key)) {
                let elem = null;
                let elementType = seekBarElements[key];

                if (typeof elementType === 'string') {
                    // Create the element based on its type
                    elements[key] = document.createElement(elementType);
                    elements[key].classList.add(key);
                    elem = elements[key];
                } else {
                    elementType.container.classList.add(key)
                    elements[key] = elementType;
                    elem = elementType.container;
                }

                // Append the created element to the seek bar container
                container.append(elem);
            }
        }

        // Assign the seek bar container and its elements to the instance property 'seekBarAttr'
        this.seekBar = { 'container': container, ...elements };

        // Return the result
        return container;
    }

    /**
     * Creates a thumbnail time display element.
     *
     * This method generates a container element that holds a small
     * text element displaying the time in the format '00:00'.
     * The time represents the current playback time for the thumbnail.
     *
     * @returns {HTMLDivElement} container - The div element containing the time display.
     * @returns {HTMLElement} time - The small element that displays the time (initialized to '00:00').
     */
    createThumbnailTime() {
        let container = document.createElement('div');
        let time = document.createElement('small');

        time.innerHTML = '00:00';
        container.append(time);
        return {
            'container': container,
            'time': time
        };
    }

    /**
     * Creates an icon element with the specified class.
     *
     * @param {string} iconClass - The class name to be added to the icon element.
     * @returns {HTMLElement} The created icon element.
     */
    createIcon(...iconClass) {
        const icon = document.createElement('i');
        icon.classList.add('icons', 'fas', ...iconClass);
        return icon;
    }

    /**
     * Creates a container for media controls, organizing them into left and right partitions.
     *
     * @returns {HTMLElement}
     * @property {Object} controls - An object containing references to the created control elements.
     * @property {HTMLDivElement} controls.play - The icon element representing the play action.
     * @property {Object} controls.timeDuration - The time duration controller, encapsulating the running and maximum time elements.
     * @property {HTMLDivElement} controls.volume - The volume controller, containing the volume button and range input.
     * @property {HTMLDivElement} controls.caption - The icon element for captioning.
     * @property {HTMLDivElement} controls.setting - The icon element for accessing settings.
     * @property {HTMLDivElement} controls.toggleScreenMode - The icon element for toggling fullscreen and normal modes.
     */
    createControllers() {
        let controls = {};
        let container = document.createElement('div');
        let partition = {
            'left': {
                'play': 'fa-play',
                'timeDuration': this.createTimeDurationController(),
                'volume': this.createVolumeController()
            },
            'right': {
                'caption': 'fa-closed-captioning',
                'setting': 'fa-cog',
                'toggleScreenMode': 'fa-expand'
            }
        };

        // Set up first the container
        container.classList.add('controls');

        // Load the utilities
        for(let name in partition) {
            let elem = document.createElement('div');
            elem.classList.add('divider');

            for (let control in partition[name]) {
                let controlElem = partition[name][control];
                if (typeof controlElem === 'string') {
                    controlElem = this.createIcon(controlElem);
                    controlElem.classList.add(control);
                    elem.append(controlElem);
                } else {
                    controlElem.container.classList.add(control);
                    elem.append(controlElem.container);
                }
                controls[control] = controlElem;
            }
            container.append(elem);
        }

        // Set as global
        this.controls = controls;

        // Return the result
        return container;
    }

    /**
     * Creates a time duration controller that displays the current and maximum time of the media.
     *
     * @returns {Object} An object containing the time duration elements.
     * @property {HTMLElement} container - The container for the time duration display.
     * @property {HTMLSpanElement} maximum - The element displaying the maximum duration of the media.
     * @property {HTMLSpanElement} running - The element displaying the current running time of the media.
     */
    createTimeDurationController() {
        const running = document.createElement('span');
        const maximum = document.createElement('span');
        const container = document.createElement('small');

        running.textContent = '0:00';
        maximum.textContent = '0:00';

        container.appendChild(running);
        container.insertAdjacentHTML('beforeend', '&nbsp;/&nbsp;');
        container.appendChild(maximum);

        // Return the attributes
        return {
            'container': container,
            'maximum': maximum,
            'running': running
        };
    }

    /**
     * Creates a volume controller that includes a button for volume action and a range input for adjusting volume levels.
     *
     * @returns {Object} An object containing the volume controller elements.
     * @property {HTMLDivElement} container - The container for the volume controls.
     * @property {HTMLElement} button - The icon element representing the volume action.
     * @property {HTMLInputElement} range - The range input element for adjusting the volume level.
     */
    createVolumeController() {
        const container = document.createElement('div');
        const volumeBtn = this.createIcon('fa-volume-up');
        const volumeRange = document.createElement('input');

        // Customize
        volumeRange.setAttribute('type', 'range');
        volumeRange.setAttribute('value', '1');
        volumeRange.setAttribute('min', '0');
        volumeRange.setAttribute('max', '1');
        volumeRange.setAttribute('step', '0.01');

        // Append to the container
        container.append(volumeBtn, volumeRange);

        // Return the attributes
        return {
            'container': container,
            'button': volumeBtn,
            'range': volumeRange
        };
    }

    /**
     * Creates a playback icon container with a spinning loading icon.
     *
     * This method constructs a div element that contains an icon element
     * representing the playback state. The icon is styled to spin, indicating
     * that the media is loading or processing.
     *
     * @returns {HTMLDivElement} The container div that holds the playback icon.
     */
    createTogglePlaybackIcon() {
        let container = document.createElement('div');
        let icon = this.createIcon('fa-spinner', 'fa-spin');

        container.append(icon);
        container.classList.add('playback-icon');
        this.playbackIcon = icon;
        return container;
    }

    createSubtitlePlacement() {
        return document.createElement('div');
    }
}

export { Skeletons };
