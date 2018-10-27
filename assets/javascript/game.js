
var guess = document.getElementById("guesses"); //Variable to store span element with number of guesses
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //Complete alphabet
var keyPressed;
var score = parseInt(document.getElementById("score").innerText);
var word = document.getElementById("word"); //Variable to store span element of list of letters from chosen word
var words = ["Lion", "Bear", "Dog", "Cat", "Pig", "Zebra", "Whale", "Dolphin", "Horse", "Rhinoceros", "Elephant", "Snake", "Monkey", "Raccoon", "Squirrel"] //Array of options to choose for the game
var imgs = [
    "assets/images/lion.jpg",
    "assets/images/bear.jpg",
    "assets/images/dog.jpg",
    "assets/images/cat.jpg",
    "assets/images/pig.jpg",
    "assets/images/zebra.jpg",
    "assets/images/whale.jpg",
    "assets/images/dolphin.jpg",
    "assets/images/horse.jpg",
    "assets/images/rhino.jpg",
    "assets/images/elephant.jpg",
    "assets/images/snake.jpg",
    "assets/images/monkey.jpeg",
    "assets/images/raccoon.jpg",
    "assets/images/squirrel.png"
];

var sounds = [
    "assets/sounds/lion.mp3",
    "assets/sounds/bear.mp3",
    "assets/sounds/dog.mp3",
    "assets/sounds/cat.wav",
    "assets/sounds/pig.mp3",
    "assets/sounds/zebra.mp3",
    "assets/sounds/whale.mp3",
    "assets/sounds/dolphin.mp3",
    "assets/sounds/horse.wav",
    "assets/sounds/rhino.mp3",
    "assets/sounds/elephant.mp3",
    "assets/sounds/snake.mp3",
    "assets/sounds/monkey.wav",
    "assets/sounds/raccoon.mp3",
    "assets/sounds/squirrel.mp3"
];

var clues = [
    "The king of the jungle.",
    "They usually eat salmon and are big and furry.",
    "Man's best friend.",
    "They would love to rule over mankind.",
    "They love rolling around on mud.",
    "Black and white horses.",
    "Dory can speak to them.",
    "Cutest mammals in the ocean.",
    "Used for races and riding.",
    "Sadly, they are critically endangered because of the value of their horn.",
    "They have really good memory.",
    "SSSZZZSSZZSSZZSSS...",
    "OOH, AH, AH, AH!",
    "The burglars of the animal kingdom.",
    "They looove acorns."
];


var audio = new Audio('');
var letterList; // Variable to store letters already guessed displayed on screen as a string
var letterArray = []; //Array of letters already guessed
var tmp = 0; //temporal variable
var n; //Variable to store number of guesses remaining
var random = Math.floor(Math.random() * words.length);
var wordChosen = words[random]; //Word chosen randomly from previous array
var noSpaces;

wordChosen = wordChosen.toLowerCase(); //turns all letters to lowercase for easier comparison
noSpaces = wordChosen.split(" ").join("");

n = noSpaces.length + 3; //number of guesses in total
guess.innerText = n; //displays total number of guesses

setTimeout(function(){
    $('.safari').addClass('load');
  },500);

writeBlanks();

var clue = clues[random];

$(".clue").text(clue);



$(".button-clue").click(function() {
    $(".clue").css('opacity','1');
})


//On key press...
document.onkeyup = function (event) {
    keyPressed = event.key; //stores key pressed

    //if the letter has not been pressed before and it is a key included in the alphabet:
    if (!letterArray.includes(keyPressed) && alphabet.includes(keyPressed)) {
        letterArray.push(keyPressed); //key pressed is pushed into array
        display();
        n--;

        if (noSpaces.indexOf(keyPressed) != -1) {
            n++;
        }

        if (n >= 0) {
            guess.innerText = n;
            if (tmp === noSpaces.length) {
                score++;
                document.getElementById("score").classList.remove("slam");

                void document.getElementById("score").offsetWidth;
                document.getElementById("score").classList.add("slam");
                document.getElementById("score").innerText = score;
                update();
            }
            else if (n === 0 && tmp != noSpaces.length) {
                displayAll();
                setTimeout(function () {
                    update();
                }, 500);
            }

        }
    }



    //adds letters of array into string and displays them in guessed letters
    letterList = letterArray.join(", ");
    document.getElementById("letters").innerText = letterList;

}


function update() {

    letterList; // Variable to store letters already guessed displayed on screen as a string
    letterArray = []; //Array of letters already guessed
    tmp = 0; //temporal variable
    n; //Variable to store number of guesses remaining
    
    audio.pause();

    $("#animal-image").attr("src", imgs[random]);

    audio = new Audio(sounds[random]);
    audio.play();

    $(".clue").css('opacity','0');

    while (word.firstChild) {
        word.removeChild(word.firstChild);
    }
    random = Math.floor(Math.random() * words.length);
    wordChosen = words[random]; //Word chosen randomly from previous array
    noSpaces;
    wordChosen = wordChosen.toLowerCase(); //turns all letters to lowercase for easier comparison
    noSpaces = wordChosen.split(" ").join("");

    n = noSpaces.length + 3; //number of guesses in total
    guess.innerText = n; //displays total number of guesses

    document.getElementById("letters").innerText = '';

    clue = clues[random];

    $(".clue").text(clue);


    writeBlanks();
}

function writeBlanks() {

    //Creates a line for each letter in the word chosen, considering spaces
    for (var i = 0; i < wordChosen.length; i++) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode("_");
        if (wordChosen[i] === " ") {
            textnode = document.createTextNode(" ");
        }
        node.appendChild(textnode);
        word.appendChild(node);
    }
}

//displays all letters of the chosen word guessed correctly
function display() {
    for (var j = 0; j < wordChosen.length; j++) {
        if (keyPressed === wordChosen[j]) {
            word.children[j].innerText = wordChosen[j];
            tmp++;
        }
    }
}

function displayAll() {
    for (var k = 0; k < wordChosen.length; k++) {
        word.children[k].innerText = wordChosen[k];
    }
}
