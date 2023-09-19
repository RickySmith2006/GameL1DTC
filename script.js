const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
let score = 0

function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null

    const img = document.createElement('img')
    img.classList.add('kiwi')
    img.src = 'assets/kiwi.png'
    img.ondragstart = () =>{
        return false
    } 
    // https://plainenglish.io/blog/how-to-disable-dragging-an-image-from-an-html-page-4c84f0c38b76 - i used this code to prevent the image from being dragged
    
    img.addEventListener('click', () => {
        score += 1
        scoreEl.textContent = score
        img.src = 'assets/kiwi-whacked.png'
        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 50)
    })

    hole.appendChild(img)

    timer = setTimeout(() => {
        hole.removeChild(img)
        run()
    }, 1000)
}
run()

window.addEventListener('mousemove' , e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})

window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})

window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})