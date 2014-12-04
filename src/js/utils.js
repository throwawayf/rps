var resolve = (matrix, s1, s2) => matrix[s1][s2]

var getScore = matrix => (s1, s2) => {
  var resolved = resolve(matrix, s1, s2)
  switch(resolved) {
  case 1:
    return {
      player1: 1,
      player2: 0
    }
  case 0:
    return {
      player1: 0,
      player2: 0
    }
  case -1:
    return {
      player1: 0,
      player2: 1
    }
  }
}

var getRandomShape = (shapes) => shapes[Math.floor(Math.random() * shapes.length)]

var cx = function (classNames) {
  if (typeof classNames == 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}

export default {resolve, getScore, getRandomShape, cx}
