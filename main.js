var text_disp = document.querySelector("input");
noseX = 0;
noseY = 0;
noseXY = 0;
leftWristX = 0;
rightWristX = 0;
distance = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(400, 250);
    input = createInput();
    input.position(610, 230);
    textSize(10);
    //text("Enter Your Name", 610, 300);
    //fill("255");
    canvas = createCanvas(400, 400);
    canvas.position(520, 290);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Model successfully loaded 👍😎");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        distance = floor(leftWristX - rightWristX);
        console.log("nose x = " + noseX, "nose y = " + noseY);
        console.log("right wrist x = " + rightWristX, "left wrist x = " + leftWristX);
        console.log("Distance between the two hands is: " + distance);
    } else {
        console.error('No poses found');
    }
}

function textAdd() {
    user_text = Input.value();
    text(text_disp, noseX, noseY);
    textSize(distance);
}

function draw() {

    background("225,225,225");
    fill("black");
    textAdd();
}

