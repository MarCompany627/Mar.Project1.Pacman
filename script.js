const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const fps = 50;
canvas.width = innerWidth
canvas.height = innerHeight
const startX = 20
const startY = 20
const blockSize = 50
let boundaries = []
let foods = []
const map = [['1','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','2'],
             ['|','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','|'],
             ['|','.','b','.','[','7','7',']','.','[','-','-',']','.','b','.','[','7','7',']','.','[','-','-',']','.','|'],
             ['|','.','.','.','.','4','3','.','.','.','.','.','.','.','.','.','.','4','3','.','.','.','.','.','.','.','|'],
             ['|','.','[',']','.','.','.','.','[','-','-','-',']','.','[',']','.','.','.','.','[','-','-','-',']','.','|'],
             ['|','.','.','.','.','^','.','.','.','.','.','.','.','.','.','.','.','^','.','.','.','.','.','.','.','.','|'],
             ['|','.','b','.','[','+',']','.','[','-','-','-',']','.','b','.','[','+',']','.','[','-','-','-',']','.','|'],
             ['|','.','.','.','.','_','.','.','.','.','.','.','.','.','.','.','.','_','.','.','.','.','.','.','.','.','|'],
             ['|','.','[',']','.','.','.','.','.','^','.','.','b','.','[',']','.','.','.','.','.','^','.','.','b','.','|'],
             ['|','.','.','.','.','^','.','.','[','+',']','.','.','.','.','.','.','^','.','.','[','+',']','.','.','.','|'],
             ['|','.','b','.','[','5',']','.','.','_','.','.','b','.','b','.','[','5',']','.','.','_','.','.','b','.','|'],
             ['|','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','|'],
             ['|','.','b','.','[','7','7',']','.','[','-','-',']','.','b','.','[','7','7',']','.','[','-','-',']','.','|'],
             ['|','.','.','.','.','4','3','.','.','.','.','.','.','.','.','.','.','4','3','.','.','.','.','.','.','.','|'],
             ['|','.','[',']','.','.','.','.','[','-','-','-',']','.','[',']','.','.','.','.','[','-','-','-',']','.','|'],
             ['|','.','.','.','.','^','.','.','.','.','.','.','.','.','.','.','.','^','.','.','.','.','.','.','.','.','|'],
             ['|','.','b','.','[','+',']','.','[','-','-','-',']','.','b','.','[','+',']','.','[','-','-','-',']','.','|'],
             ['|','.','.','.','.','_','.','.','.','.','.','.','.','.','.','.','.','_','.','.','.','.','.','.','.','.','|'],
             ['|','.','[',']','.','.','.','.','.','^','.','.','b','.','[',']','.','.','.','.','.','^','.','.','b','.','|'],
             ['|','.','.','.','.','^','.','.','[','+',']','.','.','.','.','.','.','^','.','.','[','+',']','.','.','.','|'],
             ['|','.','b','.','[','5',']','.','.','_','.','.','b','.','b','.','[','5',']','.','.','_','.','.','b','.','|'],
             ['|','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','|'],
             ['|','.','[',']','.','.','.','.','.','^','.','.','b','.','[',']','.','.','.','.','.','^','.','.','b','.','|'],
             ['|','.','.','.','.','^','.','.','[','+',']','.','.','.','.','.','.','^','.','.','[','+',']','.','.','.','|'],
             ['|','.','b','.','[','5',']','.','.','_','.','.','b','.','b','.','[','5',']','.','.','_','.','.','b','.','|'],
             ['|','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','|'],
             ['4','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','3']]
const textToImg = {
    '-' : './images/pipeHorizontal.png',
    '|' : './images/pipeVertical.png',
    '1' : './images/pipeCorner1.png',
    '2' : './images/pipeCorner2.png',
    '3' : './images/pipeCorner3.png',
    '4' : './images/pipeCorner4.png',
    'b' : './images/block.png',
    '[' : './images/capLeft.png',
    ']' : './images/capRight.png',
    '_' : './images/capBottom.png',
    '^' : './images/capTop.png',
    '+' : './images/pipeCross.png',
    '5' : './images/pipeConnectorTop.png',
    '6' : './images/pipeConnectorRight.png',
    '7' : './images/pipeConnectorBottom.png',
    '8' : './images/pipeConnectorLeft.png',
}
class Boundary{
    constructor(src, pos){
            this.src = src
            this.pos = pos
            this.img = new Image(blockSize, blockSize)
            this.img.src = this.src
    }
    draw(){
        ctx.drawImage(this.img, this.pos.x, this.pos.y, blockSize, blockSize)
    }
}
class Food{
    constructor(pos){
        this.radius = 10
        this.pos = pos
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'yellow'
        ctx.fill()
        ctx.closePath()
    }
}
for(let i = 0; i < map.length ;i++){
    for(let j = 0; j< map[i].length; j++){
        if (map[i][j] != '.'){
            boundaries.push(new Boundary(textToImg[map[i][j]], {x: startX + j * blockSize, y: startY + i * blockSize}))
        }else{
            foods.push(new Food({x: startX + j * blockSize + blockSize / 2, y: startY + i * blockSize + blockSize / 2}))
        }
    }
}
class Player{
    constructor(pos){
        this.radius = 20;
        this.pos = pos;
        this.direction = 'down';
        this.speed = 1;
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'white'
        ctx.fill()
        ctx.closePath()
    }
    move(){
        if(this.direction == 'up'){
            this.pos.y = this.pos.y - this.speed
        }else if(this.direction == "down"){
            this.pos.y = this.pos.y + this.speed
        }else if(this.direction == "left"){
            this.pos.x = this.pos.x - this.speed
        }else if(this.direction == "right"){
            this.pos.x = this.pos.x + this.speed
        }
    }
}
let player = new Player(
    {
        x: 100,
        y: 200
    }
)
function draw(){
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    for(let i = 0; i < boundaries.length ;i++){
        boundaries[i].draw()
    }
    for(let i = 0; i < foods.length;i++){
        foods[i].draw()
    }
    player.draw()
    player.move()
}
document.addEventListener('keydown', (e)=>{
    if(e.key == 'a'){
        player.direction = 'left';
    }else if(e.key == 'w'){
        player.direction = 'up';
    }else if(e.key == 's'){
        player.direction = 'down';
    }else if(e.key == 'd'){
        player.direction = 'right'
    }
})
setInterval(draw, 1000 / fps)