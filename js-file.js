let player1;
let player2;

//player factory
const createPlayer = (playerName, marks, turns) => {
    playerName = playerName;
    marks = marks;
    turns = turns;
    return {playerName, marks, turns}
}

//Start page module
const startPage = (() => {
    const playerOneName = document.querySelector("#playerOneName");
    const playerTwoName = document.querySelector("#playerTwoName");
    const btnStart = document.querySelector("#startButton");
    const startPageContainer = document.querySelector(".start-page-container");
    const gameBoardContainer = document.querySelector(".game-board-container");

    const startGame = () => {
        player1 = createPlayer(playerOneName.value, "X", true);
        player2 = createPlayer(playerTwoName.value, "O", false);
        startPageContainer.classList.add("inactive");
        gameBoardContainer.classList.remove("inactive");
        console.log(playerOneName);
    }

    btnStart.addEventListener("click", startGame);

})();

// Game broad module
const gameBoard = (() => {
    let board = [];
    const winCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const start = () => {
        for (i=0; i<9; i++) {
            board.push("");
        }
        console.log(board);
    }
    const render = () => {
        const container = document.querySelector(".game-board");
        container.innerHTML = "";
        for (i=0; i<board.length; i++) {
            const gameBoard = document.querySelector(".game-board");
            const div = document.createElement("div");

            div.textContent = board[i];
            div.style.fontSize = "40px";
            div.setAttribute("id", i);
            div.classList.add("square");
            div.classList.add("square:hover");
            div.addEventListener("click", move);
            gameBoard.appendChild(div);
        }
    }

    const move = (e) => {
        if (board[e.target.getAttribute("id")] == ""){
            if (player1.turns) {
                board[e.target.getAttribute("id")] = player1.marks;
                player1.turns = false;
                player2.turns = true;
            } else if (player2.turns) {
                board[e.target.getAttribute("id")] = player2.marks;
                player2.turns = false;
                player1.turns = true;
            }
            render();
            checkWin();
        }
    }

    const checkWin = () => {
        for (i=0; i<winCombo.length; i++) {
            if (board[winCombo[i][0]] == player1.marks && board[winCombo[i][1]] == player1.marks && board[winCombo[i][2]] == player1.marks) {
                console.log(`${player1.playerName} Win!`);
            } else if (board[winCombo[i][0]] == player2.marks && board[winCombo[i][1]] == player2.marks && board[winCombo[i][2]] == player2.marks) {
                console.log(`${player2.playerName} Win!`);
            }
        }
    }

    //restart button
    const restart = () => {
        const startPageContainer = document.querySelector(".start-page-container");
        const gameBoardContainer = document.querySelector(".game-board-container");
        const playerOneName = document.querySelector("#playerOneName");
        const playerTwoName = document.querySelector("#playerTwoName");

        startPageContainer.classList.remove("inactive");
        gameBoardContainer.classList.add("inactive");
        board.length = 0;
        start();
        render();
        console.log(player1.playerName, player2.playerName);
        playerOneName.value = "";
        playerTwoName.value = "";
    }

    const btnRestart = document.querySelector("#reStartButton");
    btnRestart.addEventListener("click", restart);



    return {start, render};
})();

gameBoard.start();
gameBoard.render();