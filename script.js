// Select the cursor element, all holes, and the score span element
const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')

// Initialize the score variable
let score = 0;

// Function to end the game when reaching 10 points
function endGame() {
    if (score >= 10) {
        // Hide the cursor
        cursor.style.display = 'none';
        
        // Display the "You Won" message
        const endScreen = document.createElement('div');
        endScreen.classList.add('end-screen');
        endScreen.innerHTML = `
            <div class="end-message">
                <h2>You Won!</h2>
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

// Function to run the game
function run() {
    // Check if the game has ended (score is 10)
    if (score === 10) {
        return; // Do nothing if the game has ended
    }

    // Generate a random index to select a hole
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null

    // Create an image element for the kiwi
    const img = document.createElement('img')
    img.classList.add('kiwi')
    img.src = 'assets/kiwi.png'
    
    // Prevent the image from being dragged
    img.draggable = false;
    
    // Add a click event listener for the kiwi
    img.addEventListener('click', () => {
        // Increase the score when the kiwi is clicked
        score += 1
        scoreEl.textContent = score
        
        // Check if the game has ended
        endGame();
        
        // Change the image source and handle kiwi removal
        img.src = 'assets/kiwi-whacked.png'
        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            // Continue the game if the score is less than 10
            if (score < 10) {
                run();
            }
        }, 50)
    })

    // Add the kiwi image to the selected hole
    hole.appendChild(img)

    // Set a timer to remove the kiwi after 500 milliseconds
    timer = setTimeout(() => {
        hole.removeChild(img)
        // Continue the game if the score is less than 10
        if (score < 10) {
            run();
        }
    }, 800)
}

// Start the game
run()

// Add a mousemove event listener to update the cursor position
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})

// Add a mousedown event listener to activate the cursor
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})

// Add a mouseup event listener to deactivate the cursor
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})

// chatgbt was used to add the end of the game events