var canvas = document.querySelector('#canvas')

var ctx = canvas.getContext('2d')
var penColor = 'black'
var using = false
var lastPoint ={x:undefined,y:undefined}
var eraserEnabled = false

setCanvasSize()


var colors = document.querySelector('.colors')

colors.onclick = function(evt){
    var li = document.querySelectorAll('li')
    for (var i = 0; i < li.length; i++) {
        li[i].classList.remove('active')
    }
    penColor = evt.target.className 
    evt.target.classList.add('active')
}




pen.onclick = function() {
  eraserEnabled =false
  pen.classList.add('active')
  eraser.classList.remove('active')
}

eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}


if(document.body.ontouchstart !== undefined){
    canvas.ontouchstart = function(evt){
        using = true
        var x = evt.touches[0].clientX
        var y = evt.touches[0].clientY
        if(eraserEnabled){
            ctx.clearRect(x - 5,y - 5, 10, 10)
        } else{
            lastPoint= {
                "x":x,
                "y":y
            }    
        }
    }
    
    canvas.ontouchmove = function(evt){
        var x = evt.touches[0].clientX
        var y = evt.touches[0].clientY
    
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
    
    canvas.ontouchend = function(evt){
        using = false
    }
} else{
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