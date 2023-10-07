const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

c.fillStyle = 'black'
c.fillRect(10, 10, 40, 40)