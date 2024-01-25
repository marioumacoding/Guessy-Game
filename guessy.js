var height = 6; //number of guesses
var width = 5; // length of the word

var row = 0; //current guess (attempt n)
var col = 0; //current letter for that attempt

var gameOver = false;

const fiveLetterWords = [
  "APPLE", "CHAIR", "BLUE", "JUMP", "FROG",
  "MILK", "SUNNY", "BIRD", "DANCE", "RIVER",
  "PLANT", "SMILE", "GRASS", "CAKE", "HAPPY",
  "ROCKS", "QUIET", "SLEEP", "LEMON", "WATER",
  "FIRE", "SNAKE", "LAUGH", "SWEET", "CRANE",
  "TABLE", "LUNCH", "MOUSE", "HOUSE", "SMOKE",
  "GLASS", "GRAND", "MUSIC", "STARS", "CLOUD",
  "CHALK", "GRASS", "STAIR", "SHEET", "STORM",
  "CROWN", "CRISP", "BRUSH", "QUICK", "WATER",
  "SHIRT", "THORN", "PLATE", "BLINK", "PLUCK",
  "PAULA","SKIRT","CHASE", "BLOOD","CROWD"
];
// Get a random index from the array
const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
let word = fiveLetterWords[randomIndex];

window.onload = function () {
  intialize();
}

function intialize() {
  // Create the game board
  for (let r = 0; r < height; r++) { //6
    for (let c = 0; c < width; c++) { //5
      // <span id = "0-0" class= "tile">P</span>
      let tile = document.createElement("span");
      tile.id = r.toString() + '-' + c.toString();
      tile.classList.add("tile"); // adds the css class tile to the element tile
      tile.innerText = ""; // initialize the content of the tile to empty
      document.getElementById("board").appendChild(tile); // appends the new tile to the board (html)
    }
  }

  //listen for key press
  document.addEventListener("keyup", (e) => {
    if (gameOver) return;

    // alert(e.code); //will tell us what key was pressed
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < width) {
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        if (currTile.innerText == "") {
          currTile.innerText = e.code[3];
          col += 1;
        }
      }
    }
    else if (e.code == "Backspace") {
      if (0 < col && col <= width) {  //0 - 4 
        col -= 1;
      }
      let currTile = document.getElementById(row.toString() + '-' + col.toString());
      currTile.innerText = "";
    }

    else if (e.code == "Enter") {
      if (col < width)
        return;
      update();
      row += 1; //start new row
      col = 0; //start at 0 for new row
    }

    if (!gameOver && row == height) {
      gameOver = true;
      document.getElementById("answer").innerText = word;
    }

  })

  function update() {
    let correct = 0;
// Use the random index to get a random word
    // let word = fiveLetterWords[randomIndex];
    let word = "SUNNY";
    for (let c = 0; c < width; c++) {

      let currTile = document.getElementById(row.toString() + '-' + c.toString());
      let letter = currTile.innerText;

      // Is the letter entered by the user in the correct position?
      if (word[c] == letter) {
        currTile.classList.add("correct");
        correct += 1;
        word = word.split('');
        word[c] = 'x';
        word = word.join('');
      }
      // check if the letter is in the word
      else if (word.includes(letter)) {
        currTile.classList.add("present");
        word = word.split('');
        word[c] = 'x';
        word = word.join('');
      }
      // the letter is not found
      else {
        currTile.classList.add("absent");
      }
      if (correct == width) {
        gameOver = true;
        //do an alert of winner
      }
    }
  }
}