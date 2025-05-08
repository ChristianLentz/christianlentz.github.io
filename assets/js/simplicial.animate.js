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
const numPoints = 80; 
// threshold for building the simplicial complex 
// this is (and will remain) the same for each point
const threshold = canvas.width/11.5; 
// adjacency matrix for the points 
// we need this data structure to draw 2-simplices, or triangles! 
let adjMatrix = new Array(numPoints); 

/**
 * Create a single point with random position and speed but fixed color and size.
 * Each point is returned as an array containing this information.
 */
function createPoint() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * canvas.width / 400,    
        dy: (Math.random() - 0.5) * canvas.height / 300,
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
 * Draw a triangle between three points created by the function `createPoint()`.
 * 
 * NOTE: this code can definitley be refactored to draw triangles first and prevent drawing edges
 * where there are already traingles. This would require creating the adjacency matrix before 
 * drawing anything, rather than creating it as we draw edges!  
 * 
 * @param {any[]} p1
 * @param {any[]} p2
 * @param {any[]} p3
 */
function drawTriangle(p1, p2, p3) {
    ctx.beginPath();           
    ctx.moveTo(p1.x, p1.y);    
    ctx.lineTo(p2.x, p2.y);    
    ctx.lineTo(p3.x, p3.y); 
    ctx.closePath();
    ctx.fillStyle = 'lime'; 
    ctx.fill();
    ctx.strokeStyle = "black";  
    ctx.lineWidth = 1.5;
    ctx.stroke(); 
}

/**
 * Draw and update the points created above. 
 */
function simplicialAnimate() {
    // prepare the canvas for the current frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);  

    // draw edges and create adjacency matrix
    for (let i = 0; i < numPoints; i++) {
        const currPoint = points[i]; 
        adjMatrix[i] = []; 
        
        // draw a 1-simplex (edge) between the current point (i) and all those points within distance `threshold`
        // record this information in the adjacency matrix
        for (let j = 0; j < numPoints; j++) {
            if (adjMatrix[j] == undefined) { 
                adjMatrix[j] = []; 
            }
            // proceed to draw a line between `currPoint` and point j if: 
            // - i and j are not the same point AND
            // - i and j are pairwise close within a distance of `threshold` AND
            // - there is not an existing edge between i and j 
            if (j != i  &&  dist(currPoint, points[j]) <= threshold && !adjMatrix[i].includes(j)) { 
                drawLine(currPoint, points[j]); 
                adjMatrix[i].push(j);
                adjMatrix[j].push(i);  
            }
        }
    }

    for (let i = 0; i < numPoints; i++) { // --> for each point on the screen ... 
        const currPoint = points[i]; 

        // // draw the 2-simplices (triangles) 
        // const adjList1 = adjMatrix[i]; 
        // for (const j of adjList1) { // --> for each point adjacent to it ... 
        //     const adjList2 = adjMatrix[j]; 
        //     for (const k of adjList2) { // -- and for each point adjacent to that point ... 
        //         if (adjMatrix[k].includes(i)) { 
        //             drawTriangle(points[i], points[j], points[k]);
        //         }
        //     }
        // }

        // draw `currPoint` on top of its edges and triangles
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
    }

    // call animation for the next frame
    adjMatrix.splice(0, adjMatrix.length);
    requestAnimationFrame(simplicialAnimate);
}

// add an event listener to handle window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// start the animation!
simplicialAnimate();