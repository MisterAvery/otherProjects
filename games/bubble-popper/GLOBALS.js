const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.font = '45px sans-serif';

const width = canvas.width;
const height = canvas.height;
const clientRect = canvas.getBoundingClientRect();

let score = 0;
let frameCount = 0;

let mouse = {
  x: width / 2,
  y: height / 2,
  click: false
};