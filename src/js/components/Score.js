import * as React from 'react'

var Score = React.createClass({

  render: function() {
    var className = 'score ' + this.props.class
    return <div className={className}>{this.props.score}</div>
  }
})

export default Score
