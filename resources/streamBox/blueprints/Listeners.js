import {Global} from "../components/Global.js";

class Listeners extends Global {

    /**
     * Initializes the media controls by setting up event listeners
     * for various playback features including play/pause, media
     * duration display, volume control, subtitles, playback speed,
     * media quality, and screen mode toggle.
     */
    initializeMediaControls() {

        // Controls toggle actions
        let controls = {
            'setupMediaDuration': true,
            'setupSeekBar': true,
            'setupPlayback': true,
            'setupVolumeControl': true,
            'setupSubtitles': true,
            'setupPlaybackSpeed': true,
            'setupMediaQuality': true,
            'setupScreenToggle': true
        };

        // Bypass the cache
        this.media.src = `${this.source}?`+ new Date().getTime();

        // Register the actions
        for(const action in controls) {
            let status = controls[action];
            if (status && this[action]) {
                this[action]();
            }
        }
    }

    setupPlayback() {
        let media = this.media;
        let btn = this.controls.play;
        let icon = this.playbackIcon;
        let content = this.content;

        const togglePlayBackIcon = (status, noFadeOut = false) => {
            if (status) {
                icon.removeAttribute('class');
                icon.classList.add('icons', 'fas', 'fa-pause');
                toggleVideoPause(true);
            } else {
                icon.removeAttribute('class');
                icon.classList.add('icons', 'fas', 'play', 'fa-play');
                toggleVideoPause(false);

                if (!noFadeOut) {
                    icon.classList.remove('fade-out');
                    setTimeout(() => icon.classList.add('fade-out'), 1000);
                }
            }
        }

        const toggleBtnIcon = (status) => {
            console.log('clicked');
            if (status) {
                btn.removeAttribute('class');
                btn.classList.add('icons', 'fas', 'fa-pause');
                togglePlayBackIcon(false);
                media.play();
            } else {
                btn.removeAttribute('class');
                btn.classList.add('icons', 'fas', 'play', 'fa-play');
                togglePlayBackIcon(true);
                media.pause();
            }
        }

        const toggleVideoPause = (status) => {
            if (status) {
                media.classList.add('paused');
            } else {
                media.classList.remove('paused');
            }
        }

        [content, btn].forEach(el => {
            el.addEventListener('click', () => toggleBtnIcon(media.paused));
        });
        media.addEventListener('canplay', () => {
            togglePlayBackIcon(false, true);
        }, { once: true });
    }

    setupMediaDuration() {
        let media = this.media;
        let running = this.controls.timeDuration.running;
        let maximum = this.controls.timeDuration.maximum;

        media.addEventListener('timeupdate', () => {
            running.textContent = this.formatTime(media.currentTime);
        });

        media.addEventListener('loadedmetadata', () => {
            maximum.textContent = this.formatTime(media.duration);
        });
    }

    setupVolumeControl() {
        let media = this.media;
        let btn = this.controls.volume.button;
        let range = this.controls.volume.range;

        btn.addEventListener('click', () => {
            if (media.muted || media.volume === 0) {
                media.muted = false;
                media.volume = range.value;
                if (media.volume === 0) {
                    media.volume = 1;
                    range.value = 1;
                }
                btn.removeAttribute('class');
                btn.classList.add('icons', 'fas', 'fa-volume-up');
            } else {
                media.muted = true;
                btn.removeAttribute('class');
                btn.classList.add('icons', 'fas', 'fa-volume-mute');
            }
        });

        range.addEventListener('input', (e) => {
            media.volume = e.target.value;
            if (!media.muted) {
                if (media.volume === 0) {
                    btn.removeAttribute('class');
                    btn.classList.add('icons', 'fas', 'fa-volume-mute');
                }
                else if (media.volume > 0.5) {
                    btn.removeAttribute('class');
                    btn.classList.add('icons', 'fas', 'fa-volume-up');
                }
                else {
                    btn.removeAttribute('class');
                    btn.classList.add('icons', 'fas', 'fa-volume-down');
                }
            }
        });
    }

    setupSubtitles() {
        // TODO: Display subtitles
    }

    setupPlaybackSpeed() {
        // TODO: Media speed configuration
    }

    setupMediaQuality() {
        // TODO: Media quality selections
    }

    setupScreenToggle() {
        let container = this.container;
        let btn = this.controls.toggleScreenMode;

        btn.addEventListener('click', function() {

            if (!document.fullscreenElement) {
                if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if (container.webkitRequestFullscreen) {
                    container.webkitRequestFullscreen();
                } else if (container.msRequestFullscreen) {
                    container.msRequestFullscreen();
                }
                btn.classList.remove('fa-expand');
                btn.classList.add('fa-compress');

            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                btn.classList.remove('fa-compress');
                btn.classList.add('fa-expand');
            }
        });

        document.addEventListener('fullscreenchange', function(e) {
            e.stopImmediatePropagation();
            if (!document.fullscreenElement) {
                btn.classList.remove('fa-compress');
                btn.classList.add('fa-expand');
            }
        });
    }

    setupSeekBar() {
        const media = this.media;
        const container = this.seekBar.container;
        const current = this.seekBar.bar;
        const buffered = this.seekBar.buffered;
        const point = this.seekBar.point;
        const thumbnail = this.seekBar.thumbnail.container;
        const thumbnailTime = this.seekBar.thumbnail.time;

        let isDragging = false;
        let mouseEnter = false;

        const thumbnailVideo = document.createElement('video');
        thumbnailVideo.crossOrigin = 'anonymous';
        thumbnailVideo.muted = true;
        thumbnailVideo.autoplay = false;
        thumbnailVideo.src = this.source;

        const startDragging = (event) => {
            isDragging = true;
            event.preventDefault();
        };

        const stopDragging = () => {
            isDragging = false;
            thumbnail.style.display = 'none';
        };

        const getThumbnail = (time, scaleFactor = 0.100) => {
            return new Promise((resolve) => {
                if (!time) return;

                thumbnailVideo.currentTime = time;
                thumbnailTime.innerHTML = this.formatTime(thumbnailVideo.currentTime);

                thumbnailVideo.addEventListener('seeked', function captureFrame() {
                    if (thumbnailVideo.videoWidth && thumbnailVideo.videoHeight) {
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');

                        const scaledWidth = thumbnailVideo.videoWidth * scaleFactor;
                        const scaledHeight = thumbnailVideo.videoHeight * scaleFactor;

                        canvas.width = scaledWidth;
                        canvas.height = scaledHeight;
                        context.drawImage(thumbnailVideo, 0, 0, scaledWidth, scaledHeight);

                        const thumbnailDataUrl = canvas.toDataURL();
                        resolve(thumbnailDataUrl);
                        thumbnailVideo.removeEventListener('seeked', captureFrame);
                    } else {
                        resolve(null);
                    }
                });
            });
        };

        const handleMouseMove = (event) => {
            const rect = container.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const percent = Math.max(0, Math.min(offsetX / rect.width, 1));
            const time = percent * media.duration;

            if (mouseEnter || isDragging) {
                thumbnail.style.left = `calc(${percent * 100}% - 90px)`;
                thumbnail.style.display = 'block';
                thumbnail.classList.add('blurred');
                getThumbnail(time).then(thumbnailImage => {
                    if (thumbnailImage) {
                        thumbnail.style.backgroundImage = `url(${thumbnailImage})`;
                    }
                    thumbnail.classList.remove('blurred');
                }).catch(console.error);
            } else {
                thumbnail.style.display = 'none';
            }

            if (isDragging) {
                current.style.width = `${percent * 100}%`;
                media.currentTime = time;
                point.style.left = `calc(${percent * 100}% - 5px)`;
                point.style.display = 'block';
            }
        };

        media.addEventListener('timeupdate', () => {
            const percent = (media.currentTime / media.duration) * 100;
            current.style.width = `${percent}%`;
            point.style.left = `calc(${percent}% - 5px)`;
            point.style.display = media.currentTime > 0 ? 'block' : 'none';
        });

        media.addEventListener('progress', () => {
            if (media.buffered.length > 0) {
                const bufferedEnd = media.buffered.end(media.buffered.length - 1);
                const percentBuffered = (bufferedEnd / media.duration) * 100;
                buffered.style.width = `${percentBuffered}%`;
            }
        });

        container.addEventListener('click', (event) => {
            const rect = container.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const percent = offsetX / rect.width;

            media.currentTime = percent * media.duration;
            point.style.left = `calc(${percent * 100}% - 5px)`;
            current.style.width = `${percent * 100}%`;
            point.style.display = 'block';

            if (media.paused) {
                media.pause();
            }
        });

        [current, buffered, point, container].forEach(el => {
            el.addEventListener('mousedown', startDragging);
            el.addEventListener('mouseenter', () => mouseEnter = true);
            el.addEventListener('mouseleave', () => mouseEnter = false);
        });

        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('mousemove', handleMouseMove);
    }
}

export {Listeners};
