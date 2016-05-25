//Constructor
var Shape = function()
{
	this.vertices = [];	//Array of verticies that form the shape
}

//Get number of vertices
Shape.prototype.getVertexCount = function()
{
	return this.vertices.length;
}

//Get specific vertex
Shape.prototype.getVertex = function(index)
{
	return this.vertices[index];
}

//Add a vertex to shape
Shape.prototype.add = function(a, b)
{
	this.vertices.push(new Vect(a, b, 0));
}

//Inserts a vertex to the given position
Shape.prototype.insert = function(index, newVertex)
{
	this.vertices.splice(index, 0, newVertex);
}

//Remove a vertex from the shape
Shape.prototype.remove = function(index)
{
	this.vertices.splice(index, 1);
}

//Gets the length between the vertex at an index and the next vertex.
Shape.prototype.getEdgeLength = function(index)
{
	return(
		this.getVertex(index).getSub(
			this.getVertex(
				(index + 1) % this.getVertexCount())).magnitude());
}

//Get average lengths of edges	
Shape.prototype.getAverageEdgeLength = function()
{
	var averageLength = 0.0;
	for(var i = 0; i < this.getVertexCount(); i++)
	{
		averageLength += this.getEdgeLength(i);
	}
	averageLength /= this.getVertexCount();
	return averageLength;
}

//Returns the area of the shape
Shape.prototype.getArea = function()
{
	var area = 0;
	for(var i = 0; i < this.getVertexCount(); i++)
	{
		area += Math.abs(this.getVertex(i).cross(this.getVertex((i + 1) % this.getVertexCount())));
	}
	return area;
}

//Returns a vect representing the midpoint between a vertex and the next vertex.
Shape.prototype.getMidPoint = function(index)
{
	return this.getVertex(index).getAdd(this.getVertex((index + 1) % this.getVertexCount())).getDiv(2);
}

//Generate the shape as a scaled regular polygon
Shape.prototype.generatePolygon = function(edgeCount, radius, scale)
{
	this.vertices = [];
	for(var i = 0; i < edgeCount; i++)
	{
		this.add(
			Math.sin(2 * i * Math.PI / edgeCount) * radius,
			Math.cos(2 * i * Math.PI / edgeCount) * radius * scale);	//Y-axis is scaled
	}
}

//Draw shape
Shape.prototype.draw = function(ctx)
{
	ctx.beginPath();
	for(var i = 0; i < this.getVertexCount(); i++)
	{
		ctx.lineTo(this.getVertex(i).xPos, this.getVertex(i).yPos);
	}
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

//Collapse the shape between a vertex at an index and the next vertex.
Shape.prototype.collapse = function(index)
{
	//Move the indexed vertex to the midpoint of itself and the next vertex
	var midPoint = this.getMidPoint(index);
	this.vertices.splice(index, 1, midPoint);
	
	//Remove the next vertex.
	this.remove((index + 1) % this.getVertexCount());
}

//Takes any edge that is beyond a threshold length, splits it, and indents it.
Shape.prototype.crater = function(threshold)
{
	for(var i = 0; i < this.getVertexCount(); i++)
	{
		if(this.getEdgeLength(i) > threshold)		//If beyond threshold
		{
			this.insert(i + 1, this.getMidPoint(i))	//Split
			this.getVertex(i + 1).div(1.1);			//Indent
		}
	}
}

//Offset shape away from given vector.
Shape.prototype.offsetAway = function(offset)
{
	for(var i = 0; i < this.getVertexCount(); i++)
	{
		this.getVertex(i).sub(offset);
	}
}

