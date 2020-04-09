// hangman constructor

const Hangman = function(word, attemps, song, image,mp3){
    this.word = word.toUpperCase().split('')
    this.attemps = attemps
    this.song = song
    this.guessedLetters = []
    this.status = 'playing'
    this.image = image
    this.mp3 = mp3
    this.wins = []
}

const winTotal = []




//main functions

Hangman.prototype.calculateStatus = function () {
    const lettersUnguessed = this.word.filter((letter) => {
        return !this.guessedLetters.includes(letter)
    })
    
    const finished = lettersUnguessed.length === 0

    if (this.attemps === 0) {
        this.status = 'failed'
    } else if (finished) {
        this.status = 'finished'
    } else {
        this.status = 'playing'
    }

}
Hangman.prototype.getStatusMessage = function(){
    if(this.status === 'playing'){
        return `Guesses left ${this.attemps}`
    } else if(this.status === 'failed') {
        return `Nice try! The country was "${this.word.join('')}" and you had ${winTotal.length} wins.`
    } else {
        playingGame = gameShuffle[getRandomInt(gameShuffle.length)]
        img.src = playingGame.image
        mp3.src = playingGame.mp3
        winTotal.push('1')
        return `#WINS: ${winTotal.length}`
    }
}
Hangman.prototype.getPuzzle = function(guessedLetter){
    let puzzle = ''

    this.guessedLetters.push(guessedLetter)

    this.word.forEach((letter) => {
        if (this.guessedLetters.includes(letter)){
            puzzle = puzzle + letter
        } else {
            puzzle = puzzle + '-'
        }
    });

    return puzzle 
}
Hangman.prototype.makeGuess = function(guess){
    guess = guess.toUpperCase()

    const isUnqiue = !this.guessedLetters.includes(guess)
    const isBadGuess = !this.word.includes(guess)
    
    if(this.status !== 'playing') {
        return
    }

    if (isUnqiue){
        this.guessedLetters.push(guess)
    }

    if (isUnqiue && isBadGuess) {
        this.attemps = this.attemps - 1
    }

    this.calculateStatus()
}






// Word Bank

const game0 = new Hangman('USA', 3, 'Good News',"./assets/images/miller.png","./assets/images/miller.mp3")
const game1 = new Hangman('Colombia', 3, 'Yo Soy',"./assets/images/estereo.jpg","./assets/images/estereo.mp3")
const game2 = new Hangman('USA', 3, 'Freelance',"./assets/images/toro.jpg","./assets/images/toro.mp3")
const game3 = new Hangman('Canada',3 , 'Salad Days',"./assets/images/demarco.jpg","./assets/images/demarco.mp3")
const game4 = new Hangman('Italy', 3, 'Bando',"./assets/images/ANNA.jpg","./assets/images/bando.mp3")
const game5 = new Hangman('Japan',3,"Don't Know What's Normal","./assets/images/Sakamoto1.jpg","./assets/images/sakamoto.mp3")
const game6 = new Hangman('Iceland',3,'Hoppipolla',"./assets/images/sigur1.jpg","./assets/images/sigur.mp3")
const game7 = new Hangman('Australia',3,'Down Under',"./assets/images/men-at-work1.jpg","./assets/images/men-at-work.mp3")
const game8 = new Hangman('Germany',3,'Computer Love',"./assets/images/kraftwerk.jpg","./assets/images/kraftwerk.mp3")
const game9 = new Hangman('Germany', 3, 'Ahnma',"./assets/images/beginner1.jpg","./assets/images/beginner.mp3")
const game10 = new Hangman('Cambodia',3,'Mou Pei Na',"./assets/images/sinn1.jpg","./assets/images/sinn.mp3")
const game11 = new Hangman('Sweden',3,'Dancing Queen',"./assets/images/abba.png","./assets/images/abba.mp3")
const game12 = new Hangman('Sweden',3,'Amersterdam',"./assets/images/peter.jpg","./assets/images/peter.mp3")
const game13 = new Hangman('Norway',3,'Misread',"./assets/images/kings.jpg","./assets/images/kings.mp3")
const game14 = new Hangman('Nigeria',3,"Don't Jealous Me","./assets/images/tekno.jpg","./assets/images/tekno.mp3")
const game15 = new Hangman('Nigeria',3,'Dumebi',"./assets/images/rema.jpg","./assets/images/rema.mp3")
const game16 = new Hangman('Egypt',3,'Ayonha',"./assets/images/hamid.jpg","./assets/images/hamid.mp3")
const game17 = new Hangman('India',3,'Genda Phool',"./assets/images/badshah1.jpg","./assets/images/india.mp3")
const game18 = new Hangman('Jamacia',3,'Could You Be Loved',"./assets/images/marley.jpg","./assets/images/marley.mp3")
const game19 = new Hangman('Ethiopia',3,'Wede Harer Guzo',"./assets/images/wede.jpg","./assets/images/wede.mp3")

// random generator
const gameShuffle = [
    game0, game1, game2, game3, game4, game5, game6, game7, game8, game9, game10, game11, game12, game13, game14, game15, game16, game17, game18, game19
]

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
let playingGame = gameShuffle[getRandomInt(gameShuffle.length)] 




//connectors
const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
const guessedLetterEl = document.querySelector('#guessed-letters')
const img = document.querySelector('#img')
const mp3 = document.querySelector('#mp3')
const winEl = document.querySelector('#wins')

puzzleEl.textContent = playingGame.getPuzzle()
guessesEl.textContent = playingGame.getStatusMessage()
guessedLetterEl.textContent = playingGame.guessedLetters.join('')
img.src = playingGame.image
mp3.src = playingGame.mp3








//events
document.querySelector('#play-button').addEventListener('click', function() {
    document.querySelector('#play-button').remove()
    mp3.src = playingGame.mp3
}) 
window.addEventListener('keypress', function(e){
    const guess = String.fromCharCode(e.charCode)
    playingGame.makeGuess(guess)
    puzzleEl.textContent = playingGame.getPuzzle()
    guessesEl.textContent = playingGame.getStatusMessage()
    guessedLetterEl.textContent = playingGame.guessedLetters.join('')
})

