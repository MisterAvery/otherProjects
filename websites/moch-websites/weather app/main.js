//"use strict";
//
//const 
//	city = document.querySelector('.city'), 
//	temp = document.querySelector('#temp'), 
//	wind = document.querySelector('#wind_speed'), 
//	feels_like = document.querySelector('#feels_like'),
//	vis = document.querySelector('#vis'),
//	img = document.querySelector('img'),
//
//	imgs = [
//		'https://cdn1.iconfinder.com/data/icons/weather-189/64/weather-icons-rainy-2-512.png', //rain
//		'https://icons-for-free.com/iconfiles/png/512/sunny+weather+icon-1320196485639229368.png', //sunny
//		'https://cdn.iconscout.com/icon/free/png-512/cloud-3257-432087.png', //clear
//		'https://png.pngtree.com/svg/20160401/cloudy_and_cloudy_164537.png', //cloudy
//		'https://www.pngkit.com/png/full/75-756217_storm-icon-thunderstorm-png-png-images-storm-icon.png', //thunder
//	];
//
//setInterval(function() {
//	fetch('http://api.openweathermap.org/data/2.5/weather?q=Southern%20Pines,usa&appid=1a63b31fa752648c49caa682197af3d8')
//		.then(res => res.json())
//		.then(data => gotData(data));	
//	
//	console.log(data);
//}, 1000);
//
//
//function gotData(data) {
//	city.innerHTML = data.name;
//	temp.innerHTML = 'Temp: ' + convert(data.main.temp);
//	wind.innerHTML = 'Wind Speed: ' + data.wind.speed;
//	feels_like.innerHTML = 'Feels Like: ' + convert(data.main.feels_like);
//	vis.innerHTML = 'Visibility: ' + Math.round(data.visibility / 10)/100;
//	
//	img.src = determineSrc(data.weather[0].main);
//}
//
//function convert(num) {
//	return Math.round((num - 273.15) * 9/5 + 32);
//}
//
//function determineSrc(data) {
//	switch(data) {
//		case 'Rain':
//			return imgs[0];
//			break;
//		
////		case 'Clear':
////			return imgs[1];
////			break;
//		
//		case 'Clear':
//			return imgs[2];
//			break;
//		
//		case 'Clouds':
//			return imgs[3];
//			break;
//		
////		case 'Clear':
////			return imgs[4];
////			break;
//		
//		
//	}
//}