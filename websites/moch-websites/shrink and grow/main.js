let btn = document.getElementById('sizeChanger');
let text = document.getElementById('text');

btn.addEventListener('click', () => {
  if(text.style.height == '105px') {
    text.style.height = '100%';
  } else {
    text.style.height = '105px';
  }
});