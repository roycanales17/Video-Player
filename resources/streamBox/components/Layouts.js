import {Global} from "./Global.js";

class Layouts extends Global {

    setupHeader() {
        let header = this.header;
        header.innerHTML = `<label>${this.title}</label>`;
    }

    setupContent() {
        this.content.append(
            this.createTogglePlaybackIcon(),
            this.createPopupDialog(),
            this.createSubtitlePlacement()
        );
    }

    setupFooter() {
        this.footer.append(
            this.createSeekbar(),
            this.createControllers()
        );
    }
}

export {Layouts};