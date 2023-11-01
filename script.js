// Select elements from the DOM
const cursor = document.querySelector('.cursor'); // Select the cursor element
const board = document.querySelector('.board'); // Select the board element
const instructions = document.querySelector('.instructions'); // Select the instructions element
const difficulty = document.querySelector('.difficulty-button-container'); // Select the difficulty button container
const scoreDisplay = document.querySelector('.score'); // Select the score display element
const timer = document.querySelector('.timer'); // Select the timer element
const difficultyButton = document.querySelector('.difficulty-button'); // Select the difficulty button

let kiwiSpeed = 1200; // Initial kiwi movement speed

// Create an array of holes by selecting all elements with the class 'hole'
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span'); // Select the score span element

// Select the "Start Game" button and other elements
const startButton = document.getElementById('start-button');
const startScreen = document.querySelector('.start-screen');
const gameElements = document.querySelector('.game-elements');
const boardShow = document.querySelector('.board');
const timerShow = document.querySelector('.timerShow');
const textDifficulty = document.querySelector('.text-difficulty');
const difficultyIndicator = document.querySelector('.difficulty-indicator');

let selectedDifficulty = ''; // Initialize the selected difficulty

// Add a click event listener to the "Start Game" button
startButton.addEventListener('click', () => {
    // Hide elements and start the game
    startScreen.style.display = 'none';
    gameElements.style.display = 'inline-block';
    boardShow.style.display = 'grid';
    timerShow.style.display = 'inline-block';
    textDifficulty.style.display = 'none';
    instructions.style.display = 'none';
    difficultyButton.style.display = 'none';
    difficulty.style.display = 'none';

    // Start the timer
    startTimer();

    // Set the selected difficulty based on the active button
    if (document.querySelector('.easy-button').classList.contains('active')) {
        selectedDifficulty = 'Easy';
    } else if (document.querySelector('.medium-button').classList.contains('active')) {
        selectedDifficulty = 'Medium';
    } else if (document.querySelector('.hard-button').classList.contains('active')) {
        selectedDifficulty = 'Hard';
    }

    // Create and display an element to show the selected difficulty
    const difficultyElement = document.createElement('div');
    difficultyElement.classList.add('difficulty-indicator');
    difficultyElement.textContent = `Difficulty: ${selectedDifficulty}`;
    document.body.appendChild(difficultyElement);
});

// Timer functionality
const timerElement = document.getElementById('timer');
const timeRemainingElement = document.getElementById('time-remaining');
let timeRemaining = 30; // Initial time in seconds

function updateTimer() {
    timeRemaining--;
    timeRemainingElement.textContent = timeRemaining;

    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        endGame('Out of Time!');
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

// Initialize the score variable and gameEnded flag
let score = 0;
let gameEnded = false;

// Function to end the game
function endGame(message) {
    if (!gameEnded) {
        gameEnded = true;

        // Hide elements and clear the difficulty indicator
        cursor.style.display = 'none';
        board.style.display = 'none';
        instructions.style.display = 'none';
        difficulty.style.display = 'none';
        timer.style.display = 'none';
        const difficultyIndicator = document.querySelector('.difficulty-indicator');
        difficultyIndicator.style.display = 'none';
        clearInterval(timerInterval);

        // Display an end message and a "Play Again" button
        const endScreen = document.createElement('div');
        endScreen.classList.add('end-screen');
        endScreen.innerHTML = `
            <div class="end-message" style="text-align: center;">
                <h1 style="font-size: 5rem">${message}</h1>
                <button class="reset-button">Play Again</button>
            </div>
        `;
        document.body.appendChild(endScreen);

        // Add a click event listener to the "Play Again" button
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
let isRunning = false; // Flag to check if the game is already running

function run() {
    if (gameEnded) {
        return;
    }

    if (isRunning) {
        return; // If the game is already running, don't start a new game loop
    }

    // Event listeners to set kiwiSpeed based on difficulty level
    const easyButton = document.getElementById('easy');
    const mediumButton = document.getElementById('medium');
    const hardButton = document.getElementById('hard');

    easyButton.addEventListener('click', () => {
        kiwiSpeed = 1200; // Set the kiwiSpeed for the easy mode
        easyButton.classList.add('active');
        mediumButton.classList.remove('active');
        hardButton.classList.remove('active');
    });

    mediumButton.addEventListener('click', () => {
        kiwiSpeed = 800; // Set the kiwiSpeed for the medium mode
        easyButton.classList.remove('active');
        mediumButton.classList.add('active');
        hardButton.classList.remove('active');
    });

    hardButton.addEventListener('click', () => {
        kiwiSpeed = 600; // Set the kiwiSpeed for the hard mode
        easyButton.classList.remove('active');
        mediumButton.classList.remove('active');
        hardButton.classList.add('active');
    });

    isRunning = true;

    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];

    const isBomb = Math.random() < 0.3;
    const img = document.createElement('img');
    img.classList.add(isBomb ? 'bomb' : 'kiwi');
    img.src = isBomb ? 'assets/bomb.png' : 'assets/kiwi.png';
    img.alt = isBomb ? 'Bomb' : 'Kiwi';
    img.draggable = false;

    if (!isBomb) {
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
                        isRunning = false;
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
            isRunning = false;
            if (score < 10) {
                run();
            }
        }
    }, kiwiSpeed);
}

run(); // Start the game loop

// Event listeners for cursor interaction
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

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
