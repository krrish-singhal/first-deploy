let songIndex = 0;
let gif = document.querySelector("#gif");
let masterPlay = document.querySelector("#masterPlay");
let myProgressBar = document.querySelector("#myProgressBar");
let songInfo = document.querySelector(".songInfo");
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songname: "Chaleya (Jawan)", filePath: "C:/Users/MY LENOVO/OneDrive/Desktop/first-deploy/Chaleya_-_Jawan_128_Kbps.mp3" },
    { songname: "Illegal Weapon", filePath: "C:/Users/MY LENOVO/OneDrive/Desktop/first-deploy/Illegal_Weapon_1.mp3" },
    { songname: "Bijlee Bijlee", filePath: "C:/Users/MY LENOVO/OneDrive/Desktop/first-deploy/Bijlee_Bijlee_-_Harrdy_Sandhu.mp3" },
    { songname: "Har Har Shambu", filePath: "C:/Users/MY LENOVO/OneDrive/Desktop/first-deploy/Har Har Shambhu Shiv Mahadeva(PagalWorld.com.cm).mp3" },
    { songname: "Vinti Sun Le Hamar", filePath: "C:/Users/MY LENOVO/OneDrive/Desktop/first-deploy/Hey_Bajrangbali_Vinti_Sun_Le_Hamar_(EDM_ReMix)_Dj_Ankit_Rangi.mp3" },
    { songname: "Tution Badmashi Ka", filePath: "C:/Users/MY LENOVO/OneDrive/Desktop/first-deploy/Tuition Badmashi Kaa_320(PagalWorld.com.se).mp3" },
    { songname: "Bilionera", filePath: "C:/Users/MY LENOVO/OneDrive/Desktop/first-deploy/Bilionera(PagalWorld).mp3" },
    { songname: "System Pe System", filePath: "C:/Users/MY LENOVO/OneDrive/Desktop/first-deploy/System Pe System_320(PagalWorldl).mp3" },
    { songname: "Sheesh ki daani", filePath: "C:/Users/MY LENOVO/OneDrive/Desktop/first-deploy/_Mere_Sheesh_Ke_Daani_Ka_7.mp3" },
    { songname: "Happy Birthday", filePath: "C:/Users/MY LENOVO/OneDrive/Desktop/first-deploy/Happy_Birthday_-_Shanky_Goswami(MrSong.In).mp3" }
];

let audioElement = new Audio(songs[songIndex].filePath);

// Function to update UI for the selected song
const updateUI = () => {
    // Update bottom bar song info
    songInfo.innerHTML = `<img src="music.gif" width="50px" alt="1" id="gif">${songs[songIndex].songname}`;

    // Reset all song items to remove active state
    songItems.forEach((element, i) => {
        element.classList.remove('active');
        element.querySelector('.songItemPlay').classList.remove('fa-pause');
        element.querySelector('.songItemPlay').classList.add('fa-play');
    });

    // Highlight the current song
    songItems[songIndex].classList.add('active');
    songItems[songIndex].querySelector('.songItemPlay').classList.remove('fa-play');
    songItems[songIndex].querySelector('.songItemPlay').classList.add('fa-pause');
};

// Event listener for master play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

// Event listener for individual song play buttons (icon near timestamp)
songItems.forEach((element, index) => {
    element.querySelector('.songlistplay').addEventListener('click', () => {
        songIndex = index;
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
        updateUI();
    });
});

// Update progress bar as song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

// Seek song based on progress bar input
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Initial UI update
updateUI();

