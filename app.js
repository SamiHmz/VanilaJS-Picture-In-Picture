const video = document.getElementById("video");
const on = document.getElementById("on");
const off = document.getElementById("off");
const add = document.getElementById("add");

async function startVideoCapture() {
  try {
    videoStream = await navigator.mediaDevices.getDisplayMedia();
    video.srcObject = videoStream;
    video.onloadedmetadata = () => {
      video.hidden = false;
      video.play();
    };
    on.disabled = false;
    add.disabled = true;
  } catch (error) {
    console.log(error);
  }
}

function enablePictureInPicture() {
  video.hidden = true;
  video.requestPictureInPicture();
  on.disabled = true;
  off.disabled = false;
}

function exitPictureInPicture() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((error) => {
      console.log(error);
    });
    off.disabled = true;
    on.disabled = false;
    add.disabled = false;
    video.hidden = false;
  } else {
    alert("there is no picture in picture element");
  }
}

function pictureInPictureNotFound() {
  alert("Sorry You Don't have Picture In Picture Api In Your Browser");
}

// Event Listner
if ("pictureInPictureEnabled" in document) {
  on.addEventListener("click", enablePictureInPicture);
  off.addEventListener("click", exitPictureInPicture);
} else {
  on.addEventListener("click", pictureInPictureNotFound);
  of.addEventListener("click", pictureInPictureNotFound);
}

add.addEventListener("click", startVideoCapture);
