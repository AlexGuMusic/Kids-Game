var canvas = document.getElementById('stage'),
	word = document.getElementById('word'),
	letters = document.getElementById('letters'),
	wordToGuess,
	wordLength,
	badGuesses,
	correctGuesses;

function init() {
	var helptext = $('#helptext'),
		w = screen.availWidth <= 800 ? screen.availWidth : 800;
	
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
	
	if (screen.innerWidth >= 700) {
		canvas.getContext('2d').scale(1.5, 1.5);
	}
	
}


function newGame() {
	var placeholders = '',
		frag = document.createDocumentFragment(),
		abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	badGuesses = 0;
	correctGuesses = 0;
	wordToGuess = getWord();
	wordLength = wordToGuess.length;
	
	for (var i = 0; i < wordLength; i++) {
		placeholders += '_';
	}
	word.innerHTML = placeholders;	

		letters.innerHTML = '';
	for (i = 0; i < 26; i++) {
		var div = document.createElement('div');
		div.style.cursor = 'pointer';
		div.innerHTML = abc[i];
		div.onclick = getLetter;
		frag.appendChild(div);
	}
	letters.appendChild(frag);
	drawCanvas();
	
}

function getLetter() {

 	checkLetter(this.innerHTML);
	this.innerHTML = '&nbsp;';
	this.style.cursor = 'default';
	this.onclick = null;
 }
 
function checkLetter(letter) {
	var placeholders = word.innerHTML,
	    wrongGuess = true;
			placeholders = placeholders.split('');	
	for (var i = 0; i < wordLength; i++) {
		if (wordToGuess.charAt(i) == letter.toLowerCase()) {
			placeholders[i] = letter;
			wrongGuess = false;
			correctGuesses++;
			if (correctGuesses == wordLength) {
				drawCanvas();
			}
		}
	}
	if (wrongGuess) {
		badGuesses++;
		drawCanvas();
	}
	word.innerHTML = placeholders.join('');
		
}

function drawCanvas() {
	var c = canvas.getContext('2d');
		canvas.width = canvas.width;
	c.lineWidth = 10;
	c.strokeStyle = 'green';
	c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
	c.fillStyle = 'red';
	drawLine(c, [20,190], [180,190]);
	if (badGuesses > 0) {
		c.strokeStyle = '#A52A2A';
		drawLine(c, [30,185], [30,10]);
		if (badGuesses > 1) {
			c.lineTo(150,10);
			c.stroke();
		}
		if (badGuesses > 2) {
			c.strokeStyle = 'black';
			c.lineWidth = 3;
			drawLine(c, [145,15], [145,30]);
			c.beginPath();
			c.moveTo(160, 45);
			c.arc(145, 45, 15, 0, (Math.PI/180)*360);
			c.stroke(); 
		}
		if (badGuesses > 3) {
			drawLine(c, [145,60], [145,130]);
		}
		if (badGuesses > 4) {
			drawLine(c, [145,80], [110,90]);
		}
		if (badGuesses > 5) {
			drawLine(c, [145,80], [180,90]);
		}
		if (badGuesses > 6) {
			drawLine(c, [145,130], [130,170]);
		}
		if (badGuesses > 7) {
			drawLine(c, [145,130], [160,170]);
			c.fillText('Game over', 45, 110);
			letters.innerHTML = '';
			setTimeout(showResult, 200);
			localStorage.setItem('hangmanLose', 1 + parseInt(localStorage.getItem('hangmanLose')));
			setTimeout(showScore, 2000);
		}
	}
	if (correctGuesses == wordLength) {
		letters.innerHTML = '';
		c.fillText('You won!', 45,110);
		localStorage.setItem('hangmanWin', 1 + parseInt(localStorage.getItem('hangmanWin')));
		setTimeout(showScore, 2000);
}
}



function drawLine(context, from, to) {
	context.beginPath();
	context.moveTo(from[0], from[1]);
	context.lineTo(to[0], to[1]);
	context.stroke();
}

function showResult() {
	var placeholders = word.innerHTML;
    placeholders = placeholders.split('');
	for (i = 0; i < wordLength; i++) {
		if (placeholders[i] == '_') {
			placeholders[i] = '<span style="color:red">' + wordToGuess.charAt(i).toUpperCase() + '</span>';
		}
	}
	word.innerHTML = placeholders.join('');
}


function showScore() {
	var won = localStorage.getItem('hangmanWin'),
	    lost = localStorage.getItem('hangmanLose'),
		c = canvas.getContext('2d');
	canvas.width = canvas.width;
	c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
    c.fillStyle = 'red';
	c.textAlign = 'center';
	c.fillText('YOUR SCORE', 100, 50);
	c.font = 'bold 18px Optimer, Arial, Helvetica, sans-serif';
	c.fillText('Won: ' + won + ' Lost: ' + lost, 100, 80);
}

function resetScore() {
	localStorage.setItem('hangmanWin', '0');
	localStorage.setItem('hangmanLose', '0');
	showScore();
}


function getWord() {
  var a = new Array('car','ball','cat','sea', 'the','of','and','a','to','in','is','you','that','it','he','was','for','on','are','as','with','his','they','I','at','be','this','have','from','or','one','had','by','word','but','not','what','all','were','we','when','your','can','said','there','use','an','each','which','she','do','how','their','if','will','up','other','about','out','many','then','them','these','so','some','her','would','make','like','him','into','time','has','look','two','more','write','go','see','number','no','way','could','people','my','than','first','water','been','call','who','oil','its','now','find','long','down','day','did','get','come','made','may','part');
  return a[parseInt(Math.random()* a.length)];
}