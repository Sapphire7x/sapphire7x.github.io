//get words
let letters = ['A', 'C', 'D', 'E', 'F', 'G', 'H']; //where first index is the required letter
let wordsPossible = []; //lowercase
let wordsGotten = []; //uppercase
let displayedInput = document.getElementById('guess').innerHTML;
let form = document.getElementById("spellingBee");
let result = document.getElementById("result");

async function processFile(file) {
    let text = (await fetch(file)).text();
    let possible = (await text).split("\n")
    possible.forEach(line => processLine(line));
}
function processLine(line) {
  let good = true;
  for(letter of line) {
    if(letters.indexOf(letter) < 0) {
      good = false;
    }
  }
  if(line.indexOf(letters[0]) < 0) {
    good = false;
  }
  if(good) {
    wordsPossible.push(word);
    console.log(wordsPossible);
  }
}

processFile('realLatin.txt')


form.addEventListener("submit", checkWord)
function checkWord(event) {
    event.preventDefault();
    let word = form.word.value;
    let regex = /^[a-zA-Z]+$/;
    if(regex.test(word)) {
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
                if(wordsPossible.indexOf(word.toLowerCase()) < 0) {
                    result.innerHTML = "non est verbum!";
                    console.log(wordsPossible);
                } else {
                    result.innerHTML = "sic! verbum est!";
                    wordsGotten.push(word);
                }
                /*fetch(`realLatin.txt`)
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