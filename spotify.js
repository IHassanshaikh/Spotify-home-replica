let currentsong = new Audio;
let songUL;
let songs;
let a

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
  currFolder = folder;
  a = await fetch(`${/songs/}`)
  let response = await a.text();
  let div = document.createElement("div")
  div.innerHTML = response;
  let as = div.getElementsByTagName("a")
  songs = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`${/songs/}`)[1])
    }
  }

  const playmusic = (track) => {
    currentsong.src = "/songs/" + track;
    currentsong.play();
    play.src = "/svg file/pause.svg";
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".duration").innerHTML = "00/00";
  }

  songUL = document.querySelector(".songcard").getElementsByTagName("ul")[0]
  songUL.innerHTML = ""
  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `<li class="border list">
      <div class="info">
          <div class="songname"> ${song.replaceAll("%20", " ")}</div>
          <div> </div>
      </div>
 </li>`;
  }
  Array.from(document.querySelector(".list").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
  });

  currentsong.addEventListener("timeupdate", () => {
    document.querySelector(".duration").innerHTML = `${secondsToMinutesSeconds(currentsong.duration)}/${secondsToMinutesSeconds(currentsong.currentTime)}`;
    document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
  })

  document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentsong.currentTime = ((currentsong.duration) * percent) / 100;
  })

  let play = document.querySelector(".play");
  play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play();
      play.src = "/svg file/pause.svg";
    } else {
      currentsong.pause();
      play.src = "/svg file/play.svg";
    }
  });
  // previous and next
  document.querySelector(".next").addEventListener("click", () => {
    let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
    if ((index + 1) > length) {
      playmusic(songs[index + 1]);
      var songElement = document.querySelector('.songinfo');
      var songName = songElement.textContent;
      var formattedSongName = songName.replace(/%20/g, ' ');
      songElement.textContent = formattedSongName;
    }
  })

  document.querySelector(".previous").addEventListener("click", () => {
    let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
    if ((index - 1) >= length) {
      playmusic(songs[index - 1]);
      var songElement = document.querySelector('.songinfo');
      var songName = songElement.textContent;
      var formattedSongName = songName.replace(/%20/g, ' ');
      songElement.textContent = formattedSongName;
    }
  }
  )
  // FOR MEDIA QUEERY
  document.querySelector(".swipe").addEventListener("click", () => {
    document.querySelector(".library").style.transform = "translateX(0%)";
    document.querySelector(".header").style.transform = "translateX(0%)";
  });
  document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".library").style.transform = "translateX(-110%)";
    document.querySelector(".header").style.transform = "translateX(-110%)";
  });
}
getSongs()
