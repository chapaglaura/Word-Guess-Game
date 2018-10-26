
var guess = document.getElementById("guesses"); //Variable to store span element with number of guesses
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; //Complete alphabet
var keyPressed;
var score = parseInt(document.getElementById("score").innerText);
var word = document.getElementById("word"); //Variable to store span element of list of letters from chosen word
var words = ["Lion", "Rabbit", "Dog", "Cat", "Hamster", "Hummingbird", "Whale", "Dolphin", "Horse", "Rhinoceros", "Elephant", "Giraffe", "Orangutan", "Koala", "Squirrel"] //Array of options to choose for the game
var imgs = ["https://animals.sandiegozoo.org/sites/default/files/2016-09/animals_hero_lions_0.jpg", "https://t2.ea.ltmcdn.com/es/images/0/7/1/img_cuidados_del_conejo_3170_600.jpg", "https://cms.chewy.com/cms/spots/product-brand/img/royal-canin-miniatureschnauzerpuppy-main.jpg", "http://www.southerntraditionalsiamese.com/images/kitten_dec12d.jpg", "https://i.ytimg.com/vi/RMo8jl9s_OA/hqdefault.jpg", "https://es.calcuworld.com/wp-content/uploads/sites/2/2018/04/cuantos-anos-vivie-colibri.jpg", "https://ichef.bbci.co.uk/news/660/cpsprodpb/2A3F/production/_95151801_mediaitem95151800.jpg", "https://www.anipedia.net/imagenes/taxonomia-delfines.jpg", "https://quecome.org/wp-content/uploads/2016/09/que-come-caballo.jpg", "https://zoonooz.sandiegozoo.org/wp-content/uploads/2015/10/22229287295_7f62718aaf_o-860x450.jpg", "http://en.bcdn.biz/Images/2016/11/8/ac09e598-3f9b-4c64-a8bf-aa5d4105ef4b.jpg", "https://cumbrepuebloscop20.org/wp-content/uploads/2018/09/jirafa.jpg", "http://awsassets.wwf.es/img/orangutan_crias_87022.jpg", "https://www.cambio16.com/wp-content/uploads/2018/05/koala.jpg", "http://www.estudiantes.info/ciencias_naturales/images/ardilla-marron.png"];

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

writeBlanks();

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

    $("#animal-image").css('opacity', '0');
    $("#animal-image").css('opacity', '1');
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

    $("#animal-image").attr("src", imgs[random]);

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
