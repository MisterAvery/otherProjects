let tileTypes = {
  17: {//door
    top: false,
    left: false,
    bottom: false,
    right: false,
  },
  
  16: {//none ground
    top: false,
    left: false,
    bottom: false,
    right: false,
  },

  0: {//none air
    top: false,
    left: false,
    bottom: false,
    right: false,
  },

  1: {//top, left, bottom
    top: true,
    left: true,
    bottom: true,
    right: false,
  },

  2: {//top, left, right
    top: true,
    left: true,
    bottom: false,
    right: true,
  },

  3: {//top and left
    top: true,
    left: true,
    bottom: false,
    right: false,
  },

  4: {//top, bottom, right
    top: true,
    left: false,
    bottom: true,
    right: true,
  },

  5: {//top and bottom
    top: true,
    left: false,
    bottom: true,
    right: false,
  },

  6: {//top and right
    top: true,
    left: false,
    bottom: false,
    right: true,
  },

  7: {//top
    top: true,
    left: false,
    bottom: false,
    right: false,
  },

  8: {//left, bottom, right
    top: false,
    left: true,
    bottom: true,
    right: true,
  },

  9: {//left and bottom
    top: false,
    left: true,
    bottom: true,
    right: false,
  },

  10: {//left and right
    top: false,
    left: true,
    bottom: false,
    right: true,
  },

  11: {//left
    top: false,
    left: true,
    bottom: false,
    right: false,
  },

  12: {//bottom and right
    top: false,
    left: false,
    bottom: true,
    right: true,
  },

  13: {//bottom
    top: false,
    left: false,
    bottom: true,
    right: false,
  },

  14: {//right
    top: false,
    left: false,
    bottom: false,
    right: true,
  },

  15: {//all
    top: true,
    left: true,
    bottom: true,
    right: true,
  },
};

// const birthThreshold = 6;//amount of caves
// const survivalThreshold = 4;//size of caves
// const iterations = 6;//smoothness of edges

// let setPlayerPosition = true;

// function createMap(sideLength) {
//   //cellular automation cave generation
//   let length = sideLength * sideLength;
//   let oldMap = [];

//   for(let i = 0; i < length; i++) {
//     let ran = Math.random();

//     if(ran > 1 - 0.45) {
//       oldMap[i] = 0;
//     } else {
//       oldMap[i] = 1;
//     }
//   }

//   for(let i = 0; i < iterations; i++) {
//     oldMap = doStep(oldMap, sideLength);
//   }

//   oldMap.forEach((item, i) => {
//     if(oldMap[i] == 1) {
//       let neighborTop = (oldMap[i - sideLength] === 0)? true:false;
//       let neighborLeft = (oldMap[i - 1] === 0)? true:false;
//       let neighborBottom = (oldMap[i + sideLength] === 0)? true:false;
//       let neighborRight = (oldMap[i + 1] === 0)? true:false;

//       Object.keys(tileTypes).forEach(tileType => {
//         let type = tileTypes[tileType];

//         let topMatches = (neighborTop == type.top)? true:false;
//         let leftMatches = (neighborLeft == type.left)? true:false;
//         let bottomMatches = (neighborBottom == type.bottom)? true:false;
//         let rightMatches = (neighborRight == type.right)? true:false;

//         if(topMatches && leftMatches && bottomMatches && rightMatches) {
//           oldMap[i] = tileType;
//         }
//       });
//     }
//   });
//   return oldMap;
// }

// function doStep(mapIn, sideLength) {
//   let newMap = [];

//   mapIn.forEach((item, i) => {
//     let count = 0;
//     for(let x = -1; x < 2; x++) {
//       for(let y = -1; y < 2; y++) {
//         let tileX = i % sideLength;
//         let tileY = Math.floor(i / sideLength);

//         let neighborIndex = i + x + sideLength * y;

//         if(x !== 0 || y !== 0) {
//           if(tileX - 1 < 0 || tileY - 1 < 0 || tileX + 1 > sideLength - 1 || tileY + 1 > sideLength - 1) {
//             count++;
//           } else if(mapIn[neighborIndex] == 1) {
//             count++;
//           }

//           if(mapIn[i] === 0 && count >= birthThreshold) {
//             newMap[i] = 1;
//           } else if(mapIn[i] == 1 && count >= survivalThreshold) {
//             newMap[i] = 1;
//           } else {
//             newMap[i] = 0;
//           }
//         }
//       }
//     }
//   });

//   return newMap;
// }



function createMap(sideLength) {
  let length = sideLength * sideLength;
  let map = [];
  let edges = [];
  
  for(let i = 0; i < length; i++) {
    let x = i % sideLength;
    let y = Math.floor(i / sideLength);

    if(x % 2 === 0 || y % 2 === 0) {
      map[i] = {x: 0, y: 0, id: null};
      if(x % 2 == 1 || y % 2 == 1) edges.push(map[i]);
    } else {
      map[i] = {x: 0, y: 0, id: i};
    }
  }
  
  while(edges.length > 0) {
    console.log(edges[456]);
    // let edge = edges[random(0, edges.length - 1, 0)];
    // console.log(map[edge.x + edge.y * sideLength - sideLength]);
    let neighbors = (map[edge.x + edge.y * sideLength - sideLength].id !== null)? 'tb': 'lr';
    
    if(neighbors == 'tb') {
      let topNeighbor = map[edge.x + edge.y * sideLength - sideLength];
      let btmNeighbor = map[edge.x + edge.y * sideLength + sideLength];
      
      if(topNeighbor.id != btmNeighbor.id) {
        map[edge.x + edge.y * sideLength] = 0;
        btmNeighbor.id = topNeighbor.id;
        
        changeMapValuesTB(btmNeighbor, topNeighbor);
      }
    } else {
      let leftNeighbor = map[edge.x + edge.y * sideLength - 1];
      let rightNeighbor = map[edge.x + edge.y * sideLength + 1];
      
      if(leftNeighbor.id != rightNeighbor.id) {
        map[edge.x + edge.y * sideLength] = 0;
        rightNeighbor.id = leftNeighbor.id;
        
        changeMapValuesLR(rightNeighbor, leftNeighbor);
      }
    }
  }
  
  // map.forEach((item, i) => {
  //   if(map[i] == 1) {
  //     let neighborTop = (map[i - sideLength] === 0)? true:false;
  //     let neighborLeft = (map[i - 1] === 0)? true:false;
  //     let neighborBottom = (map[i + sideLength] === 0)? true:false;
  //     let neighborRight = (map[i + 1] === 0)? true:false;

  //     Object.keys(tileTypes).forEach(tileType => {
  //       let type = tileTypes[tileType];

  //       let topMatches = (neighborTop == type.top)? true:false;
  //       let leftMatches = (neighborLeft == type.left)? true:false;
  //       let bottomMatches = (neighborBottom == type.bottom)? true:false;
  //       let rightMatches = (neighborRight == type.right)? true:false;

  //       if(topMatches && leftMatches && bottomMatches && rightMatches) {
  //         map[i] = tileType;
  //       }
  //     });
  //   }
  // });
  
  return map;
}

function changeMapValuesTB(btmNeighbor, topNeighbor) {
  map.forEach(item => {if(item.id == btmNeighbor.id) item.id = topNeighbor.id;});
}

function changeMapValuesLR(rightNeighbor, leftNeighbor) {
  map.forEach(item => {if(item.id == rightNeighbor.id) item.id = leftNeighbor.id;});
}