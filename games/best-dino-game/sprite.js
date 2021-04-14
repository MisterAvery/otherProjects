function Sprite(PATH, colNum, w, h) {
  let img = document.createElement('IMG');
  img.src = PATH;
  
  return {
    img: img,
    colW: w / colNum,
    w: w,
    h: h
  };
}