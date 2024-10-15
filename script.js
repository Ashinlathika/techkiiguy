const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');

// Tamil song titles (without .mp3 extension)
const songs = ['thalapathy', 'kanave_kanave', 'rowdy_baby'];

// Keep track of song
let songIndex = 0;

// Initially load song info
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song.replace('_', ' '); // Replace underscore with space for display
    audio.src = `music/${song}.mp3`;
}

// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);
