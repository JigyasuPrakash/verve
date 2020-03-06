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
var rectCoord = [];

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
        rectCoord[rectCoordinates.length] = { x, y };
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


function startMidPoint() {
    console.log(myLineCoordinates);
    console.log(rectCoordinates);
    midpointAlgo(myLineCoordinates[0]['x'], myLineCoordinates[0]['y'], myLineCoordinates[1]['x'], myLineCoordinates[1]['y']);
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
            pcode[i] = 1;
        } else if (pcode1[i] != pcode2[i]) {
            pcode[i] = 0;
        } else if (pcode1[i] === 0 && pcode2[i] === 0) {
            pcode[i] = 0;
        }
    }
    return pcode;
}



function findOutCode(x, y) {
    var width = rectCoordinates[1].x - rectCoordinates[0].x;
    var height = rectCoordinates[1].y - rectCoordinates[0].y;


    var yt = Math.max(rectCoordinates[0].y, rectCoordinates[1].y);
    var xr = Math.max(rectCoordinates[0].x, rectCoordinates[1].x);
    var yb = Math.min(rectCoordinates[0].y, rectCoordinates[1].y);
    var xl = Math.min(rectCoordinates[0].x, rectCoordinates[1].x);

    var pcode = {};
    var outcode = [];
    if (y > yt) {
        pcode[0] = 1;
    } else {
        pcode[0] = 0;
    }
    if (y < yb) {
        pcode[1] = 1;
    } else {
        pcode[1] = 0;
    }
    if (x > xr) {
        pcode[2] = 1;
    } else {
        pcode[2] = 0;
    }
    if (x < xl) {
        pcode[3] = 1;
    } else {
        pcode[3] = 0;
    }
    console.log(pcode);
    for (var i in pcode) {
        outcode.push(pcode[i]);
    }

    console.log(outcode);
    return outcode;
}

function sum(code) {
    var s = 0;
    for (var i = 0; i < 4; i++) {
        s += code[i];
    }
    return s;
}



function midpointAlgo(x1, y1, x2, y2) {
    var p1code = findOutCode(x1, y1);
    var p2code = findOutCode(x2, y2);

    var savep1code = [];

    var sum1 = sum(p1code);
    var sum2 = sum(p2code);

    var savep1 = {};
    var savep2 = {};
    var temp = {};
    var tempsum1;

    var xm, ym;

    var vflag = findVisibility(p1code, p2code);

    if (vflag === 0) {
        $('#steps').append(`<p>Line is totally visible</p>`);
        console.log("Line is completely visible.");

        return;
    }
    if (vflag === 1) {
        $('#steps').append(`<p>Line is totally invisible</p>`);
        console.log("Line is invisible..");
        return;
    }
    $('#steps').append(`<p>Line is partially visible</p>`);
    error = 1;
    for (var i = 1; i <= 2; i++) {
        console.log(sum1 + ' ' + sum2);
        if (i === 1 && !p1code.includes(1)) {
            $('#steps').append(`<br><p>P1 = (${Math.ceil(x1)}, ${Math.ceil(y1)}); P2 = (${Math.ceil(x2)}, ${Math.ceil(y2)})</p>`);
            $('#steps').append(`<br><p>P1 is inside switch P1 and P2</p>`);
            savep2['x'] = x1;
            savep2['y'] = y1;
            temp['x'] = x2;
            temp['y'] = y2;
            x2 = x1;
            y2 = y1;
            x1 = temp['x'];
            y1 = temp['y'];
            i = 2;
        }
        if (i === 1 && !p2code.includes(1)) {
            $('#steps').append(`<br><p>P1 = (${Math.ceil(x1)}, ${Math.ceil(y1)}); P2 = (${Math.ceil(x2)}, ${Math.ceil(y2)})</p>`);
            $('#steps').append(`<br><p>P2 is inside switch P1 and P2</p>`);
            temp['x'] = x2;
            temp['y'] = y2;
            x2 = x1;
            y2 = y1;
            x1 = temp['x'];
            y1 = temp['y'];
            savep2['x'] = x1;
            savep2['y'] = y1;
            i = 2;
        }
        $('#steps').append(`<br>New values<br><p>P1 = (${Math.ceil(x1)}, ${Math.ceil(y1)}); P2 = (${Math.ceil(x2)}, ${Math.ceil(y2)})</p>`);
        savep1['x'] = x1;
        savep1['y'] = y1;
        tempsum1 = sum1;
        savep1code = p1code;
        while (Math.abs(x2 - x1) > error || Math.abs(y2 - y1) > error) {
            xm = (x1 + x2) / 2;
            ym = (y1 + y2) / 2;
            console.log(xm + ' ' + ym);
            temp['x'] = x1;
            temp['y'] = y1;
            x1 = xm;
            y1 = ym;
            p1code = findOutCode(x1, y1);
            sum1 = sum(p1code);
            vflag = findVisibility(p1code, p2code);
            if (vflag === 1) {
                x1 = temp['x'];
                y1 = temp['y'];
                x2 = xm;
                y2 = ym;
                p2code = p1code;
                sum2 = sum1;
                p1code = findOutCode(x1, y1);
                sum1 = sum(p1code);
            }
        }
        if (i === 1) {
            savep2['x'] = xm;
            savep2['y'] = ym;
            x1 = xm;
            y1 = ym;
            x2 = savep1['x'];
            y2 = savep1['y'];
            sum2 = tempsum1;
            p2code = savep1code;
        }
        else {
            x1 = xm;
            y1 = ym;
            x2 = savep2['x'];
            y2 = savep2['y'];
        }
        p1code = findOutCode(x1, y1);
        p2code = findOutCode(x2, y2);
        sum1 = sum(p1code);
        sum2 = sum(p2code);
        vflag = findVisibility(p1code, p2code);
    }
    inter = findVisibility(p1code, p2code);
    console.log(x1 + " " + y1 + " " + x2 + ' ' + y2 + ' ' + inter);
    if (inter === 0 || inter === 2) {
        console.log('drawing')
        myLineCoordinates[0].x = x1;
        myLineCoordinates[0].y = y1;
        myLineCoordinates[1].x = x2;
        myLineCoordinates[1].y = y2;
    }
    return;
}


function logical(p1, p2) {
    var inter = 0;
    for (var i = 0; i < 4; i++) {
        inter += ((p1[i] + p2[i]) / 2);
    }
    return inter;
}













//cohen sutherland


function startCohenSutherland() {
    console.log(myLineCoordinates);
    console.log(rectCoordinates);
    cohenSutherland(myLineCoordinates[0]['x'], myLineCoordinates[0]['y'], myLineCoordinates[1]['x'], myLineCoordinates[1]['y']);
}


function cohenSutherland(x1, y1, x2, y2) {
    var windowCoord = [Math.min(rectCoordinates[0].x, rectCoordinates[1].x), Math.max(rectCoordinates[0].x, rectCoordinates[1].x), Math.min(rectCoordinates[0].y, rectCoordinates[1].y), Math.max(rectCoordinates[0].y, rectCoordinates[1].y)]
    console.log(windowCoord);
    var iflag = 1;
    var m;
    var p1code = findOutCode(x1, y1);
    var p2code = findOutCode(x2, y2);
    var vflag = findVisibility(p1code, p2code);
    var temp = {};
    var tempcode;
    var tempsum;
    var sum1 = sum(p1code);
    var sum2 = sum(p2code);
    var count = 0;

    if (vflag === 1) {
        return;
    }

    if (x2 === x1) {
        iflag = -1;
    }
    else if (y2 === y1) {
        iflag = 0
    }
    else {
        m = (y2 - y1) / (x2 - x1);
    }

    while (vflag === 2) {
        count++;
        for (var i = 1; i <= 4; i++) {
            if (p1code[4 - i] != p2code[4 - i]) {
                if (p1code[4 - i] === 0) {
                    temp['x'] = x1;
                    temp['y'] = y1;
                    x1 = x2;
                    y1 = y2;
                    x2 = temp['x'];
                    y2 = temp['y'];
                    tempcode = p1code;
                    p1code = p2code;
                    p2code = tempcode;
                    tempsum = sum1;
                    sum1 = sum2;
                    sum2 = tempsum;
                }
                if (iflag != -1 && i <= 2) {
                    y1 = m * (windowCoord[i - 1] - x1) + y1;
                    x1 = windowCoord[i - 1];

                    p1code = findOutCode(x1, y1);
                    sum1 = sum(p1code);
                }
                if (iflag != 0 && i > 2) {
                    if (iflag != -1) {
                        x1 = (1 / m) * (windowCoord[i - 1] - y1) + x1;
                    }
                    y1 = windowCoord[i - 1];
                    p1code = findOutCode(x1, y1);
                    sum1 = (p1code);
                }
                vflag = findVisibility(p1code, p2code);
                console.log(x1 + " " + y1 + " " + x2 + ' ' + y2 + ' ' + vflag);
                if (vflag === 0) {
                    //draw
                    console.log('drawing')

                    myLineCoordinates[0].x = x1;
                    myLineCoordinates[0].y = y1;
                    myLineCoordinates[1].x = x2;
                    myLineCoordinates[1].y = y2;
                    return;
                }
                if (vflag === 1) {
                    //exit
                    return;
                }
            }
        }
    }


}


function topEdge() {
    xt = ((yt - y1) / m) + x1;
    t1.x = xt;
    t1.y = yt;
}
function bottomEdge() {
    xb = ((yb - y1) / m) + x1;
    t1.x = xb;
    t1.y = yb;
}
function leftEdge() {
    yl = ((xl - x1) * m) + y1;
    t1.x = xl;
    t1.y = yl;
}
function rightEdge() {
    yr = ((xr - x1) * m) + y1;
    t1.x = xr;
    t1.y = yr;
}




//cyrus beck

function startCyrusBeck() {
    cyrusBeck(myLineCoordinates[0]['x'], myLineCoordinates[0]['y'], myLineCoordinates[1]['x'], myLineCoordinates[1]['y']);
}

function cyrusBeck(x1,y1,x2,y2) {
    var k=polyCoordinates.length;
    var d=[x2-x1,y2-y1];
    var f=polyCoordinates;
    var normals;
    var w,mi,ni;

    for(var i=0; i<k;i++) {
        
        ni=[];
    }

    console.log(polyCoordinates);

    for(var i=0; i<k;i++) {
        w=[x1-f[i].x, y1-f[i].y];



    }

}



function dotProduct(p1,p2) {
    var res=0;

    for(var i=0;i<2;i++) {
        res+=p1[i]*p2[i];
    }

    return res;
}