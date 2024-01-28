var height = 6; //number of guesses
var width = 5; // length of the word

var row = 0; //current guess (attempt n)
var col = 0; //current letter for that attempt

var inp = ""; // the full word entered by the user
var gameOver = false;

const fiveLetterWords = [
  "ACTOR", "ADULT", "ALERT", "APPLE", "ARISE", "BLOOM", "BLINK", "BLOOD", "BOOST", "BRAIN", "BROWN", "BUILT", "CARRY",
  "CHAIR", "CHALK", "CHASE", "CHILD", "CLOSE", "CLOUD", "COUNT", "CRANE", "CRISP", "CROWN", "CROWD", "DANCE", "DREAM",
  "DRINK", "DRIVE", "EARLY", "EMPTY", "ENJOY", "ENTER", "FAULT", "FIELD", "FIRED", "FLASH", "FLUID", "GLASS", "GLOBE",
  "GRAND", "GRASS", "GREAT", "GROSS", "HAPPY", "HOUSE", "HUMAN", "IMAGE", "INDEX", "INPUT", "ISSUE", "JEANS", "JELLY",
  "JOINT", "JUICE", "KILLS", "KNIFE", "KNOCK", "KNOWN", "LAUGH", "LEARN", "LEAVE", "LEMON", "LEVEL", "LIGHT", "LUNCH",
  "MAGIC", "MARRY", "MEALS", "MIXER", "MOUSE", "MUSIC", "NEWLY", "NIGHT", "NOISE", "NOVEL", "OFFER", "ORDER", "OTHER",
  "OUGHT", "PAINT", "PAPER", "PLANT", "PLATE", "PLUCK", "QUICK", "QUIET", "RIVER", "ROCKS", "ROUND", "ROYAL", "SCORE",
  "SHAPE", "SHARE", "SHARP", "SHEET", "SHIRT", "SKIRT", "SLEEP", "SMILE", "SMOKE", "SNAKE", "STAIR", "STARS", "STORM",
  "SUNNY", "SWEET", "TABLE", "TAKEN", "TEACH", "THANK", "THICK", "THORN", "UPPER", "UPSET", "USAGE", "USUAL", "VALUE",
  "VIDEO", "VIRAL", "VOICE", "WATER", "WHOLE", "WORLD", "WORST", "WRONG", "YARDS", "YEARS", "YOUNG", "YOUTH", "ZEROS"
];
// Get a random index from the array
const randomIndex = Math.floor(Math.random() * fiveLetterWords.length);
// Use the random index to get a random word
let word = fiveLetterWords[randomIndex];
// let word = chosen_word;
window.onload = function () {
  intialize();

  //event listener to the refresh button
  document.getElementById("refresh").addEventListener("click", function () {
    location.reload();
  });
  //event listener to the give up button
  document.getElementById("give-up").addEventListener("click", function () {
    gameOver = true;
    document.getElementById("answer").innerText = word;
  });
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

  //create the keyboard
  let keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
  ]

  for (let i = 0; i < keyboard.length; i++) { //3 
    let currRow = keyboard[i]; // take the first row from the keyboard
    let keyboardRow = document.createElement("div"); //create the row 
    keyboardRow.classList.add("keyboard-row"); // add the style in css

    for (let j = 0; j < currRow.length; j++) {
      let keyTile = document.createElement("div");

      let key = currRow[j]; // the letters inside the row
      keyTile.innerText = key;
      if (key == "Enter") {
        keyTile.id = "Enter";
      }
      else if (key == "⌫") {
        keyTile.id = "Backspace";
      }
      else if ("A" <= key && key <= 'Z') {
        keyTile.id = "Key" + key; // "Key"+"A"
      }

      keyTile.addEventListener("click", processKey);

      if (key == "Enter" || key == "⌫") {
        keyTile.classList.add("key-enter");
      }
      else {
        keyTile.classList.add("key-tile");
      }

      keyboardRow.appendChild(keyTile);

    }
    document.getElementById("keyboard").appendChild(keyboardRow);
  }

  function processKey() {
    let e = { "code": this.id };
    processInput(e);
  }

  //listen for key press
  document.addEventListener("keyup", (e) => {
    processInput(e);
  })

  function processInput(e) { // we made a function because we used it twice
    if (gameOver) return;

    // alert(e.code); //will tell us what key was pressed
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < width) {
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        if (currTile.innerText == "") {
          currTile.innerText = e.code[3];
          inp += e.code[3];
          col += 1;
        }
      }
    }
    else if (e.code == "Backspace") {
      if (0 < col && col <= width) {  //0 - 4 
        col -= 1;
        inp = inp.slice(0, -1); // Remove the last character from inp 
        // (instead of converting it to array of char and then back to string)
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
      inp = "";
    }

    if (!gameOver && row == height) {
      gameOver = true;
      document.getElementById("answer").innerText = word;
    }
  }


  function update() {
    let correct = 0;
    let word = fiveLetterWords[randomIndex];
    // let word = "HOUSE";
    var flag = false; // Added to track if the letter is found in the word

    for (let c = 0; c < width; c++) {

      let currTile = document.getElementById(row.toString() + '-' + c.toString());
      let letter = currTile.innerText;
      // Is the letter entered by the user in the correct position?
      if (word[c] == letter) {
        currTile.classList.add("correct");

        let keyTile = document.getElementById("Key" + letter);
        keyTile.classList.remove("present");
        keyTile.classList.add("correct");

        correct += 1;
        word = word.split('');
        word[c] = 'x';
        word = word.join('');
        // alert(word);
      }

      // check if the letter is in the word 
      //              and
      // if he entered the right position and the wrong at the same time
      else if (word[c] != letter && word.includes(letter)) {
        flag = false;
        for (let m = c + 1; m <= width; m++) { // 1 -- 4
          if (letter == inp[m]) {  // 2
            flag = true;
            currTile.classList.add("absent");
          }
        }
        if ((c == 0 || c == 4) || (inp.includes(letter))) {
          currTile.classList.add("present");
          if (!currTile.classList.contains("correct")) {
            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.add("present");
          }

        }
      }

      // check if the letter is in the word
      //  else if (word.includes(letter) && flag) {
      //     currTile.classList.add("present");
      //     word = word.split('');
      //     const index = word.indexOf(letter);
      //     word[index] = 'x';
      //     word = word.join(''); 
      //      //     alert(word);
      //   }

      // // the letter is not found
      else {
        currTile.classList.add("absent");
      }
      // Check if the entered word is valid
      if (correct == width) {
        gameOver = true;
        alert("Congratulations! You guessed the word.");
      }
      // else {
      //   // User entered an incorrect word
      //   alert("Sorry, that's not the correct word.");
      // }
    }
  }
}