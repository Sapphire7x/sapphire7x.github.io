let input;
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
        if(word.length < 4) {
            result.innerHTML = "necesse est longior!"
        } else {
            //if in latin
        }
    } else {
        //Invalid input
        result.innerHTML = "non est verbum!"
    }
}