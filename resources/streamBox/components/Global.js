class Global {

    /**
     * @type {HTMLElement} Video element container.
     */
    container;

    /**
     * @type {string} name - A unique identifier assigned to this specific media element.
     */
    name;

    /**
     * @type {HTMLVideoElement} media - The video element associated with the StreamBox instance, used for media playback.
     */
    media;

    /**
     * @type {string} media source.
     */
    source;

    /**
     * @type {TextTrackList} subtitles - A list of text tracks associated with the media element, which can include subtitles and captions.
     * @property {TextTrack[]} subtitles.tracks - An array of text tracks, where each track represents a subtitle or caption.
     * @property {string} subtitles.tracks[i].label - A user-readable title of the track (e.g., "English", "Spanish").
     * @property {string} subtitles.tracks[i].language - The language of the track (e.g., "en", "es").
     * @property {string} subtitles.tracks[i].mode - The current mode of the track, which can be "disabled", "hidden", or "showing".
     */
    subtitles;

    /**
     * @type {string|null} title - The title attribute for the video element, providing a descriptive label for the StreamBox instance.
     *                             Can be null if not set.
     */
    title;

    /**
     * @type {HTMLElement} header - The header section element for the media, typically used for displaying media information or controls.
     */
    header;

    /**
     * @type {HTMLElement} content - The main content element of the media, holding the core media playback area or related components.
     */
    content;

    /**
     * @type {HTMLElement} Main icon centered.
     */
    playbackIcon;

    /**
     * @type {HTMLElement} footer - The footer section element for the media, often used for additional controls or metadata.
     */
    footer;

    /**
     * @type {Object} Seek Bar Elements
     * @property {HTMLDivElement} container - The main container for the seek bar.
     * @property {HTMLDivElement} bar - The bar representing the current seek progress.
     * @property {HTMLDivElement} buffered - The bar showing the buffered progress.
     * @property {HTMLSpanElement} point - The current point indicator on the seek bar.
     * @property {HTMLDivElement} thumbnail - The container for the video thumbnail preview.
     *      @property {HTMLDivElement} thumbnail.container - The container for thumbnail.
     *      @property {HTMLElement} thumbnail.time - The element showing the time on the video thumbnail.
     */
    seekBar;

    /**
     * @type {Object} Media Controls Elements
     * @property {HTMLElement} play - The icon element representing the play action.
     * @property {Object} timeDuration - The object containing elements related to media duration.
     *      @property {HTMLElement} timeDuration.running - The element displaying the current playback time.
     *      @property {HTMLElement} timeDuration.maximum - The element displaying the total duration of the media.
     * @property {Object} volume - The control element for adjusting the media volume.
     *      @property {HTMLDivElement} volume.container - The container for volume controls, encapsulating the button and range slider.
     *      @property {HTMLButtonElement} volume.button - The icon element representing the volume action (e.g., mute/unmute).
     *      @property {HTMLInputElement} volume.range - The input element representing the volume level, allowing users to adjust the volume via a slider.
     * @property {HTMLDivElement} caption - The container for displaying captions or subtitles.
     * @property {HTMLDivElement} setting - The element for accessing additional settings related to the media.
     * @property {HTMLDivElement} toggleScreenMode - The control element for toggling between fullscreen and normal screen modes.
     */
    controls;
}

export { Global };