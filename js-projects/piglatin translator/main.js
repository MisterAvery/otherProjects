"use strict";

const input = document.querySelector('#input');
const output = document.querySelector('#output');

function encript() {
		let inString = input.value;
		let words = [];
		let index = 0;
		
		for(let letter in inString) {
				if(words[index] == ' ') {
						words.push('');
						index++;
				} 
				
				if(letter == 0) {
					words.push(inString[letter]);
				} else {
					words[index] += inString[letter];
				}
		}
		
		console.log(words);
}