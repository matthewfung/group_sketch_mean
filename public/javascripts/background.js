var counter = 1;
var circles = {};

//read: http://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
//create an SVG element
function makeSVG(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
    {
        el.setAttribute(k, attrs[k]);
    }
    return el;
}

//draws a star
function createCircle(cx,cy,r)
{
	var circle = makeSVG('circle', 
		{ cx: cx,
		  cy: cy,
		  r:  r,
		  id: 'circle_'+counter,
		  style: "fill: white"
		});

	//the key will be the HTML id and the value will be the radius
	circles['circle_'+counter] = { radius: r };

	counter++;
	document.getElementById('background').appendChild(circle);
}

function updateCircles()
{
	for(circle in circles)
	{
		var el = document.getElementById(circle);
		var color = 255-parseInt(circles[circle].radius/80*255);
		circles[circle].radius = circles[circle].radius+1;

		//update the radius and the background color
		el.setAttribute("r", circles[circle].radius);
		el.setAttribute("style", "fill: rgb("+color+","+color+","+color+"); ");

		//if the circle radius is greater than 80, remove the dom and remove its value in the circles variable/object
		if(circles[circle].radius > 80)
		{
			document.getElementById('background').removeChild(el);
			delete circles[circle];
		}
	}
}

function mainLoop()
{
	createCircle(Math.random()*document.body.clientWidth, Math.random()*document.body.clientHeight, 15);
	
	updateCircles();	
}

setInterval(mainLoop, 50);

