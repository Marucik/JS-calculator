let body = document.querySelector('body');
function checkNumber() {
  switch (display.innerHTML ) {
    case "420":
      body.style.backgroundImage = "url(https://media.giphy.com/media/vTZX0SD5A0BoY/giphy.gif)";
      body.style.backgroundSize = "100%"
      break;
    case "1337":
      body.style.backgroundImage = "url(https://media.giphy.com/media/l46CfciRSJKVpUvAs/giphy.gif)";
      body.style.backgroundSize = "100%"
      break;
    case "666":
      body.style.backgroundImage = "url(https://media.giphy.com/media/GwM2kDSfSukcU/giphy.gif)";
      body.style.backgroundSize = "100%"
      break;
    default:
      body.style.backgroundImage = "";
      body.style.backgroundSize = "";
      break;
  }
}