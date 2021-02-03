// Cistercian Clock
// https://github.com/ednl/cistercian-clock
// https://en.wikipedia.org/wiki/Cistercian_numerals

// grid square size in pixels
// set with query parameter ?size=...
let SIZE = 50;

// (x,y) coordinate pairs of the symbol path for units
// where (0,0) is top-centre and (1,0) is top-right
const sympath = [
    [],                // 0
    [0,0,1,0],         // 1
    [0,1,1,1],         // 2
    [0,0,1,1],         // 3
    [0,1,1,0],         // 4
    [0,0,1,0,0,1],     // 5
    [1,0,1,1],         // 6
    [0,0,1,0,1,1],     // 7
    [0,1,1,1,1,0],     // 8
    [0,0,1,0,1,1,0,1]  // 9
];

function digit(d) {
    let p;
    if (p = sympath[d]) {
        beginShape();
        for (let i = 0; i < p.length; i += 2) {
            vertex(p[i], p[i + 1]);
        }
        endShape();
    }
}

function symbol(x) {
    // base line
    line(0, 0, 0, 3);
    
    // units, top-right
    let n = Math.round(x);
    let m = n % 10;
    digit(m);

    // tens, top-left
    scale(-1, 1);
    n = (n - m) / 10;
    m = n % 10;
    digit(m);
  
    // hundreds, bottom-right
    translate(0, 3);
    scale(-1, -1);
    n = (n - m) / 10;
    m = n % 10;
    digit(m);

    // thousands, bottom-left
    scale(-1, 1);
    n = (n - m) / 10;
    m = n % 10;
    digit(m);
  
    // reset position and orientation
    translate(0, 3);
    scale(-1, -1);
}

function setup() {
    const s = parseInt((new URL(document.location)).searchParams.get("size"));
    if (!isNaN(s) && s > 0) {
        SIZE = s;
    }
    createCanvas(SIZE * 13, SIZE * 5);
    noFill();
}

function draw() {
    // clear
    background(15);

    // grid
    stroke(0);
    strokeWeight(1);
    for (let i = 1; i < 5; ++i) {
        line(0, i * SIZE, width, i * SIZE);
    }
    for (let i = 1; i < 13; ++i) {
        line(i * SIZE, 0, i * SIZE, height);
    }

    // clock
    scale(SIZE, SIZE);
    strokeWeight(0.3);
    stroke(102, 255, 51);  // green

    const d = new Date();
    const year = d.getFullYear();
    const date = (d.getMonth() + 1) * 100 + d.getDate();
    const time = d.getHours() * 100 + d.getMinutes();
    const sec = d.getSeconds();

    translate(2, 1);
    symbol(year);

    translate(3, 0);
    symbol(date);

    translate(3, 0);
    symbol(time);

    translate(3, 0);
    symbol(sec);
}
