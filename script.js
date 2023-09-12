const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')]

function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]

    const img = document.createElement('img')
    img.classList.add('kiwi')
    img.src = 'assets/kiwi.png'

    hole.appendChild(img)
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