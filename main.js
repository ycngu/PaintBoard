var canvas = document.querySelector('#canvas')

var ctx = canvas.getContext('2d')
var penColor = 'black'
var using = false
var lastPoint ={x:undefined,y:undefined}
var eraserEnabled = false

setCanvasSize()


eraser.onclick = function() {
  eraserEnabled =true
  actions.className = 'actions x'
}

brush.onclick = function(){
  eraserEnabled = false
  actions.className = 'actions'
}

function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}



canvas.onmousedown = function(evt){
    using = true
    var x = evt.clientX
    var y = evt.clientY
    if(eraserEnabled){
        ctx.clearRect(x - 5,y - 5, 10, 10)
    } else{
        lastPoint= {
            "x":x,
            "y":y
        }    
    }
    // drawCircle(x, y, 1)
}

canvas.onmousemove = function(evt){
    var x = evt.clientX
    var y = evt.clientY

    if (!using) {return}
    
    if(eraserEnabled){
        ctx.clearRect(x - 5, y - 5, 20, 20)
    } else{
        var newPoint ={"x":x,"y":y}
        // console.log('nxy',lastPoint.x,lastPoint.y)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
    }
}

canvas.onmouseup = function(evt){
    using = false
}




var drawCircle = function (x, y, radius){
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = penColor 
    ctx.fill()
}

var drawLine = function(x1, y1, x2, y2){
    ctx.beginPath()
    ctx.strokeStyle = penColor
    ctx.lineWidth = '5'
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
}