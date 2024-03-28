//get words
let letters = ['A', 'C', 'D', 'E', 'F', 'G', 'H']; //where first index is the required letter
let wordsPossible = [];
let wordsGotten = [];
let displayedInput = document.getElementById('guess').innerHTML;
let form = document.getElementById("spellingBee");
let result = document.getElementById("result");
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
                fetch(`https://raw.githubusercontent.com/IohannesArnold/lewis-short-json/master/ls_${word[0]}.json`)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error
                                (`HTTP error! Status: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then((data) => 
                        console.log(data))
                    .catch((error) => 
                        console.error("Unable to fetch data:", error));
            }
        }
    } else {
        //Invalid input
        result.innerHTML = "non est verbum!"
    }
}