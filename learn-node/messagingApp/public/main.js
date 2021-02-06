let socket = io.connect('http://penguin.linux.test:3000/');

const holder = document.querySelector('.messages'),
			username = document.querySelector('.username'),
			message = document.querySelector('.message'),
			btn = document.querySelector('.send');

holder.innerHTML = '';

btn.addEventListener('click', function() {
	socket.emit('message', {
		username: username.value,
		message: message.value,
		id: socket.id
	});
	
	message.value = '';
});

socket.on('message', function(obj) {
  let sender = (obj.id == socket.id)? 'mine':'other';
	holder.innerHTML += `<p class=${sender}><strong>${obj.username}: </strong>${obj.message}</p>`;
});