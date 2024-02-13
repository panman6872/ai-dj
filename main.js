song = "";

function preload() {
    song = loadSound('music.mp3')
}
leftWristX = 0;
leftWristY = 0;

RightWristX = 0;
RightWristY = 0;

function setup() {
    canvas = createCanvas(700, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log('PoseNet Is Intialized');

}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = "+leftWristX +", leftWristY = "+leftWristY);

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = "+RightWristX +", RightWristY = "+RightWristY);
    }
}

function draw() {
    image(video, 0, 0, 700, 500);

    fill("#FF0000");
    stroke("#FF0000");

    circle(leftWristX, leftWristY, 28);

    InNumberleftWristY = Number(leftWristY);
    dividVolume = InNumberleftWristY/500;
    volume = dividVolume.toFixed(2);
    console.log(volume);
    document.getElementById("volume").innerHTML = "Volume ="+ volume;
    song.setVolume(volume);
}

function play() {
    song.play()
    song.rate(1);
}

function stop() {
    song.stop()
}

function pause() {
    song.pause()
}