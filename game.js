var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4); // un numero al azar entre 0 y 3
    var randomChosenColour = buttonColours[randomNumber]; // cada numero al azar se enlaza con un color del array buttonColours
    gamePattern.push(randomChosenColour); // Se introduce el color al azar en un array

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  // destello sobre el color elegido al azar

    playSound(randomChosenColour);  //suena un sonido en funcion del color del boton

    level++;
    $("h1").text("Level " + level);
    
}
function playSound (name) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play()
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    function removeFont(){
        $("#" + currentColour).removeClass("pressed");
    }
    setTimeout(removeFont, 100);
}
var started = false;
var level = 0;

$(document).keydown(function(){
    if (!started)  { // si la variable started es verdadera, es decir si el juego ha empezado
        $("h1").text("Level 0");
        nextSequence();
        started = true;

    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");  // en el elemento que se hizo click guarda el "id" de ese elemento
    userClickedPattern.push(userChosenColour);   // el color del id añadelo al array userclickedpattern

    playSound(userChosenColour); // se reproduce un sonido cada vez que el cliente pica sobre el boton

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("BIEN");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout (function() {nextSequence();} ,1000);
        }


    } else {
        console.log("MAL");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){ $("body").removeClass("game-over");}, 1000);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}








