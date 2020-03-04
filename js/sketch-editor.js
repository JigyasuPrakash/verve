var polygon = false;
//var eraser = false;
var rectangle = false;
var myLine = false;
var cursor = true;
var editorCanvas;

function preload() {
    console.log("Hello from preload function");
}

function setup() {
    // Canvas declare
    editorCanvas = createCanvas(windowWidth / 2, windowHeight / 1.25);
    editorCanvas.parent('sketch-holder');

    let btnCursor = document.getElementById('cursor-btn');
    btnCursor.style.background = 'rgb(0,255,0)';

    frameRate(30);
}

var polyCoordinates = [];
var endPoly = false;
var rectCoordinates = [];
var endRect = false;
var myLineCoordinates = [];
var endMyLine = false;

function mouseClicked() {
    x = mouseX;
    y = mouseY;
    if (polygon && mouseX > 0 && mouseY > 0 && mouseX < editorCanvas.width && mouseY < editorCanvas.height) {
        if (polyCoordinates.length > 1) {
            if ((x - 15) < polyCoordinates[0].x && (x + 15) > polyCoordinates[0].x && (y - 15) < polyCoordinates[0].y && (y + 15) > polyCoordinates[0].y) {
                x = polyCoordinates[0].x;
                y = polyCoordinates[0].y;
                endPoly = true;
                polygon = false;
            }
        }
        polyCoordinates[polyCoordinates.length] = { x, y };
    }
    if (rectangle && mouseX > 0 && mouseY > 0 && mouseX < editorCanvas.width && mouseY < editorCanvas.height) {
        //click sense for rectangle mode
        if (rectCoordinates.length > 0) {
            rectangle = false;
            endRect = true;
        }
        rectCoordinates[rectCoordinates.length] = { x, y };
    }
    if (myLine && mouseX > 0 && mouseY > 0 && mouseX < editorCanvas.width && mouseY < editorCanvas.height) {
        if (myLineCoordinates.length > 0) {
            myLine = false;
            endMyLine = true;
        }
        myLineCoordinates[myLineCoordinates.length] = { x, y };
    }

}

function draw() {
    clear();
    background(245);
    drawGrid();
    //rect(0,0,100,20);
    stroke(100);
    if (polygon || endPoly) {
        drawPolygon();
    } else if (rectangle || endRect) {
        noFill();
        drawRectangle();
    }
    if (myLine || endMyLine) {
        stroke(0);
        drawMyLine();
    }
}

// Non p5 functions

function drawMyLine() {
    if (myLineCoordinates.length > 0 && !endMyLine) {
        console.log("Runtime");
        line(myLineCoordinates[0].x, myLineCoordinates[0].y, mouseX, mouseY);
    }
    if (myLineCoordinates.length === 2) {
        line(myLineCoordinates[0].x, myLineCoordinates[0].y, myLineCoordinates[1].x, myLineCoordinates[1].y);
    }
}


function drawGrid() {
    for (var x = 0; x < width; x += width / 60) {
        for (var y = 0; y < height; y += height / 45) {
            stroke(230);
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }
}

function drawPolygon() {
    if (polyCoordinates.length > 0 && !endPoly) {
        line(polyCoordinates[polyCoordinates.length - 1].x, polyCoordinates[polyCoordinates.length - 1].y, mouseX, mouseY);
    }

    if (polyCoordinates.length > 0) {
        for (let i = 0; i < polyCoordinates.length - 1; i++) {
            circle(polyCoordinates[i + 1].x, polyCoordinates[i + 1].y, 15);
            line(polyCoordinates[i].x, polyCoordinates[i].y, polyCoordinates[i + 1].x, polyCoordinates[i + 1].y);
        }
    }
}

function drawRectangle() {
    if (rectCoordinates.length > 0 && !endRect) {
        console.log("Runtime");
        rect(rectCoordinates[0].x, rectCoordinates[0].y, mouseX - rectCoordinates[0].x, mouseY - rectCoordinates[0].y);
    }
    if (rectCoordinates.length === 2) {
        rect(rectCoordinates[0].x, rectCoordinates[0].y, rectCoordinates[1].x - rectCoordinates[0].x, rectCoordinates[1].y - rectCoordinates[0].y);
    }
}

function selectMode(mode) {
    let btnCursor = document.getElementById('cursor-btn');
    let btnPolygon = document.getElementById('polygon-btn');
    //let btnEraser = document.getElementById('eraser-btn');
    let btnRectangle = document.getElementById('rectangle-btn');
    let btnLine = document.getElementById('line-btn');
    switch (mode) {
        case 'polygon':
            polygon = true;
            eraser = false;
            cursor = false;
            rectangle = false;
            myLine = false;
            btnCursor.style.background = 'rgb(255,255,255)';
            btnPolygon.style.background = 'rgb(0,255,0)';
            btnRectangle.style.background = 'rgb(255,255,255)';
            btnEraser.style.background = 'rgb(255,255,255)';
            btnLine.style.background = 'rgb(255,255,255)';
            break;
        // case 'eraser':
        //     polygon = false;
        //     eraser = true;
        //     cursor = false;
        //     rectangle = false;
        //     myLine = false;
        //     btnCursor.style.background = 'rgb(255,255,255)';
        //     btnPolygon.style.background = 'rgb(255,255,255)';
        //     btnEraser.style.background = 'rgb(0,255,0)';
        //     btnRectangle.style.background = 'rgb(255,255,255)';
        //     btnLine.style.background = 'rgb(255,255,255)';
        //     break;
        case 'cursor':
            polygon = false;
            eraser = false;
            cursor = true;
            rectangle = false;
            myLine = false;
            btnCursor.style.background = 'rgb(0,255,0)';
            btnPolygon.style.background = 'rgb(255,255,255)';
            btnEraser.style.background = 'rgb(255,255,255)';
            btnRectangle.style.background = 'rgb(255,255,255)';
            btnLine.style.background = 'rgb(255,255,255)';
            break;
        case 'rectangle':
            polygon = false;
            eraser = false;
            cursor = false;
            rectangle = true;
            myLine = false;
            btnCursor.style.background = 'rgb(255,255,255)';
            btnPolygon.style.background = 'rgb(255,255,255)';
            btnEraser.style.background = 'rgb(255,255,255)';
            btnRectangle.style.background = 'rgb(0,255,0)';
            btnLine.style.background = 'rgb(255,255,255)';
            break;
        case 'line':
            polygon = false;
            eraser = false;
            cursor = false;
            rectangle = false;
            myLine = true;
            btnCursor.style.background = 'rgb(255,255,255)';
            btnPolygon.style.background = 'rgb(255,255,255)';
            btnEraser.style.background = 'rgb(255,255,255)';
            btnRectangle.style.background = 'rgb(255,255,255)';
            btnLine.style.background = 'rgb(0,255,0)';
            break;
    }
}

function clearAll() {
    polyCoordinates = [];
    endPoly = false;
    rectCoordinates = [];
    endRect = false;
    myLineCoordinates = [];
    endMyLine = false;
    selectMode('cursor');
}


function startSimulation() {
    console.log(myLineCoordinates);
    console.log(rectCoordinates);
    cohenSutherland(myLineCoordinates[0]['x'], myLineCoordinates[0]['y'], myLineCoordinates[1]['x'], myLineCoordinates[1]['y']);
}



function cohenSutherland(x1, y1, x2, y2) {
    pcode1 = findOutCode(x1, y1);
    pcode2 = findOutCode(x2, y2);

    console.log(pcode1);
    console.log(pcode2);

    if (findVisibility(pcode1, pcode2) === 0) {
        console.log('fully visible');
        line(x1, y1, x2, y2);
    } else if (findVisibility(pcode1, pcode2) === 2) {
        midPointSubdivision(x1, y1, x2, y2);
    }

}


function midPointSubdivision(x1, y1, x2, y2) {

    console.log(x1 + " " + y1 + " " + x2 + " " + y2);
    var ym;
    var xm;

    var p1 = findOutCode(x1, y1);
    var p2 = findOutCode(x2, y2);

    var v = findVisibility(p1, p2);
    console.log(v);

    switch (v) {
        case 0:
            myLineCoordinates[0].x = x1;
            myLineCoordinates[0].y = y1;
            myLineCoordinates[1].x = x2;
            myLineCoordinates[1].y = y2;

            break;

        case 1:
            break;

        case 2:
            xm = x1 + (x2 - x1) / 2;
            ym = y1 + (y2 - y1) / 2;

            console.log("x1, y1");

            midPointSubdivision(x1, y1, xm, ym);

            xm = xm + 1;
            ym = ym + 1;

            console.log("x2, y2");

            midPointSubdivision(xm, ym, x2, y2);

            break;
    }
    return 0;

}

function findVisibility(pcode1, pcode2) {
    var vis = 0;

    var andOfPcode = findAnd(pcode1, pcode2);

    console.log(andOfPcode);

    if (!pcode1.includes(1) && !pcode2.includes(1)) {
        console.log("Line is totally visible");
        vis = 0;
    } else {
        if (andOfPcode.includes(1)) {
            console.log("Line is completely invisible");
            vis = 1;
        } else {

            console.log("Line is partially visible");
            vis = 2;
        }
    }

    return vis;
}

function findAnd(pcode1, pcode2) {
    var pcode = [];
    for (var i = 0; i < 4; i++) {
        if (pcode1[i] === 1 && pcode2[i] === 1) {
            pcode[i] = 1
        } else if (pcode1[i] != pcode2[i]) {
            pcode[i] = 0;
        } else if (pcode1[i] === 0 && pcode2[i] === 0) {
            pcode[i] = 0;
        }
    }
    return pcode;
}



function findOutCode(x, y) {
    var yt = rectCoordinates[1].y;
    var xr = rectCoordinates[1].x;
    var yb = rectCoordinates[0].y;
    var xl = rectCoordinates[0].x;

    var pcode = [];
    if (y > yt) {
        pcode.push(1);
    } else {
        pcode.push(0);
    }
    if (y < yb) {
        pcode.push(1);
    } else {
        pcode.push(0);
    }
    if (x > xr) {
        pcode.push(1);
    } else {
        pcode.push(0);
    }
    if (x < xl) {
        pcode.push(1);
    } else {
        pcode.push(0);
    }

    return pcode;
}