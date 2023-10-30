// Select the cursor element, all holes, and the score span element
const cursor = document.querySelector('.cursor');
const board = document.querySelector('.board');
const instructions = document.querySelector('.instructions');
const difficulty = document.querySelector('.difficulty-button-container');
const scoreDisplay = document.querySelector('.score');



const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');

// Initialize the score variable
let score = 0;
let gameEnded = false;

// Function to end the game
function endGame(message) {
    if (!gameEnded) {
        gameEnded = true;
        // Hide the cursor, board, instructions, difficulty, and score 
        cursor.style.display = 'none';
        board.style.display = 'none';
        instructions.style.display = 'none';
        difficulty.style.display = 'none';
        scoreDisplay.style.display = 'none';


        // Display an end message
        const endScreen = document.createElement('div');
        endScreen.classList.add('end-screen');
        endScreen.innerHTML = `
            <div class="end-message" style="text-align: center;">
                <h1 style="font-size: 5rem">${message}</h1>
                <button class="reset-button">Play Again</button>
            </div>
        `;
        document.body.appendChild(endScreen);

        // Add a click event listener to the reset button
        const resetButton = document.querySelector('.reset-button');
        resetButton.addEventListener('click', () => {
            // Reload the page to restart the game
            location.reload();
        });
    }
}

// Function to handle the player clicking on a bomb
function handleBombClick() {
    if (!gameEnded) {
        endGame('You Lost!');
    }
}

// Function to run the game
// Function to run the game
let isRunning = false; // Flag to check if the game is already running

// Function to run the game
function run() {
    if (gameEnded) {
        return;
    }

    if (isRunning) {
        // If the game is already running, don't start a new game loop
        return;
    }

    isRunning = true; // Set the running flag to true

    // Generate a random index to select a hole
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];

    // Determine if it's a bomb or kiwi
    const isBomb = Math.random() < 0.3; // 35% chance for a bomb

    // Create an image element
    const img = document.createElement('img');
    img.classList.add(isBomb ? 'bomb' : 'kiwi');
    img.src = isBomb ? 'assets/bomb.png' : 'assets/kiwi.png'; // Set the src attribute
    img.alt = isBomb ? 'Bomb' : 'Kiwi';

    // Prevent the image from being dragged
    img.draggable = false;

    if (!isBomb) {
        // Add a click event listener for the kiwi
        img.addEventListener('click', () => {
            if (hole.contains(img)) {
                score += 1;
                scoreEl.textContent = score;
                if (score === 10) {
                    endGame('You Won!');
                }
                img.src = 'assets/kiwi-whacked.png';
                setTimeout(() => {
                    if (hole.contains(img)) {
                        hole.removeChild(img);
                        isRunning = false; // Set the running flag to false after handling the click
                        if (score < 10) {
                            run();
                        }
                    }
                }, 50);
            }
        });
    } else {
        img.addEventListener('click', handleBombClick);
    }

    hole.appendChild(img);

    setTimeout(() => {
        if (hole.contains(img)) {
            hole.removeChild(img);
            isRunning = false; // Set the running flag to false when the game loop is complete
            if (score < 10) {
                run();
            }
        }
    }, 900);
}









// Call the `run` function to start the game
run();

// Add a mousemove event listener to update the cursor position
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

// Add a mousedown event listener to activate the cursor
window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

// Add a mouseup event listener to deactivate the cursor
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

// Function to reset the game

function resetGame() {
    score = 0;
    gameEnded = false;
    scoreEl.textContent = score;

    // Clear the holes by removing all child elements from each hole
    holes.forEach((hole) => {
        while (hole.firstChild) {
            hole.removeChild(hole.firstChild);
        }
    });

    run();
}
