'use strict';

let typeBox = document.querySelector('.typethis');
let inputBox = document.querySelector('.input');
let wordsAnsweredBox = document.querySelector('.wordsAnswered');

let phrases = ['anti', 'de', 'dis', 'en', 'em', 'fore', 'in', 'im', 'il', 'ir', 'inter', 'mid', 'mis', 'non', 'over', 'pre', 're', 'semi', 'sub', 'super', 'trans', 'un', 'under', 'able', 'ible', 'al', 'ial', 'ed', 'er', 'est', 'ful', 'ic', 'ing', 'ion', 'tion', 'ation', 'ition', 'ity', 'ty', 'ive', 'ative', 'itive', 'less', 'ly', 'ment', 'ness', 'ous', 'eous', 'ious', 's', 'es', 'y'];
let phrase;
let wordsAnswered = 0;

function check() {	
	let input = inputBox.value;
	let correctLetters = 0;
	
	for(let letter in input) {
		if(input[letter] == phrase[letter]) {
			correctLetters++;
		}
	}
	
	if(correctLetters < phrase.length) {
		typeBox.style.background = 'red';
		inputBox.value = '';
	} else {
		pickString();
		wordsAnswered++;
		wordsAnsweredBox.innerHTML = `Words Answered: ${wordsAnswered}`
	}
}

function pickString() {	
	typeBox.style.background = '#3b7fed';
	
	phrase = phrases[Math.round(Math.random() * (phrases.length - 1))];
	
	inputBox.value = '';
	typeBox.innerHTML = '';
	for (let letter in phrase) {
		typeBox.innerHTML += phrase[letter];
	};
}

window.addEventListener('keypress', function(event) {if(event.keyCode == '13') {check()};});

pickString();


//formula for WPM
//(wordsTyped/(minutes*60 + spareSeconds)) * 60