import * as Rx from 'rx'
import * as React from 'react'
import Buttons from './components/Buttons'
import Shape from './components/Shape'
import Score from './components/Score'
import Announcement from './components/Announcement'
import utils from './utils'

export default function app(config, container) {

  var rounds = 10;
  var getScore = utils.getScore(config.matrix)

  var initialState = {
    player1Shape: null,
    player2Shape: null,
    result: '',
    score: {
      player1: 0,
      player2: 0
    },
    counter: 0,
    winner: null,
    shapesVisible: false
  }

  var buttonEvents_ = new Rx.Subject()

  var score_ = new Rx.BehaviorSubject({
    player1: 0,
    player2: 0
  })

  var updateScore_ = new Rx.Subject()

  var reset_ = new Rx.Subject()
  var gameResult_ = new Rx.BehaviorSubject('')

  // reset the score
  reset_.map(() => ({
    player1: 0,
    player2: 0
  })).multicast(score_).connect()

  updateScore_
    .combineLatest(score_, (update, score) => ({update, score}))
    .sample(updateScore_)
    .map(c => ({
      player1: c.score.player1 + c.update.player1,
      player2: c.score.player2 + c.update.player2
    }))
    .multicast(score_).connect()

  var player1Selection_ = buttonEvents_
    // good usecase for skipIf operator
    .combineLatest(gameResult_, (click, gameResult) => ({click, gameResult}))
    .sample(buttonEvents_)
    .filter(c => c.gameResult === '')
    .map(c => c.click)
    .take(1)
    .merge(Rx.Observable.empty().delay(2500))
    .repeat()

  var player2Selection_ = player1Selection_
    .map(e => utils.getRandomShape(config.shapes).key)
    .share()

  var result_ = player1Selection_
    .zip(player2Selection_, getScore)

  var winner_ = result_
    .map(result => {
      if(result.player1 === 1) return 'player1'
      if(result.player2 === 1) return 'player2'
      return null
    })
    .delay(500)
    .merge(result_.map(() => null))
    .shareValue(null)

  var endOfThrow_ = result_.delay(1500)
  endOfThrow_.multicast(updateScore_).connect()

  var counter_ = endOfThrow_
    // hack
    .merge(reset_)
    .scan(0, (aggr, reset) => {
      if(reset === null) return 0
      return aggr + 1
    })
    .shareValue(0)

  var endOfGame_ = counter_
    .filter(count => count === rounds)

  endOfGame_.combineLatest(score_, (_, score) => {
    if(score.player1 > score.player2) return 'win'
    if(score.player2 > score.player1) return 'lose'
    return 'draw'
  })
  .sample(endOfGame_)
  .merge(reset_.map(() => ''))
  .multicast(gameResult_)
  .connect()

  endOfGame_.map(() => null).delay(2000).multicast(reset_).connect()

  var shapesVisible_ = result_
    .map(() => true)
    .merge(endOfThrow_.map(() => false))
    .shareValue(false)

  var player1Shape_ = player1Selection_
    .shareValue(initialState.player1Shape)

  var player2Shape_ = player2Selection_
    .shareValue(initialState.player2Shape)

  /*
    Assemble view state
  */
  var state_ = player1Shape_
    .combineLatest(player2Shape_, counter_, winner_, shapesVisible_, score_, gameResult_,
                   (player1Shape,
                    player2Shape,
                    counter,
                    winner,
                    shapesVisible,
                    score,
                    gameResult) => ({
      player1Shape: player1Shape,
      player2Shape: player2Shape,
      counter: counter,
      winner: winner,
      shapesVisible: shapesVisible,
      score: score,
      result: gameResult
    }))
    .shareValue(initialState)

  /*
    Render
  */
  state_.subscribe(state => {
    var buttonsVisible = !state.shapesVisible && state.result === ''
    var shapesClass = state.result !== '' ? 'shapes fade' : 'shapes'
    React.render(
      <div>
        <div className="counter">{state.counter}/{rounds}</div>
        <Announcement result={state.result} />
        <Score class="player1"
               score={state.score.player1} />
        <Score class="player2"
               score={state.score.player2} />
        <Buttons events_={buttonEvents_}
                 visible={buttonsVisible}
                 shapes={config.shapes} />
        <div className={shapesClass}>
          <Shape shape={state.player1Shape}
                 isWinner={state.winner === 'player1'}
                 isLoser={state.winner === 'player2'}
                 isDraw={state.winner === null}
                 visible={state.shapesVisible}
                 class="player1" />
          <Shape shape={state.player2Shape}
                 isWinner={state.winner === 'player2'}
                 isLoser={state.winner === 'player1'}
                 isDraw={state.winner === null}
                 visible={state.shapesVisible}
                 class="player2" />
        </div>
      </div>,
    container);
  })
}
