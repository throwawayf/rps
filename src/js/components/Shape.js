import * as React from 'react'

var Shape = React.createClass({

  render: function() {
    var shapeClass = this.props.shape !== null ? this.props.shape : ''
    var resultClass = ''
    var hiddenClass = this.props.visible ? '' : 'hidden'

    if(this.props.isWinner === true) {
      resultClass = 'winner'
    }

    if(this.props.isLoser === true) {
      resultClass = 'loser'
    }

    var classes = ['shape-box', this.props.class, shapeClass, resultClass, hiddenClass]
    var className = classes.join(' ')

    return <div className={className}></div>
  }
})

export default Shape
