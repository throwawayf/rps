export default {

  // possible game shapes
  shapes: [{
    key: 'rock',
    name: 'Rock'
  }, {
    key: 'paper',
    name: 'Paper'
  }, {
    key: 'scissors',
    name: 'Scissors'
  }],

  // result resolution matrix
  matrix: {
    rock: {
      rock: 0,
      paper: -1,
      scissors: 1
    },
    paper: {
      rock: 1,
      paper: 0,
      scissors: -1
    },
    scissors: {
      rock: -1,
      paper: 1,
      scissors: 0
    }
  }
}
