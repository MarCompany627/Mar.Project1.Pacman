const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const fps = 10;
canvas.width = innerWidth
canvas.height = innerHeight

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

