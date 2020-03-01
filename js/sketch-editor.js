var polygon = false;
var eraser = false;
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
}

// Non p5 functions

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
    let btnEraser = document.getElementById('eraser-btn');
    let btnRectangle = document.getElementById('rectangle-btn');
    let btnLine = document.getElementById('line-btn');
    switch (mode) {
        case 'polygon':
            polygon = true;
            eraser = false;
            cursor = false;
            rectangle = false;
            inLine = false;
            btnCursor.style.background = 'rgb(255,255,255)';
            btnPolygon.style.background = 'rgb(0,255,0)';
            btnRectangle.style.background = 'rgb(255,255,255)';
            btnEraser.style.background = 'rgb(255,255,255)';
            btnLine.style.background = 'rgb(255,255,255)';
            break;
        case 'eraser':
            polygon = false;
            eraser = true;
            cursor = false;
            rectangle = false;
            inLine = false;
            btnCursor.style.background = 'rgb(255,255,255)';
            btnPolygon.style.background = 'rgb(255,255,255)';
            btnEraser.style.background = 'rgb(0,255,0)';
            btnRectangle.style.background = 'rgb(255,255,255)';
            btnLine.style.background = 'rgb(255,255,255)';
            break;
        case 'cursor':
            polygon = false;
            eraser = false;
            cursor = true;
            rectangle = false;
            inLine = false;
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
            inLine = false;
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
            inLine = true;
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
    selectMode('cursor');
}