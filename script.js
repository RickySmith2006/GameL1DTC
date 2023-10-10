// Select the cursor element, all holes, and the score span element
const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')

// Initialize the score variable
let score = 0

// Function to run the game
function run() {
    // Generate a random index to select a hole
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null

    // Create an image element for the kiwi
    const img = document.createElement('img')
    img.classList.add('kiwi')
    img.src = 'assets/kiwi.png'
    
    // Prevent the image from being dragged
    img.ondragstart = () => {
        return false
    }
    
    // Add a click event listener for the kiwi
    img.addEventListener('click', () => {
        // Increase the score when the kiwi is clicked
        score += 1
        scoreEl.textContent = score
        
        // Change the image source and handle kiwi removal
        img.src = 'assets/kiwi-whacked.png'
        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 50)
    })

    // Add the kiwi image to the selected hole
    hole.appendChild(img)

    // Set a timer to remove the kiwi after 500 milliseconds
    timer = setTimeout(() => {
        hole.removeChild(img)
        run()
    }, 700)
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
