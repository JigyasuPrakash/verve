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

function drawGrid() {
    for (var x = 0; x < width; x += width / 60) {
        for (var y = 0; y < height; y += height / 45) {
            stroke(230);
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }
}

var coordinates = [];
var end = false;

function mouseClicked() {
    if (polygon && mouseX > 0 && mouseY > 0 && mouseX < editorCanvas.width && mouseY < editorCanvas.height) {
        x = mouseX;
        y = mouseY;

        if (coordinates.length > 1) {
            if ((x - 15) < coordinates[0].x && (x + 15) > coordinates[0].x && (y - 15) < coordinates[0].y && (y + 15) > coordinates[0].y) {
                x = coordinates[0].x;
                y = coordinates[0].y;
                end = true;
                polygon = false;
            }
        }
        coordinates[coordinates.length] = { x, y };
    }

}

function draw() {

    background(245);
    drawGrid();

    stroke(100);
    if (coordinates.length > 0 && !end) {
        line(coordinates[coordinates.length - 1].x, coordinates[coordinates.length - 1].y, mouseX, mouseY);
    }

    if (coordinates.length > 0) {
        for (let i = 0; i < coordinates.length - 1; i++) {
            circle(coordinates[i + 1].x, coordinates[i + 1].y, 15);
            line(coordinates[i].x, coordinates[i].y, coordinates[i + 1].x, coordinates[i + 1].y);
        }
        console.log(coordinates);
    }

}





// Non p5 functions
function clearAll() {
    coordinates = [];
    end = false;
    selectMode('cursor');
}