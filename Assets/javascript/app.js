$("#start").on("click", function() {
  $("#start").remove();
  game.loadQuestion();
})

$(document).on("click",".answer-button", function(e){
    game.clicked(e);
})

$(document).on("click","#reset", function(e){
  game.reset();
})

var questions = [{
  question: "In what 2 consecutive years did Duke win back-to-back National Championships?",
  answers: ["71'/72'", "88'/89'", "91'/92'", "10'/11", "15'/16'"],
  correctAnswer: "91'/92'",
  image:""
}, 
{
  question: "When was the last year that Duke won the National Championship??",
  answers: ["1972'", "2001'", "1992'", "2011", "2015"],
  correctAnswer: "2015",
  image:""
}, 
{
  question: "What year did Coach K take over as Duke men's basketball head coach?",
  answers: ["1980", "1981", "1982", "1983", "1984"],
  correctAnswer: "1980",
  image:""
}, 
{
  question: "How many National Championships does Duke men's basekball have?",
  answers: ["7", "5", "1", "3", "11"],
  correctAnswer: "5",
  image:""
}, 
{
  question: "What is the name of the stadium that is home to Duke men's basketball?",
  answers: ["Carrier Dome", "Rupp Arena", "Dean Dome", "Cameron Indoor", "KFC Yum! Center"],
  correctAnswer: "Cameron Indoor",
  image:""
}];

var game = {
  correct:0,
  incorrect:0,
  questions:questions,
  currentQuestion:0,
  unanswered:0,
  counter:30,
  
 

  countdown: function(){
    game.counter--;
    $("#counter").html(game.counter);
    if(game.counter<0){
      game.timesOut();
    }
},
  loadQuestion: function(){
    timer = setInterval(game.countdown,1000);
    $("#body").html("<h2 id='counter'>30</h2>");
    $("#body").append("<h2>" + questions[game.currentQuestion].
      question + "</h2>");
      for (var i=0; i < questions[game.currentQuestion].answers.length; i++) {
        $("#body").append('<button class="answer-button" id = "button-' + i + '" data-name="'+questions[game.
          currentQuestion].answers[i] + '">' + questions[game.
          currentQuestion].answers[i] + '</button>');
      }
},
  nextQuestion: function(){
    game.currentQuestion++;
    game.counter = 30;
    $("#counter").html(game.counter);
    game.loadQuestion();
},
  timesOut: function(){
    clearInterval(timer);
    game.unanswered++;
    $("#body").html("<h2>Time's UP!!!</h2>");
    $("#body").append("<h3>Nope! " + questions[game.currentQuestion].correctAnswer +
     " was the correct answer</h3>");
     if(game.currentQuestion==questions.length-1) {
      setTimeout(game.results, 3*1000);
    } else {
      setTimeout(game.nextQuestion,3*1000);
    }
},
  results: function(){
    clearInterval(timer);
    $("#body").append("<h3>Right: " + game.correct + "</h3>");
    $("#body").append("<h3>Wrong: " + game.incorrect + "</h3>");
    $("#body").append("<h3>Unanswered: " + game.unanswered + "</h3>");
    $("#body").html("<h2>Game's Over!</h2>");
    $("#body").append("<button id='reset'>RESET</button>")
  
},
  clicked: function (e){
    clearInterval(timer);
    if($(e.target).data("name")==questions[game.currentQuestion].
      correctAnswer){
        game.answeredCorrectly();
    } else {
        game.answeredIncorrectly();
    }
},
  answeredCorrectly: function(){
    $("#body").html("<h2>Correct Answer!!!</h2>");
    game.correct++;
    clearInterval(timer);
    if(game.currentQuestion==questions.length-1) {
      setTimeout(game.results, 3*1000);
    } else {
      setTimeout(game.nextQuestion,3*1000);
    }
},
  answeredIncorrectly: function(){
  clearInterval(timer);
  game.incorrect++;
  $("#body").html("<h2>Not even close!!!</h2>");
  $("#body").append("<h3>Nope! " + questions[game.currentQuestion].correctAnswer +
  " was the correct answer</h3>");
  if(game.currentQuestion==questions.length-1) {
    setTimeout(game.results, 2*1000);
  } else {
    setTimeout(game.nextQuestion,2*1000);
  };
},
reset: function(){
  game.correct = 0;
  game.incorrect = 0;
  game.currentQuestion = 0;
  game.counter = 30;
  game.unanswered = 0;
  game.loadQuestion();
}}



