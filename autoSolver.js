var words = require('an-array-of-english-words')
const answer = 'crank'

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var wrongLetters = []
var correctLetters = []
var containsLetters = []
var guess

var list = words.filter(word => {
    return word.length == 5;
  })

function letterCount(letter, word) {
    var count = 0;
    for (var i = 0; i < word.length; i++) {
      if (word.charAt(i) === letter) {
          count++;
      } 
    }
    return count;
};

function wordleSolver() {
    list = list.filter(word => {
        let includes = false
        for (var i=0; i<wrongLetters.length;i++) {
            if (correctLetters.includes(wrongLetters[i]) == false && containsLetters.includes(wrongLetters[i]) == false) {
                if (word.includes(wrongLetters[i]))  {
                    includes = true
                    break
                }
        }
    }
    if (includes == false) {
        return word
    }
    })

    for (var i=0; i<correctLetters.length;i++) {
        list = list.filter(word => {
            return word.charAt(correctLetters[i][1]) === correctLetters[i][0];
        });
    }

    for (var i=0; i<containsLetters.length;i++) {
        list = list.filter(word => {
            return word.includes(containsLetters[i][0]) && word.indexOf(containsLetters[i][0]) != containsLetters[i][1];
        });
    }

    var tempList = list.filter(word => {
        var letterRepeat = false
        for (var i=0; i<alphabet.length; i++) {
            if (letterCount(alphabet[i], word) > 1) {
                letterRepeat = true
                break
            }
        }
        if (letterRepeat == false)  {
            return word
        }
    })

    if (tempList.length > 0) {
        return tempList[Math.floor(Math.random()*tempList.length)]
    } else {
        return list[Math.floor(Math.random()*list.length)]
    }
}

function resultProcessor() {
    wrongLetters = []
    correctLetters = []
    containsLetters = []
    temp = answer.split('')
    guess = guess.split('')

    for (var i=0; i<temp.length; i++) {
        if (temp.includes(guess[i]) == false) {
            wrongLetters.push(guess[i])
        } else if (temp[i] == guess[i]) {
            correctLetters.push([guess[i], i])
        } else {
            containsLetters.push([guess[i], i])
        }
    }
}

for (var i=0; i<6; i++) {
    if (i == 0) {
        guess = 'tares'
        //guess = initialList[Math.floor(Math.random()*initialList.length)]
    } else {
        guess = wordleSolver()
    }
    console.log(guess)
    console.log(list)
    if (guess == answer) {
        break
    }
    resultProcessor()
}

console.log(i+1)