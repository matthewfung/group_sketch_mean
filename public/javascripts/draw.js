var counter = 1;
var color = {
	"red": 0,
	"green": 0,
	"blue": 0
}

var size = 2;
function Circle(x,y,r,u,c){
	this.circles = {};
	this.cx = x;
	this.cy = y;
	this.radius = r;
	this.update = u;
	this.counter=c;
}

Circle.prototype.makeSVG = function(tag,attrs){
	var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
	for(var k in attrs){
		el.setAttribute(k, attrs[k]);
	}
	return el;
}
Circle.prototype.createCircle = function(){
	var circle = this.makeSVG('circle',
		{cx: this.cx,
		 cy: this.cy,
		 radius: this.radius,
		 id: 'circle_'+this.counter
		});

	this.circles['circle_'+this.counter] = { radius: this.radius, 
									r: color.red,//parseInt(Math.random()*255),
									g: color.green,//parseInt(Math.random()*255),
									b: color.blue,//parseInt(Math.random()*255),
									update: this.update};
	this.counter++;
	document.getElementById('svg').appendChild(circle);
	return this.counter;
}
Circle.prototype.createCircle2 = function(red,green,blue){
	var circle = this.makeSVG('circle',
		{cx: this.cx,
		 cy: this.cy,
		 radius: this.radius,
		 id: 'circle_'+this.counter,
		 style: "fill: black"
		});

	this.circles['circle_'+this.counter] = { radius: this.radius, 
									r: red,//parseInt(Math.random()*255),
									g: green,//parseInt(Math.random()*255),
									b: blue,//parseInt(Math.random()*255),
									update: this.update};
	this.counter++;
	document.getElementById('svg').appendChild(circle);
	return this.counter;
}

Circle.prototype.updateCircle = function(){
		for(circle in this.circles)
		{
			var el = document.getElementById(circle);
			if(this.circles[circle].update){
				this.circles[circle].radius = this.circles[circle].radius+1;

				
				el.setAttribute("r", this.circles[circle].radius);
				el.setAttribute("style", "fill: rgb("+this.circles[circle].r+","+this.circles[circle].g+","+this.circles[circle].b+"); ");

		
				if(this.circles[circle].radius > 80)
				{
					document.getElementById('svg').removeChild(el);
					delete this.circles[circle];
				}
			}
		}
}		
	function randomInt(min, max){
		return Math.floor(Math.random()*(max-min + 1))+min;
	}

	var mouseState = false;
	document.onmousedown= function(e){
		mouseState = true
	}
	document.onmouseup= function(e){
		mouseState = false
	}

	document.onclick = function(f){
		var circle = new Circle(f.x-10, f.y-105, size, true, counter);
		counter = circle.createCircle();
		circle.updateCircle();
		ioo.emit("draw", {x: f.x, y: f.y, size: size, color: color}, room_id);
	}
	function mainLoop(f)
	{
    	var circle = new Circle(f.x-10, f.y-105, size, true, counter);
		counter = circle.createCircle();
		circle.updateCircle();
		ioo.emit("draw", {x: f.x, y: f.y, size: size, color: color},  room_id);
	}
	document.onmousemove = function(e){
		if(mouseState) {
			setInterval(mainLoop(e), 4);
		}

	}

