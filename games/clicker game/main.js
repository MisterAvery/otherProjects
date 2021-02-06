const ghostBtn = document.getElementById('clicker');
const ghostCounter = document.getElementById('ghostCount');
const plsmaCounter = document.getElementById('plasmaCounter');
const popup = document.getElementById('modalBg');
const saveBox = document.getElementById('saveOutputBox');


let ghosts = 0;
let plasma = 0;
let oldNets = 0;
let bigNets = 0;
let biggestNets = 0;
let ghostNets = 0;
let ghostTraps = 0;
let ionCannons = 0;
let plasmaCannons = 0;
let ghostBusters = 0;

let GPS = 0;
let saveCode;

function ghostClicked() {
  ghosts++;
}

function convert(amnt) {
  if(ghosts >= amnt) {
    ghosts -= amnt;
    plasma += amnt/10;
  }
}

function getSave() {
  saveCode = [ghosts, plasma, oldNets, bigNets, biggestNets, ghostNets, ghostTraps, ionCannons, plasmaCannons, ghostBusters];
  
  popup.style.display = 'block';
  
  saveBox.innerHTML= saveCode;
}

function closeModal() {
  // if(document.getElementById('savecodeInput').innerHTML !== '') {
  //   saveCode = [];
  // }
  
  popup.style.display = 'none';
}

function buyItem(itemPrice, gpsVal) {
  if(plasma >= itemPrice) {
    plasma -= itemPrice;
    GPS += gpsVal;
  }
}

setInterval(() => {
  ghostCounter.innerHTML = `You Have ${ghosts} Ghosts`;
  plsmaCounter.innerHTML = `You Have ${plasma} Plasma`;
  
  ghosts += GPS/5;
}, 1000/15);