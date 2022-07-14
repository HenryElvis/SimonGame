var userClickedPattern = [];
var gamePattern = [];

var buttonColor = ["red", "blue", "green", "yellow"];

var audio = new Audio();

var gameStart = false;
var level = 0;

function NextSequence()
{
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeToggle(100).fadeToggle(100);
    PlayingSoung(randomChosenColor);
}

function PlayingSoung(sound)
{
    audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function AnimationPressed(currentColor)
{
    $("#" + currentColor).toggleClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).toggleClass("pressed");
    }, 100 );
}

function CheckAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(NextSequence(), 1000);
        }
    }
    else
    {
        PlayingSoung("wrong");
        $("body").toggleClass("game-over");

        setTimeout(function () {
            $("body").toggleClass("game-over");
        }, 200);

        StartOver();
    }
}

function StartOver()
{
    level = 0;
    gamePattern = [];
    gameStart = false;

    $("#level-title").text("Press A Key To Start");
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    PlayingSoung(userChosenColor);
    AnimationPressed(userChosenColor);
    CheckAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function (event) {
    if (!gameStart)
    {
        NextSequence();
        gameStart = true;
    }
});