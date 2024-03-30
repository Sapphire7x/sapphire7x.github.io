//get words
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']; //where first index is the required letter
let wordsPossible = []; //lowercase
let wordsGotten = []; //lower
let displayedInput = document.getElementById('guess').innerHTML;
let form = document.getElementById("spellingBee");
let result = document.getElementById("result");

async function processFile(file) {
    let text = (await fetch(file)).text();
    let possible = (await text).split("\n")
    console.log(possible);
    possible.forEach(line => processLine(line));
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
    console.log(line)
    good = false;
  }
  if(good) {
    wordsPossible.push(line);
    console.log(wordsPossible);
  }
}

processFile('https://sapphire7x.github.io/latin.txt')


form.addEventListener("submit", checkWord)
function checkWord(event) {
    event.preventDefault();
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
                    console.log(wordsPossible);
                } else {
                    result.innerHTML = "sic! verbum est!";
                    wordsGotten.push(word);
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
}