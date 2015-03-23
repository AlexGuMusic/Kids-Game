var canvas = document.getElementById('stage'),
 word = document.getElementById('word'),
 letters = document.getElementById('letters'),
 wordToGuess,
 wordLength,
 badGuesses,
 correctGuesses;
 
 function init() { 
 var helptext = $('#helptext'),
 w = screen.availWidth <= 800 ? screen.availWidth : 800; // Hide the loading message and display the control buttons
 $('#loading').hide();
 $('#play').css('display', 'inline-block').click(newGame);
 $('#clear').css('display', 'inline-block').click(resetScore);
 $('#help').click(function(e) {
 $('body').append('<div id="mask"></div>');
 helptext.show().css('margin-left', (w-300)/2 + 'px');
 });
$('#close').click(function(e) {
 $('#mask').remove();
 helptext.hide();
 });
 
 }
 
 function newGame() {
 var placeholders = '',
 frag = document.createDocumentFragment(),
 abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M', 'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
 }
 function resetScore() {
 alert('Score has been reset'); 
 }