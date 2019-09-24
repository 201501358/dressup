// JavaScript source code
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var mouse = {
    down: false
    ,selected: undefined
    , x: 0
    , y: 0
}
function mouseUpdate(event) {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
}
function clicked() {
    mouse.down = true;
}
function unclicked() {
    mouse.down = false;
    mouse.selected = undefined;
}

//House : wardrobe, clothes, man, floor ...
var House = {}
House.floor = {}
House.floor.height = 40;
House.floor.image = new Image();
House.floor.image.src = "image/floor.png";
House.draw = function () {
    ctx.beginPath();
    ctx.drawImage(this.floor.image
        , 0, 0
        , this.floor.image.naturalWidth, this.floor.image.naturalHeight
        , 0, canvas.height - (this.floor.height * 2)
        , canvas.width, canvas.height);
    ctx.closePath();
}

//Man : x, y, height
function Man() {
}
Man.prototype.height = 180;
Man.prototype.image = new Image;
Man.prototype.image.src = "image/man.png";
Man.prototype.draw = function () {
    ctx.beginPath();
    ctx.drawImage(this.image
        , 0, 0
        , this.image.naturalWidth, this.image.naturalHeight
        , 500, canvas.height - (House.floor.height + this.height)
        , this.image.naturalWidth, this.height);
    ctx.closePath();
}
var man = new Man();

//clothes: x,y
function Clothes() {
    this.x = 0;
    this.y = 0;
}
Clothes.prototype.setImage = function (src) {
    var img = new Image;
    img.src = src;
    this.image = img;
}
Clothes.prototype.move = function () {

}
Clothes.prototype.draw = function () {
    ctx.beginPath();
    ctx.drawImage(this.image
        , 0, 0
        , this.image.naturalWidth, this.image.naturalHeight
        , this.x, this.y
        , this.image.naturalWidth, this.image.naturalHeight * Man.prototype.height / Man.prototype.image.naturalHeight);
    ctx.closePath();
}
var clothes_array = []
for (var i = 0; i < 4; i++) {
    clothes_array[i] = new Clothes();
}
clothes_array[0].setImage("image/mtm0.png")
clothes_array[1].setImage("image/jeans0.png")
clothes_array[2].setImage("image/shirts0.png")
clothes_array[3].setImage("image/hat0.png")

clothes_array.move = function () {
    var i;
    if (mouse.down) {
        if (mouse.selected === undefined) {
            for (i = 0; i < this.length; i++) {
                if (this[i].x <= mouse.x && mouse.x < this[i].x + this[i].image.naturalWidth
                    && this[i].y <= mouse.y && mouse.y < this[i].y + this[i].image.naturalHeight * Man.prototype.height / Man.prototype.image.naturalHeight) {
                    mouse.selected = i;
                    break;
                }
            }
        }
        if (0 <= mouse.selected && mouse.selected < this.length) {
            this[mouse.selected].x = mouse.x-25;
            this[mouse.selected].y = mouse.y-25;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    House.draw();
    man.draw();

    for (var i = 0; i < clothes_array.length; i++) {
        clothes_array[i].draw();
    }

    clothes_array.move();

    ctx.beginPath();
    ctx.font = "20px Georgia";
    ctx.fillStyle = "black";
    ctx.fillText(mouse.selected, 10, 50);
    ctx.closePath();
}

setInterval(draw, 40);