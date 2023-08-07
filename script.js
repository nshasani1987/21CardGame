
const backgroundImage = ["images/happy.webp", "images/sad.webp", "images/happy2.webp"]
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let chips = getRandomChips()
let currentPlayer = "user"
const userScore = document.getElementById("user-score")
const opponentScore = document.getElementById("opponent-score")
const messageEL= document.getElementById("message-el")
const cardsEL = document.getElementById("cards-el")
const startBtn = document.getElementById("start-btn")
const cardBtn = document.getElementById("card-btn")
const sumEl = document.getElementById("sum-el")
const contianer = document.getElementById("contianer")
const headEl = document.getElementById("head-el")
const enoughCardBtn = document.getElementById("enoughCard-btn")
const winnerBtn = document.getElementById("winner-btn")
const playerName = document.getElementById("user-name")
const playerChips = document.getElementById("user-chips")
const userSubmitBtn = document.getElementById("user-btn")
const user = document.getElementById("user")
const opponentName = document.getElementById("opponent-name")
const opponentChips = document.getElementById("opponent-chips")
const opponentSubmitBtn = document.getElementById("opponent-btn")
const opponent = document.getElementById("opponent")
const body = document.querySelector("body")
const help = document.getElementById("help")
let playerCost = chips
let opponentCost = chips
let userScoreValue = 0
let opponentScoreValue = 0



help.addEventListener("click" , function howToPlay(){
    window.open("help-index.html" , "popup" , "width = 500, height = 300, top = 100, left = 100")
})



userSubmitBtn.addEventListener("click" ,  function userSubmitButton(){
    if (playerName.value !== "" && chips > 0) {
        
        startBtn.disabled = false
        playerChips.textContent= `${playerName.value} : $${chips}`
        user.textContent = playerChips.textContent
        playerName.value = playerName.value.trim()
        
    } else {
        alert("please enter your name")
        startBtn.disabled = true
        
    }
})
opponentSubmitBtn.addEventListener("click", function opponentSubmitButton(){
   
    if (opponentName.value !== ""  &&  chips > 0) {
        startBtn.disabled = false
        opponentChips.textContent= `${opponentName.value} : $${chips}`
        opponent.textContent = opponentChips.textContent
        opponentName.value = opponentName.value.trim()
        
        
    } else {
        alert("please enter your name")
        startBtn.disabled = true
    }
})


startBtn.addEventListener("click", function startGame(){
    if(playerCost === 0 || opponentCost === 0){
        startBtn.disabled = true
    }else{
        if (playerName.value === "" || opponentName.value === "") {
            startBtn.disabled = true
            alert ("please enter your name")
            
        } else {
                isAlive = true
                let firstCard = getRandomCard()
                let secondCard = getRandomCard()
                cards = [firstCard , secondCard]
                sum = firstCard + secondCard
                headEl.style.color = `goldenrod`
                messageEL.style.color = `white`
                startBtn.disabled = false
                enoughCardBtn.disabled = false
                renderGame()
                changeBackground()
        }
    }
     
    })

cardBtn.addEventListener("click",function newCard(){


    if(isAlive === true){
        let card = getRandomCard()
        cards.push(card)
        sum += card
        renderGame()
        changeBackground()   
    }  
    
})
enoughCardBtn.addEventListener("click", function enoughCard(){
    if (currentPlayer === "user") {
        playerChips.textContent = `${playerName.value}: $${playerCost}`
        userScore.textContent = "sum: " + sum
        userScoreValue += sum
        user.innerHTML =` ${playerChips.textContent} 
        ${ userScore.textContent}`
        currentPlayer = "opponent"
        
    } else {
        opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
        opponentScore.textContent = "sum: " + sum
        opponentScoreValue += sum
        opponent.innerHTML = `${opponentChips.textContent}
        ${opponentScore.textContent}`
        currentPlayer = "user"

    }    
                
                
                sum = 0
                cards = []
                messageEL.textContent = "Want to play a round?"
                cardsEL.textContent = "cards: "
                sumEl.textContent ="sum: "
                headEl.style.color = `goldenrod`
                messageEL.style.color = `white`
    

    
})

winnerBtn.addEventListener("click", function defineWinner(){
        
    if (userScoreValue !== 0 && opponentScoreValue !== 0 && userScoreValue <= 20 && opponentScoreValue <= 20){
        if (userScoreValue > opponentScoreValue) {
                alert (`${playerName.value} win`)
                playerCost += 20
                playerChips.textContent = `${playerName.value}: $${playerCost}`
                opponentCost -=  20
                opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
                user.innerHTML =` ${playerChips.textContent}`
                opponent.innerHTML = `${opponentChips.textContent}`
                userScoreValue = 0
                opponentScoreValue = 0
                currentPlayer = "user"
                alert(`${playerName.value} get start`)
                    
        } else if(userScoreValue === opponentScoreValue){
            alert("It's tied, play again")
            playerChips.textContent = `${playerName.value}: $${playerCost}`
            opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
            user.innerHTML =` ${playerChips.textContent}`
            opponent.innerHTML = `${opponentChips.textContent}`
            userScoreValue = 0
            opponentScoreValue = 0
            currentPlayer = "user"

        }else{
                alert(`${opponentName.value} win`)
                opponentCost += 20
                opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
                playerCost -=  20
                playerChips.textContent = `${playerName.value}: $${playerCost}`
                user.innerHTML =` ${playerChips.textContent}`
                opponent.innerHTML = `${opponentChips.textContent}`
                userScoreValue = 0
                opponentScoreValue = 0
                currentPlayer = "opponent"
                alert(`${opponentName.value} get start`)
               
             
                    }
                }      
                sum = 0
                cards = []
                messageEL.textContent = "Want to play a round?"
                cardsEL.textContent = "cards: "
                sumEl.textContent ="sum: "
                headEl.style.color = `goldenrod`
                messageEL.style.color = `white`
                win()
                changeBackground()
    
})


function getRandomChips(){
    let randomChips = Math.floor((Math.random()* 100) +120)
    if (randomChips<120) {
        return 100
        
    } else if (randomChips<140) {
        return 120
    }else if (randomChips<160) {
        return 140
        
    }else if (randomChips<180){
        return 160
        
    }else if (randomChips<200) {
        return 180
    }else {
        return 200
    }

    return randomChips  
   
    }


function changeBackground(){
        
        if (sum === 21) {
            body.style.backgroundImage = `url(${backgroundImage[0]})`
            headEl.style.color = ` red `
            messageEL.style.color = ` red `
           
            }else if(sum> 21){
                body.style.backgroundImage = `url(${backgroundImage[1]})`
                

            }else{
                body.style.backgroundImage = `url("images/green back.avif")`
            }
        if(playerCost === 0 || opponentCost === 0){
            body.style.backgroundImage = `url(${backgroundImage[2]})`
        }
}
function getRandomCard(){
    let randomNumber = Math.floor( Math.random() * 13 ) + 1
      if (randomNumber> 10) {
         return 10
        
      } else if (randomNumber === 1) {
        return 11
        
      }else {
        return randomNumber

      }
        
    }

function renderGame(){
    
    cardsEL.textContent = "cards: " 
    for (let i = 0; i < cards.length; i++) {
        cardsEL.textContent += cards[i] + " "
        
    }
    sumEl.textContent = "sum: " + sum
       if(sum <= 20){
            message = "do you want draw a new card?"
                

            }else if(sum === 21){
                message = "You've got 21 !"
                     if (currentPlayer === "user") {
                        alert(`${playerName.value} win`)
                        playerCost += 20
                        playerChips.textContent = `${playerName.value}: $${playerCost}`
                        opponentCost -= 20
                        opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
                        user.textContent = playerChips.textContent
                        opponent.textContent = opponentChips.textContent
                        userScoreValue = 0
                        opponentScoreValue = 0
                        alert(`${playerName.value} get start`)

                            
                    } else {
                        alert(`${opponentName.value} win`)
                        playerCost -=  20
                        playerChips.textContent = `${playerName.value}: $${playerCost}`
                        opponentCost += 20
                        opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
                        opponent.textContent = opponentChips.textContent
                        user.textContent = playerChips.textContent
                        userScoreValue = 0
                        opponentScoreValue = 0
                        currentPlayer = "opponent"
                        alert(`${opponentName.value} get start`)

                  }
                
                
            }else{
                message = "You're out of the game!"
                if (currentPlayer === "user") {
                    alert (`${opponentName.value} win`)
                    playerCost -=  20
                    playerChips.textContent = `${playerName.value}: $${playerCost}`
                    opponentCost += 20
                    opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
                    opponent.textContent = opponentChips.textContent
                    user.textContent = playerChips.textContent
                    userScoreValue = 0
                    opponentScoreValue = 0
                    currentPlayer = "opponent"
                    alert(`${opponentName.value} get start`)

                    
                } else {
                    alert (`${playerName.value} win`)
                    playerCost += 20
                    playerChips.textContent = `${playerName.value}: $${playerCost}`
                    opponentCost -=  20
                    opponentChips.textContent = `${opponentName.value}: $${opponentCost}`
                    user.textContent = playerChips.textContent
                    opponent.textContent = opponentChips.textContent
                    userScoreValue = 0
                    opponentScoreValue = 0
                    currentPlayer = "user"
                    alert(`${playerName.value} get start`)

                }
                
                }
                 messageEL.textContent = message
  
}
function win(){
    if(playerCost === 0){
        alert(`${opponentName.value} winner and GAME OVER!`)
        startBtn.disabled = true
        enoughCardBtn.disabled = true
        isAlive = false
    }     
    if(opponentCost === 0){
        alert(`${playerName.value} winner and GAME OVER!`)
        startBtn.disabled = true
        enoughCardBtn.disabled = true
        isAlive = false
    }
}

