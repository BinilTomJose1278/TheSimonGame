//array for represnting the four colours
var buttonColours=["red","blue","green","yellow"];
// creating a new array
var userClickedPattern=[];
var gamePattern =[];
// A counter variable to check whether the game has started or not
var started= false;
// Initialing first that the level is 0
var  level=0;
// when any of the keys get pressed the game starts
$(document).keypress(function(){
if(!started){
    $("#level-title").text("Level  " + level);
    nextSequence();
    started=true;
}
});
// Using jquery to detect any of the buttons were clicked 
$(".btn").click( function(){
    // store the id of the button that got clicked
var userChosenColour= $(this).attr("id");
// push the contents of userClickedPattenPattern to userChosenColour
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
   
           
           setTimeout(function () {
             nextSequence();
           }, 1000);
   
         }
    }
    else{
        console.log("failure");
        playSound("wrong");
        $("body").addClass("game-over");
            setTimeout(function(){
               $("body").removeClass("game-over");
            },200);
   
    $( "#level-title").text("Game Over, press any key to restart");
    startOver();
    }
   }

function nextSequence(){
    // The value gets incremented after the function call of nextSequence
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level" + level);
    //Checking randomly for the four colours
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //  Select the button with same id as randomChosenColour ,for producing the slight fade when the key is pressed
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   
}
// the function which plays the sound when the corresponding button is pressed
function playSound(name){
    var audio= new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColour){
 $("#" + currentColour).addClass("pressed");
 setTimeout(function() {
$("#"+currentColour).removeClass("pressed");
}, 100);
}
function startOver(){
    level = 0;
    gamePattern = [];
    started=false;
    }

