var canvas = document.querySelector('#canvas')

var ctx = canvas.getContext('2d')
var penColor = 'black'
var painting = false
var lastPoint ={x:undefined,y:undefined}
canvas.onmousedown = function(evt){
    painting = true
    var x = evt.clientX
    var y = evt.clientY
    lastPoint= {
        x:x,
        y:y
    }
    drawCircle(x, y, 1)
}

canvas.onmousemove = function(evt){
    if(painting){
        var x = evt.clientX
        var y = evt.clientY
        var newPoint ={x:x,y:y}
        drawCircle(x, y, 1)
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
    }
}

canvas.onmouseup = function(evt){
    painting = false
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
    ctx.lineTo(x2,y2)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}