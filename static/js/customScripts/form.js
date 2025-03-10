$(document).ready(function () {
  generateCaptcha();

  function generateCaptcha() {
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    var answer = num1 + num2;

    $("#captcha-question").text("What is " + num1 + " + " + num2 + " ?");
    $("#captcha-answer").val(answer);
  }

  $("#refresh-btn").click(function () {
    generateCaptcha();
  });

  $("#submit-btn").click(function () {
    var userInput = parseInt($("#captcha").val());
    var correctAnswer = parseInt($("#captcha-answer").val());

    if (userInput === correctAnswer) {
      alert("CAPTCHA solved successfully!");
      generateCaptcha();
    } else {
      alert("Incorrect answer! Please try again.");
      $("#captcha").val("");
    }
  });
});
