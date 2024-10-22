import {Global} from "../components/Global.js";

class Dialogs extends Global {

    captionDisplay(data) {
        const textTracks = data;
        const config = {};

        if (textTracks.length === 0)
            return {};

        for (let i = 0; i < textTracks.length; i++) {
            const track = textTracks[i];
            config[track.label] = {
                'icon': null,
                'action': () => {
                    const media = this.media;
                    const subtitle = this.subtitle;
                    const tracks = media.textTracks;
                    for (let i = 0; i < tracks.length; i++) {
                        if (tracks[i].language === track.language) {
                            tracks[i].mode = 'showing';
                            const activeCues = Array.isArray(tracks[i].activeCues) ? tracks[i].activeCues : [];
                            if (activeCues.length > 0) {
                                subtitle.innerHTML = activeCues[0].text;
                                subtitle.classList.add('show');
                            } else {
                                subtitle.innerHTML = '';
                                subtitle.classList.remove('show');
                            }
                        } else {
                            tracks[i].mode = 'disabled';
                        }
                    }
                }
            };
        }
        return config;
    }

    settingDisplay() {
        return {
            'Playback Speed': {
                'icon': '<i class="fas fa-play-circle"></i>',
                'action': () => alert('playback')
            },
            'Sleep': {
                'icon': '<i class="fas fa-clock"></i>',
                'action': () => alert('sleep')
            },
            'Quality': {
                'icon': '<i class="fas fa-star"></i>',
                'action': () => alert('quality')
            }
        };
    }
}

export {Dialogs};