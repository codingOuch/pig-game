/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// document.querySelector("#current-" + activePlayer).innerHTML = '<em>' + dice + '</em>';

var scores, roundScore, activePlayer, dice, player, i, win_score;

function btn_set(){
    var input = document.querySelector(".input-set-win-score").value;
    win_score = input;
    console.log(input);
}

function btn_new(){
    win_score = 0;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    i = 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector(".player-0-panel ").classList.add("active");
    document.querySelector(".player-1-panel ").classList.remove("active");
    document.querySelector(".dice").style.display = "none";
    document.querySelector("#name-0").textContent = "PLAYER 1";
    document.querySelector("#name-1").textContent = "PLAYER 2";
}

function winner(){
    if (win_score == 0) {
        window.alert("Please set the final score first!")
    } else {
        document.querySelector(".dice").style.display = "none";
        player = activePlayer + 1;
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        // window.alert("Player "+ player + " is the Winner!");
    }
    
}


function btn_roll_dice(){
    if (scores[activePlayer] < win_score) {
        
        //1. Random number
        dice = Math.ceil(Math.random() * 6);
        // dice = 6;

        //2. Display the result
        document.querySelector("#current-" + activePlayer).innerHTML = '<em>' + dice + '</em>';
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png"

        //3. Update the round score If the rolled number was NOT a 1
        if (dice == 1) {
            // Next Player
            btn_hold();      
        } else if(dice == 100){
            //check the next time
            i += 1;
            if (i==2) {
            // activePlayer lost
                activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
                winner();
            }
        } else {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            i = 0;
        }
    } 
    else {
        winner();
    }
}


function btn_hold(){
    scores[activePlayer] +=roundScore;
    document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    roundScore = 0;
    if (scores[activePlayer] >= win_score) {
        winner();
    } else {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
        document.querySelector(".player-0-panel ").classList.toggle("active");
        document.querySelector(".player-1-panel ").classList.toggle("active");
        document.querySelector(".dice").style.display = "none";  
    }
    

}

btn_new()
document.querySelector(".btn-roll").addEventListener("click", btn_roll_dice);
document.querySelector(".btn-hold").addEventListener("click", btn_hold);
document.querySelector(".btn-new").addEventListener("click",btn_new)
document.querySelector(".btn-set-win-score").addEventListener("click", btn_set);
