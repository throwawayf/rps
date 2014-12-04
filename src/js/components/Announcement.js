import * as React from 'react'
import utils from '../utils'

var Announcement = React.createClass({

  render: function() {

    var classes = utils.cx({
      'announcement': true,
      'hidden': this.props.result === '',
      'win': this.props.result === 'win',
      'draw': this.props.result === 'draw',
      'lose': this.props.result === 'lose'
    })

    var text = ({
      'win': 'You Win!',
      'draw': 'Draw!',
      'lose': 'You Lose!'
    })[this.props.result]

    return <div className={classes}>{text}</div>
  }
})

export default Announcement
