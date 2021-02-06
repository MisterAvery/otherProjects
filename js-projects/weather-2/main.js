const zipInput = document.querySelector('#zip-input');

const icons = {
  sunny: './assets/sunny.jpg',
  clear: './assets/sunny.jpg',
  rain: './assets/rain.jpg',
  clouds: './assets/cloudy.jpg',
  snow: './assets/snowy.jpg',
  mist: './assets/rainy.jpg',
  fog: './assets/rainy.jpg'
};

const bgs = {
  sunny: 'https://cdn.pixabay.com/photo/2018/08/24/23/33/panorama-3629120__340.jpg',
  clear: 'https://cdn.pixabay.com/photo/2018/08/24/23/33/panorama-3629120__340.jpg',
  rain: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Rainy_Weather_On_My_Village_%28224889743%29.jpeg',
  clouds: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Rainy_Weather_On_My_Village_%28224889743%29.jpeg',
  snow: 'https://cdn.pixabay.com/photo/2019/12/02/22/00/snow-4668799__340.jpg',
  mist: 'https://s0.geograph.org.uk/geophotos/01/52/66/1526640_9d5f6aa1.jpg',
  fog:  'https://s0.geograph.org.uk/geophotos/01/52/66/1526640_9d5f6aa1.jpg'
};

function togglePopup() {
  document.querySelector('#popup-bg').classList.toggle('active');
}

function zipButtonClick() {
  let userZip = zipInput.value;
  
  if(stringIsValid(userZip)) {
    togglePopup();
    setInterval(getData(userZip), 60000);
  } else {
    alert('Please Enter a Valid Zipcode');
    zipInput.value = '';
  }
}

function stringIsValid(str) {
  return (str.length == 5 && !isNaN(str));
}

function getData(zip) {
  let weatherDataPromise = new Promise(function(resolve, reject) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=1a63b31fa752648c49caa682197af3d8&units=imperial`)
      .then(response => response.json())
      .then(weatherData => resolve(weatherData));
  });
  
  // let imageDataPromise = new Promise(function(resolve, reject) {
  //   fetch('https://pixabay.com/api/?key=20035448-9a9d3f9031980b539bf0d37d1&q=fog+trees&image_type=photo')
  //     .then(response => response.json())
  //     .then(imageData => resolve(imageData));
  // });
  
  Promise.all([weatherDataPromise])
    .then(values => {
      recivedData(values);
    });
}
  
function recivedData(data) {
  const weatherData = data[0];
  // const imageData = data[1];
  
  let weatherType = weatherData.weather[0].main;

  document.querySelector('#weather-icon').style = `background: url(${icons[weatherType.toLowerCase()]}); background-size: cover; background-position: center;`;
  
  document.body.style = `background: url(${bgs[weatherType.toLowerCase()]}); background-size: cover; background-position: left center;`;
  
  setElm('#weather-type', '',              weatherType);
  setElm('#area',         'Weather For ',  weatherData.name);
  
  setElm('#one',          'Temperature: ', Math.floor(weatherData.main.temp),       false);
  setElm('#two',          'Heat Index: ',  Math.floor(weatherData.main.feels_like), false);
  setElm('#three',        'Low: ',         Math.floor(weatherData.main.temp_min),   false);
  setElm('#four',         'High: ',        Math.floor(weatherData.main.temp_max),   false);
  setElm('#five',         'Hummidity: ',   Math.floor(weatherData.main.humidity),   false);
}

function setElm(DOMpath, sentence, info, useInnerText = true) {
  const elm = document.querySelector(DOMpath);
  
  if(useInnerText) elm.innerText = sentence + info;
  else elm.innerHTML = `<span>${sentence}</span> ${info}`;
}