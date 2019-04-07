/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// document.querySelector("#current-" + activePlayer).innerHTML = '<em>' + dice + '</em>';

var scores, roundScore, activePlayer, dice, player;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;


function btn_new(){
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector(".player-0-panel ").classList.add("active");
    document.querySelector(".player-1-panel ").classList.remove("active");
    document.querySelector(".dice").style.display = "none";
    
}

function check_winner(){
        //4. Check if the score number bigger than 100
    if (scores[activePlayer] > 100) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        player = activePlayer + 1;
        window.alert("Player "+ player + " is the Winner!");
        document.querySelector(".dice").style.display = "none";
    }
}

function btn_roll_dice(){
    //1. Random number
    dice = Math.ceil(Math.random() * 6);

    //2. Display the result
    document.querySelector("#current-" + activePlayer).innerHTML = '<em>' + dice + '</em>';
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png"

    //3. Update the round score If the rolled number was NOT a 1
    if (dice == 1) {
        // Next Player
        check_winner();
        btn_hold();      
    } else {
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        check_winner();
    }

}


function btn_hold(){
    scores[activePlayer] +=roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    check_winner();
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector(".player-0-panel ").classList.toggle("active");
    document.querySelector(".player-1-panel ").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";  
}

btn_new()
document.querySelector(".btn-roll").addEventListener("click", btn_roll_dice);
document.querySelector(".btn-hold").addEventListener("click", btn_hold);
document.querySelector(".btn-new").addEventListener("click",btn_new)