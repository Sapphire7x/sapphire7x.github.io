//get words
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']; //where first index is the required letter
let wordsPossible = []; //lowercase
let wordsGotten = []; //lower
let displayedInput = document.getElementById('guess').innerHTML;
let form = document.getElementById("spellingBee");
let result = document.getElementById("result");
let wordBox = document.getElementById("correctWords");
let pangrams = [];
let setUps = [];
let points = 0;
/*async function processFile(file) {
    let text = (await fetch(file)).text();
    let possible = (await text).split("\n")
    console.log(possible);
    possible.forEach(line => processLine(line));
}*/
function randomizeLetters() {
    let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for(i in letters) {
        let j = Math.floor(Math.random() * alphabet.length);
        letters[i] = alphabet[j]
        alphabet.splice(j, 1);
    }
    compileWords();
}
function compileWords() {
    pangrams = [];
    wordsGotten = [];
    wordsPossible = [];
    latinWords.forEach(word => processLine(word));
    if(pangrams.length == 0) {
        //reshuffle
        randomizeLetters();
    } else  { 
        displayLetters();
    }
}
function processLine(line) {
  let good = true;
  //line = line.toUpperCase();
  for(let letter of line) {
    if(letters.indexOf(letter) < 0) {
      good = false;
    }
  }
  if(line.indexOf(letters[0]) < 0) {
    //console.log(line)
    good = false;
  }
  if(good && line.length >= letters.length) {
    if(line.indexOf(letters[1]) >= 0 && line.indexOf(letters[2]) >= 0 && line.indexOf(letters[3]) >= 0 && line.indexOf(letters[4]) >= 0 && line.indexOf(letters[5]) >= 0 && line.indexOf(letters[6]) >= 0) {
        pangrams.push(line);
    }
  }
  if(good && line.length >= 4) {
    wordsPossible.push(line);
    //console.log(wordsPossible);
  }
}

compileWords();

form.addEventListener("submit", checkWord)
function checkWord(event) {
    if(event) event.preventDefault();
    let word = form.word.value;
    let regex = /^[a-zA-Z]+$/;
    if(regex.test(word)) {
        word = word.toLowerCase() //make it lowercase
        //It is a valid string
        if(word.length < 4) { //if too short
            result.innerHTML = "necesse est longior!"
        } else {
            let valid = true;
            for(i of word) {
                if (letters.indexOf(i) < 0) { //if uses illegal letters
                    result.innerHTML = "invalidus!"
                    valid = false;
                }
            }
            if(word.indexOf(letters[0]) < 0) { //if doesn't have required letter
                result.innerHTML = "necesse est habet " + letters[0] + "!";
            } else if(wordsGotten.indexOf(word) >= 0) { //if already guessed
                result.innerHTML = "iterum?";
            } else if(valid) { // if valid
                if(wordsPossible.indexOf(word) < 0) {
                    result.innerHTML = "non est verbum!";
                    //console.log(wordsPossible);
                } else {
                    if(pangrams.indexOf(word) >= 0) result.innerHTML = "sic! pangrammus est!";
                    else result.innerHTML = "sic! verbum est!";
                    wordsGotten.push(word);
                    displayGotten();
                }
                /*fetch(`latin.txt`)
                    .then(res => res.text())
                    .then((data) => {
                        console.log(data);
                        if(data.indexOf(word.toLowerCase()) < 0) {
                            result.innerHTML = "non est verbum!";
                            console.log(word.toLowerCase());
                        } else {
                            result.innerHTML = "sic! verbum est!";
                        }
                    })
                    .catch((error) => 
                        console.error("Unable to fetch data:", error));*/
            }
        }
    } else {
        //Invalid input
        result.innerHTML = "non est verbum!"
    }
    form.word.value = "";
}

function displayGotten() {
    wordsGotten.sort();
    //let boxContent = wordBox.innerHTML;
    //boxContent = "";
    let wordString = "";
    wordsGotten.forEach(word => {
        wordString+= `<span id="${word}"${pangrams.indexOf(word)>=0 ? " class='pangram'" : ""}>${word.toUpperCase()}</span>`
    })
    document.getElementById("correctWords").innerHTML = wordString;
}

function displayLetters() {
    for(i in letters) {
        document.getElementById(`letter${i == 0 ? "Req" : i}`).innerHTML = letters[i].toUpperCase();
        
    }
    document.getElementById('loading').style.display = "none";
    document.getElementById('submit').innerHTML = "Submit!"
    document.getElementById('shuffle').innerHTML = "Shuffle!";
}

function shuffle() {
    for(i in letters) {
        if (i > 0 && i < 6) {
            let newIndex = Math.floor(Math.random() * 6 + 1);
            let temp = letters[i];
            letters[i] = letters[newIndex];
            letters[newIndex] = temp;
        }
    }
    displayLetters();
}



function setLetters(req, first, second, third, fourth, fifth, sixth) {
    letters[0] = req;
    letters[1] = first;
    letters[2] = second;
    letters[3] = third;
    letters[4] = fourth;
    letters[5] = fifth;
    letters[6] = sixth;
    compileWords();
} 

function clickLetter(i) {
    form.word.value += letters[i].toUpperCase();
}