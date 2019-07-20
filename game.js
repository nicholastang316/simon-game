var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function () {
  if(!started)
  {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];

  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound (name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress (currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer (currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    if(gamePattern.length === userClickedPattern.length)
    {
      setTimeout(function () {
        nextSequence();
      },1000);
    }
  }
  else
  {
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver () {
  started = false;
  level = 0;
  gamePattern = [];

}
