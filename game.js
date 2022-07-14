//some variable of arrays that will be used to store colors
var global = this; // to set a global variable
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var firstKeyInput = [""];
var level = 0;
var currLevel = 0;

//checking if any key is pressed to start the gamePatter
if (firstKeyInput.length === 1) {
  $(document).keypress(function(event) {
    if (firstKeyInput.length === 1) {
      nextSequence();
      firstKeyInput.push(event.key);
    }
  });
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  currLevel = 0;
}

//checking players answer
function checkAnswer() {
  if (this.currLevel < level) {
    if (userClickedPattern[this.currLevel] === gamePattern[this.currLevel]) {
      console.log("correct");
      currLevel++;
      // console.log(userClickedPattern);
      // console.log(gamePattern);
    } else if (userClickedPattern[currLevel] !== gamePattern[currLevel]) {
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over")
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      firstKeyInput = [];

      $(document).keypress(function(event) {
        console.log("now its here");
        firstKeyInput.push(event.key);
        if (firstKeyInput.length === 1) {
          startOver();
          nextSequence();
        }
      });
    }
  }

  if (this.currLevel === level) {
    this.currLevel = 0;
    userClickedPattern = [];
    nextSequence();
  }

}

//producing random number to get random color based on its index number
function nextSequence() {
  level += 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour); //calling a function to play a sound that match each color
  animatePress(randomChosenColour); //calling a function to animate the box
}

//to activate a function whenever a button with specific ID is clicked
$(".btn").click(function() {
  var userChosenColour = (this.id);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour); //calling a function to play a sound that match each color
  animatePress(userChosenColour); //calling a function to animate the box
  checkAnswer(); //call a function to check the player's answers
});

//play sound based on their ID
function playSound(name) {
  if (name === "red") {
    $('#red').fadeOut(100).fadeIn(100);
    var red = new Audio("sounds/red.mp3");
    red.play();
  } else if (name === "blue") {
    $('#blue').fadeOut(100).fadeIn(100);
    var blue = new Audio("sounds/blue.mp3");
    blue.play();
  } else if (name === "green") {
    $('#green').fadeOut(100).fadeIn(100);
    var green = new Audio("sounds/green.mp3");
    green.play();
  } else if (name === "yellow") {
    $('#yellow').fadeOut(100).fadeIn(100);
    var yellow = new Audio("sounds/yellow.mp3");
    yellow.play();
  }
}

//a function to differentiate a block of color when its clicked
function animatePress(currentColour) {
  //console.log(currentColour);
  switch (currentColour) {
    case 'red':
      $('#red').addClass('pressed');
      setTimeout(function() {
        $('#red').removeClass('pressed')
      }, 100);
      break;

    case 'blue':
      $('#blue').addClass('pressed');
      setTimeout(function() {
        $('#blue').removeClass('pressed')
      }, 100);
      break;

    case 'green':
      $('#green').addClass('pressed');
      setTimeout(function() {
        $('#green').removeClass('pressed')
      }, 100);
      break;

    case 'yellow':
      $('#yellow').addClass('pressed');
      setTimeout(function() {
        $('#yellow').removeClass('pressed')
      }, 100);
      break;
  }
}
