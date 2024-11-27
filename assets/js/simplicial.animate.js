/**
 * A script for generating and managing a simple simplicial complex used to animate the portfolio. 
 */

// this is the canvas that we define in each of our HTML files
const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");
// set canvas size to full window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// array to hold the points that we display on the page
const points = [];
const numPoints = 60;
// threshold for building the simplicial complex 
// this is (and will remain) the same for each point
const threshold = canvas.width/11.5; 

/**
 * Create a single point with random position and speed but fixed color and size.
 * Each point is returned as an array containing this information.
 */
function createPoint() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * canvas.width / 300,        
        dy: (Math.random() - 0.5) * canvas.height / 200,
        size: 4,                              
        color: "lime"                        
    };
}

// initialize the points
for (let i = 0; i < numPoints; i++) {
    points.push(createPoint());
}

/**
 * Determine the Euclidean distance between two points created by the function `createPoint()`. 
 * 
 * @param {any[]} p1 
 * @param {any[]} p2 
 */
function dist(p1, p2) {
    dx = p2.x - p1.x; 
    dy = p2.y - p1.y;
    return Math.sqrt(dx*dx + dy*dy); 
}

/**
 * Draw a line between two points created by the function `createPoint()`. 
 * 
 * @param {any[]} p1
 * @param {any[]} p2
 */
function drawLine(p1, p2) {
    ctx.beginPath();           // begin a new path
    ctx.moveTo(p1.x, p1.y);    // move to the start point
    ctx.lineTo(p2.x, p2.y);    // draw a line to the end point
    ctx.strokeStyle = "lime";  // set the line color
    ctx.lineWidth = 1.5;       // set the line width
    ctx.stroke();              // render the line
    ctx.closePath();
}

/**
 * Draw and update the points created above. 
 */
function simplicialAnimate() {
    // an array to prevent drawing edges repeatedly
    pointsCompleted = []; 

    // prepare the canvas for the current frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the edges of the simplicial complex
    for (let i = 0; i < numPoints; i++) {
        currPoint = points[i]; 
        
        // draw an edge between the current point and all those points within distance `threshold`
        for (let j = 0; j < numPoints; j++) {
            // proceed to draw a line between `currPoint` and point j if: 
            // - i and j are not the same point AND
            // - j gives a point whose edges have not been drawn yet AND
            // - i and j are pairwise close within a distance of `threshold`
            // &&  !pointsCompleted.includes(j) 
            if (j != i  &&  dist(points[i], points[j]) <= threshold) { 
                drawLine(points[i], points[j]); 
            }
        }

        // draw the point on top of the edges of the simplicial complex
        // update position
        currPoint.x += currPoint.dx;
        currPoint.y += currPoint.dy;
        // bounce off edges
        if (currPoint.x <= 0 || currPoint.x >= canvas.width) currPoint.dx *= -1;
        if (currPoint.y <= 0 || currPoint.y >= canvas.height) currPoint.dy *= -1;
        // draw the point
        ctx.beginPath();
        ctx.arc(currPoint.x, currPoint.y, currPoint.size, 0, Math.PI * 2);
        ctx.fillStyle = currPoint.color;
        ctx.fill();
        ctx.closePath();
        pointsCompleted.push(currPoint); 
    }

    // call animate again on next frame
    requestAnimationFrame(simplicialAnimate);
}

// add an event listener to handle window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// start the animation!
simplicialAnimate();