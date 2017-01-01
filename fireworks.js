
var missile = [];
var boom = [];

function setup()
{
	var x;
	createCanvas(500,500);
	for(x = 0; x < 30; x++)
	{
		missile[x] = new firework();	
	}
	
}

function draw()
{
	var x;
	background(0);
	for(x = 0; x < missile.length; x++)
	{
		missile[x].rise();
		missile[x].display();
		missile[x].explode();
	}
}

function firework()
{
	this.history = [];	
	this.x = random(width);
	this.y = random(500, 2000);
	this.z = random(0,10);
	this.speed = map(this.z, 0,10, 2,4);
	this.len = map(this.z, 0, 10, 7, 14);
	this.color = random(1, 255);
	this.color2 = random(1,255);
	this.color3 = random(1,255);
	
	this.explodepoint = random(height/1.5, height/4);
	this.rise = function()
	{
		this.y = this.y - this.speed;
		var v = createVector(random(this.x-2, this.x +2), this.y + this.len + 2);
		this.history.push(v);
		if (this.history.length > 60)
		{
			this.history.splice(0,1);
		}	

	}
	this.display = function()
	{
		this.stroke = map(this.z, 0, 10, 1,2.5);
		stroke(this.color3,this.color,this.color2);
		strokeWeight(this.stroke);
		line(this.x, this.y , this.x, this.y + this.len);
		for(var x= 0; x < boom.length; x++)
		{
			noStroke();
			boom[x].display();
		}
		for(var z = 0; z < this.history.length; z++)
		{
			var pos = this.history[z]
			fill(255, 165, 0);
			ellipse(pos.x, pos.y, 2,2);
		}		
	}
	this.explode = function()
	{
		if(this.y <= this.explodepoint)
		{
			this.y = random(500, 2000);
			noStroke();
			for (var x = 0; x < 50; x++)
			{
				boom[x] = new Particle(random(this.x-10, this.x+10), random(this.explodepoint-10, this.explodepoint+10), this.color, this.color2, this.color3);
			}	
			
						
			this.x = random(width);
			this.z = random(0,10);
			this.color = random(1, 255);
			this.color2 = random(1,255);
			this.color3 = random(1,255);
		}
				
	}
}

function Particle(x, y, color, color2, color3)
{
	this.display = function()
	{
			fill(color3, color, color2);
			ellipse(x ,y, 1, 1 );
	}	
}	
	



