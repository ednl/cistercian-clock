// Cistercian numerals

const cist = [
    [],                 // 0
    [0,0,1,0],          // 1
    [0,1,1,1],          // 2
    [0,0,1,1],          // 3
    [0,1,1,0],          // 4
    [0,0,1,0,0,1],      // 5
    [1,0,1,1],          // 6
    [0,0,1,0,1,1],      // 7
    [0,1,1,1,1,0],      // 8
    [0,0,1,0,1,1,0,1],  // 9
];

function setup() {
    createCanvas(650, 250);
    stroke(0);
    noFill();
}

function digit(d) {
    //console.log(d);
    beginShape();
    for (let i = 0; i < cist[d].length; i += 2) {
        vertex(cist[d][i], cist[d][i + 1]);
    }
    endShape();
}

function num(x) {
    line(0, 0, 0, 3);
    let n = Math.round(x);
    let m = n % 10;
    digit(m);

    // tens
    scale(-1, 1);
    n = (n - m) / 10;
    m = n % 10;
    digit(m);
  
    // hundreds
    translate(0, 3);
    scale(-1, -1);
    n = (n - m) / 10;
    m = n % 10;
    digit(m);

    // thousands
    scale(-1, 1);
    n = (n - m) / 10;
    m = n % 10;
    digit(m);
  
    // reset
    translate(0, 3);
    scale(-1, -1);
}

function draw() {
    background(20);
    stroke(0);
    strokeWeight(1);
    for (let i = 1; i < 5; ++i) {
        line(0, i * 50, 650, i * 50);
    }
    for (let i = 1; i < 13; ++i) {
        line(i * 50, 0, i * 50, 250);
    }
    scale(width / 13, height / 5);
    strokeWeight(75 / height);
    stroke(102, 255, 51);

    const d = new Date();
    const year = d.getFullYear();
    const date = (d.getMonth() + 1) * 100 + d.getDate();
    const time = d.getHours() * 100 + d.getMinutes();
    const sec = d.getSeconds();

    translate(2, 1);
    num(year);

    translate(3, 0);
    num(date);

    translate(3, 0);
    num(time);

    translate(3, 0);
    num(sec);
}
