let angle = 0;

function preload () {
    gateway3D = loadModel("/static/3D/gateway.obj")
}

function setup() {
    createCanvas(400,300, WEBGL);
}

function draw() {
    background(0);
    ambientLight(100);
    directionalLight(255, 255, 255, 0,0,1);
    rotateY(0.6)
    model(gateway3D)
    angle +=0.03
}