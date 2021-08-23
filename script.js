
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const musicContainer = document.getElementById('music-container');

//song Titles
const songs = ['01 Red','02 Fallen Angel',
'03 One More Red Nightmare', 
'04 Providence (1)',
'05 Providence (2)',
'06 Starless'];

//Keep Track 
let songIndex = 5;
//Previous Song

function prevSong(){
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Play Song
function playSong(){
    //adding the play class
    musicContainer.classList.add('play');
    //changing play button to pause button
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    //audio API call "play"
    audio.play();
}

//Pause Song
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

//Next Song
function nextSong(){
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress bar, gonna take the duration and the 
// current time of the song from the "srcElement" element
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    //Take the WIDTH of the progress element to set the progressPercent to see the progress bar
    progress.style.width =`${progressPercent}%`;

}

//Initially load song details into DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `Kingcrimsontracks/${song}.flac`;
}

//Set Progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    //get the duration of the song from the audio API
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


//EVENT LISTENERS
playBtn.addEventListener('click', () => {
    //if the music container has play we know is playing
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
});

//Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Time song Update
audio.addEventListener('timeupdate', updateProgress);

//Click on progress bar
progressContainer.addEventListener('click', setProgress);

//song ends
audio.addEventListener('ended', nextSong);

//click on the progress bar
progressContainer.addEventListener('click', setProgress);

//song ends
audio.addEventListener('ended', nextSong);

