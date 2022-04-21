/* Music Box Variable Naming*/

let song_art = document.querySelector('.song-art');
let song_name = document.querySelector('.song-name');
let song_artist = document.querySelector('.song-artist');

let playpause_btn = document.querySelector('.playpause-song');
let next_btn = document.querySelector('.next-song');
let prev_btn = document.querySelector('.previous-song');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let visualizer = document.getElementById('visualizer');
let randomIcon = document.querySelector('.fa-random');
let curr_song = document.createElement('audio');
/*Track Player Music Seq*/
let song_index = 0;
let isPlaying = false;
let isRandom = false; 
let updateTimer;


/* Music Queue - 4 songs */
const song_queue = [
     /*Song 1-Music of The Month*/
    {
        img : 'image.jpg',
        name : 'Music of the Month',
        artist : 'Rick & Mario',
        music : 'music.mp3'
    },
      /*Song 2-Until I Found You*/
    {
        img : 'image_1.jpg',
        name : 'Until I Found You',
        artist : 'Stephen Sanchez',
        music : 'music_1.mp3'
    },
     /*Song 3-Out Of My League*/
    {
        img : 'image_2.jpg',
        name : 'Out Of My League',
        artist : 'Fitz And The Tantrums',
        music : 'music_2.mp3'
    },
     /*Song 4-We Didn't Start The Fire*/
    {
        img : 'image_3.jpg',
        name : 'We Didnt  Start The Fire',
        artist : 'Billy Joel',
        music : 'music_3.mp3'
    }
];

loadSong(song_index);

function loadSong(song_index){
    clearInterval(updateTimer);
    reset();

    curr_song.src = song_queue[song_index].music;
    curr_song.load();

   song_art.style.backgroundImage = "url(" +song_queue[song_index].img + ")";
    song_name.textContent = song_queue[song_index].name;
    song_artist.textContent = song_queue[song_index].artist;
    /* now_playing.textContent = "Playing music " + (song_index + 1) + " of " + song_queue.length; */

    updateTimer = setInterval(setUpdate, 1000);

    curr_song.addEventListener('ended', nextSong);
    random_bg_color();
}
/* Random Background Colour Generator*/
function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomSong(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatSong(){
    let current_index = song_index;
    loadSong(current_index);
    playSong();
}
function playpauseSong(){
    isPlaying ? pauseSong() : playSong();
}
function playSong(){
    curr_song.play();
    isPlaying = true;
    song_art.classList.add('rotate');
    visualizer.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseSong(){
    curr_song.pause();
    isPlaying = false;
    song_art.classList.remove('rotate');
    visualizer.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextSong(){
    if(song_index < song_queue.length - 1 && isRandom === false){
        song_index += 1;
    }else if(song_index < song_queue.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() *song_queue.length);
        song_index = random_index;
    }else{
        song_index = 0;
    }
    loadSong(song_index);
    playSong();
}
function previousSong(){
    if(song_index > 0){
        song_index -= 1;
    }else{
        song_index = song_queue.length -1;
    }
    loadSong(song_index);
    playSong();
}
function seekTo(){
    let seekto = curr_song.duration * (seek_slider.value / 100);
    curr_song.currentTime = seekto;
}
function setVolume(){
    curr_song.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_song.duration)){
        seekPosition = curr_song.currentTime * (100 / curr_song.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_song.currentTime / 60);
        let currentSeconds = Math.floor(curr_song.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_song.duration / 60);
        let durationSeconds = Math.floor(curr_song.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}