let output;

for(let i = 0; i < 10000; i++) { output += Math.random() >= 0.5? '/': '\\'; }

console.log(output);